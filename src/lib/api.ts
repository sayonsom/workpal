/* ═══════════════════════════════════════════════
   Typed API client with automatic token refresh
   ═══════════════════════════════════════════════ */

import {
  getAccessToken,
  getRefreshToken,
  saveAccessToken,
  saveTokens,
  clearTokens,
} from "./auth";

import type {
  SignupRequest,
  SignupResponse,
  LoginRequest,
  LoginResponse,
  RefreshResponse,
  Agent,
  PatchAgentRequest,
  CreateAgentRequest,
  TasksResponse,
  UsageStats,
  Skill,
  CreateSkillRequest,
  UpdateSkillRequest,
  Sample,
  CreateSampleRequest,
  UpdateSampleRequest,
  ApiError,
} from "./types";

const API_BASE = "https://lr90vna1b9.execute-api.us-west-2.amazonaws.com/prod";

// ── Helpers ──

class ApiException extends Error {
  status: number;
  code?: string;

  constructor(err: ApiError) {
    super(err.message);
    this.name = "ApiException";
    this.status = err.status;
    this.code = err.code;
  }
}

/** Is a refresh currently in progress? Prevents multiple concurrent refreshes. */
let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new ApiException({ message: "No refresh token", status: 401 });
  }

  const res = await fetch(`${API_BASE}/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!res.ok) {
    clearTokens();
    throw new ApiException({
      message: "Session expired. Please log in again.",
      status: 401,
    });
  }

  const data: RefreshResponse = await res.json();
  saveAccessToken(data.access_token);
  return data.access_token;
}

/**
 * Core fetch wrapper. Adds Authorization header, handles JSON parsing,
 * automatically retries once on 401 by refreshing the access token.
 */
async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  requireAuth = true
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (requireAuth) {
    const token = getAccessToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  let res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  // On 401, try refreshing the token once
  if (res.status === 401 && requireAuth) {
    try {
      // Deduplicate concurrent refresh calls
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken();
      }
      const newToken = await refreshPromise;
      refreshPromise = null;

      headers["Authorization"] = `Bearer ${newToken}`;
      res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers,
      });
    } catch {
      refreshPromise = null;
      // Redirect to login on refresh failure
      if (typeof window !== "undefined") {
        clearTokens();
        window.location.href = "/login";
      }
      throw new ApiException({
        message: "Session expired. Please log in again.",
        status: 401,
      });
    }
  }

  if (!res.ok) {
    let errorBody: ApiError;
    try {
      errorBody = await res.json();
      errorBody.status = res.status;
    } catch {
      errorBody = {
        message: res.statusText || "Something went wrong",
        status: res.status,
      };
    }
    throw new ApiException(errorBody);
  }

  // Handle 204 No Content
  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}

// ── Public endpoints (no auth) ──

export async function signup(data: SignupRequest): Promise<SignupResponse> {
  const result = await apiFetch<SignupResponse>(
    "/signup",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    false
  );
  saveTokens(result.tokens.access_token, result.tokens.refresh_token);
  return result;
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const result = await apiFetch<LoginResponse>(
    "/login",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    false
  );
  saveTokens(result.tokens.access_token, result.tokens.refresh_token);
  return result;
}

// ── Agent endpoints ──

export async function getAgents(): Promise<Agent[]> {
  return apiFetch<Agent[]>("/agents");
}

export async function createAgent(
  data: CreateAgentRequest
): Promise<Agent> {
  return apiFetch<Agent>("/agents/create", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function patchAgent(
  agentId: string,
  data: PatchAgentRequest
): Promise<Agent> {
  return apiFetch<Agent>(`/agents/${agentId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteAgent(agentId: string): Promise<void> {
  return apiFetch<void>(`/agents/${agentId}`, {
    method: "DELETE",
  });
}

// ── Task endpoints ──

export async function getAgentTasks(
  agentId: string,
  cursor?: string
): Promise<TasksResponse> {
  const params = cursor ? `?cursor=${encodeURIComponent(cursor)}` : "";
  return apiFetch<TasksResponse>(`/agents/${agentId}/tasks${params}`);
}

// ── Usage ──

export async function getUsage(): Promise<UsageStats> {
  return apiFetch<UsageStats>("/usage");
}

// ── Skills ──

export async function getSkills(agentId: string): Promise<Skill[]> {
  return apiFetch<Skill[]>(`/agents/${agentId}/skills`);
}

export async function createSkill(
  agentId: string,
  data: CreateSkillRequest
): Promise<Skill> {
  return apiFetch<Skill>(`/agents/${agentId}/skills`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateSkill(
  agentId: string,
  skillId: string,
  data: UpdateSkillRequest
): Promise<Skill> {
  return apiFetch<Skill>(`/agents/${agentId}/skills/${skillId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteSkill(
  agentId: string,
  skillId: string
): Promise<void> {
  return apiFetch<void>(`/agents/${agentId}/skills/${skillId}`, {
    method: "DELETE",
  });
}

// ── Samples ──

export async function getSamples(agentId: string): Promise<Sample[]> {
  return apiFetch<Sample[]>(`/agents/${agentId}/samples`);
}

export async function createSample(
  agentId: string,
  data: CreateSampleRequest
): Promise<Sample> {
  return apiFetch<Sample>(`/agents/${agentId}/samples`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateSample(
  agentId: string,
  sampleId: string,
  data: UpdateSampleRequest
): Promise<Sample> {
  return apiFetch<Sample>(`/agents/${agentId}/samples/${sampleId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteSample(
  agentId: string,
  sampleId: string
): Promise<void> {
  return apiFetch<void>(`/agents/${agentId}/samples/${sampleId}`, {
    method: "DELETE",
  });
}

// ── Account ──

export async function exportData(): Promise<Blob> {
  const token = getAccessToken();
  const res = await fetch(`${API_BASE}/export`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) {
    throw new ApiException({
      message: "Failed to export data",
      status: res.status,
    });
  }
  return res.blob();
}

export async function deleteAccount(): Promise<void> {
  return apiFetch<void>("/account", { method: "DELETE" });
}
