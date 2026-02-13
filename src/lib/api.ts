/* ═══════════════════════════════════════════════
   Typed API client with automatic token refresh
   ═══════════════════════════════════════════════ */

import {
  getAccessToken,
  getRefreshToken,
  saveAccessToken,
  saveRefreshToken,
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
  AgentsListResponse,
  PatchAgentRequest,
  CreateAgentRequest,
  CheckHandleResponse,
  PersonalizeAgentRequest,
  PersonalizeAgentResponse,
  ShareAgentRequest,
  Task,
  TasksResponse,
  UsageStats,
  Skill,
  CreateSkillRequest,
  UpdateSkillRequest,
  CatalogSkill,
  SkillsCatalogResponse,
  ActivateSkillRequest,
  ActivateSkillResponse,
  SubSkill,
  CreateSubSkillRequest,
  AgentSkillsResponse,
  Sample,
  CreateSampleRequest,
  UpdateSampleRequest,
  RegisterPhoneRequest,
  PhoneStatusResponse,
  ApiError,
  ReviewRecord,
  ReviewsResponse,
  ApproveRequest,
  RejectRequest,
  AdminDashboard,
  AdminUsersResponse,
  AdminUserDetail,
  AdminTask,
  AdminTasksResponse,
  AuditResponse,
  ReferralInfo,
} from "./types";

const API_BASE = "https://lr90vna1b9.execute-api.us-west-2.amazonaws.com/prod";

// ── Helpers ──

export class ApiException extends Error {
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
  saveAccessToken(data.id_token);
  if (data.refresh_token) {
    saveRefreshToken(data.refresh_token);
  }
  return data.id_token;
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

export async function checkHandle(handle: string): Promise<CheckHandleResponse> {
  return apiFetch<CheckHandleResponse>(
    `/check-handle/${encodeURIComponent(handle)}`,
    { method: "GET" },
    false
  );
}

export async function signup(data: SignupRequest): Promise<SignupResponse> {
  return apiFetch<SignupResponse>(
    "/signup",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    false
  );
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
  // Login response is flat (not nested in tokens)
  saveTokens(result.id_token, result.refresh_token);
  return result;
}

// ── Agent endpoints ──

export async function getAgents(): Promise<Agent[]> {
  const result = await apiFetch<AgentsListResponse>("/agents");
  return result.agents;
}

/** @deprecated Agents are now created during signup */
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

// ── Personalize ──

export async function personalizeAgent(
  agentId: string,
  data: PersonalizeAgentRequest
): Promise<PersonalizeAgentResponse> {
  return apiFetch<PersonalizeAgentResponse>(`/agents/${agentId}/personalize`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ── Share ──

export async function shareAgent(
  agentId: string,
  data: ShareAgentRequest
): Promise<void> {
  return apiFetch<void>(`/agents/${agentId}/share`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ── Task endpoints ──

export async function getAgentTasks(
  agentId: string,
  limit: number = 20,
  cursor?: string
): Promise<TasksResponse> {
  const params = new URLSearchParams({ limit: String(limit) });
  if (cursor) params.set("cursor", cursor);
  return apiFetch<TasksResponse>(`/agents/${agentId}/tasks?${params}`);
}

export async function getTaskDetail(
  agentId: string,
  taskId: string
): Promise<Task> {
  return apiFetch<Task>(`/agents/${agentId}/tasks/${taskId}`);
}

export async function getUpcomingTasks(
  agentId: string
): Promise<{ tasks: Task[] }> {
  return apiFetch<{ tasks: Task[] }>(`/agents/${agentId}/tasks/upcoming`);
}

// ── Usage ──

export async function getUsage(): Promise<UsageStats> {
  return apiFetch<UsageStats>("/usage");
}

// ── Referral ──

export async function getReferralInfo(): Promise<ReferralInfo> {
  return apiFetch<ReferralInfo>("/referral");
}

// ── Skills ──

export async function getSkills(agentId: string): Promise<Skill[]> {
  const result = await apiFetch<{ skills: Skill[] }>(`/agents/${agentId}/skills`);
  return result.skills ?? [];
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

// ── Skills Catalog (NEW) ──

/** Fetch all available skills from the pre-built catalog. No auth required. */
export async function getSkillsCatalog(): Promise<SkillsCatalogResponse> {
  return apiFetch<SkillsCatalogResponse>("/skills/catalog", { method: "GET" }, false);
}

/** Toggle a catalog skill ON for this agent. */
export async function activateSkill(
  agentId: string,
  data: ActivateSkillRequest
): Promise<ActivateSkillResponse> {
  return apiFetch<ActivateSkillResponse>(`/agents/${agentId}/skills/activate`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/** Toggle a catalog skill OFF. Also removes child sub-skills. */
export async function deactivateSkill(
  agentId: string,
  data: ActivateSkillRequest
): Promise<ActivateSkillResponse> {
  return apiFetch<ActivateSkillResponse>(`/agents/${agentId}/skills/deactivate`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/** Get agent's active skills with sub-skills and legacy data. */
export async function getActiveSkills(
  agentId: string
): Promise<AgentSkillsResponse> {
  return apiFetch<AgentSkillsResponse>(`/agents/${agentId}/skills/active`);
}

/** Add a sub-skill customization under an active skill. */
export async function createSubSkill(
  agentId: string,
  skillId: string,
  data: CreateSubSkillRequest
): Promise<{ message: string; sub_skill: SubSkill }> {
  return apiFetch<{ message: string; sub_skill: SubSkill }>(
    `/agents/${agentId}/skills/${skillId}/sub-skills`,
    { method: "POST", body: JSON.stringify(data) }
  );
}

/** Delete a sub-skill customization. */
export async function deleteSubSkill(
  agentId: string,
  skillId: string,
  subSkillName: string
): Promise<void> {
  return apiFetch<void>(
    `/agents/${agentId}/skills/${skillId}/sub-skills/${encodeURIComponent(subSkillName)}`,
    { method: "DELETE" }
  );
}

/**
 * Fetch YouTube transcript via our own Vercel-hosted API route.
 * This avoids YouTube's cloud IP blocking since Vercel edge IPs are
 * different from AWS Lambda IPs.
 */
export async function fetchYouTubeTranscript(videoId: string): Promise<string | null> {
  try {
    const resp = await fetch(`/api/youtube-transcript?videoId=${videoId}`);
    if (!resp.ok) return null;
    const data = await resp.json();
    return data.transcript || null;
  } catch {
    return null;
  }
}

/** Extract YouTube video ID from a URL. */
export function extractYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

/** Create a sub-skill from a YouTube video. */
export async function createSkillFromYouTube(
  agentId: string,
  url: string,
  transcript?: string
): Promise<{
  message: string;
  sub_skill: SubSkill;
  skill_id: string;
  skill_name: string;
  classification: { is_educational: boolean; summary: string; confidence: number };
  already_existed: boolean;
}> {
  return apiFetch(
    `/agents/${agentId}/skills/youtube`,
    { method: "POST", body: JSON.stringify({ url, transcript: transcript || null }) }
  );
}

// ── Samples ──

export async function getSamples(agentId: string): Promise<Sample[]> {
  const result = await apiFetch<{ samples: Sample[] }>(`/agents/${agentId}/samples`);
  return result.samples ?? [];
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
  sampleName: string,
  data: UpdateSampleRequest
): Promise<Sample> {
  return apiFetch<Sample>(`/agents/${agentId}/samples/${encodeURIComponent(sampleName)}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteSample(
  agentId: string,
  sampleName: string
): Promise<void> {
  return apiFetch<void>(
    `/agents/${agentId}/samples/${encodeURIComponent(sampleName)}`,
    { method: "DELETE" }
  );
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

// ── Voice / Phone ──

export async function registerPhone(
  agentId: string,
  data: RegisterPhoneRequest
): Promise<PhoneStatusResponse> {
  return apiFetch<PhoneStatusResponse>(`/agents/${agentId}/phone`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getPhoneStatus(
  agentId: string
): Promise<PhoneStatusResponse> {
  return apiFetch<PhoneStatusResponse>(`/agents/${agentId}/phone`);
}

// ── Email Verification (no auth) ──

export async function verifyEmail(
  token: string,
  email: string
): Promise<{ message: string }> {
  return apiFetch<{ message: string }>(
    `/verify-email?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`,
    { method: "GET" },
    false
  );
}

// ── Password Management ──

export async function forgotPassword(
  email: string
): Promise<{ message: string }> {
  return apiFetch<{ message: string }>(
    "/forgot-password",
    {
      method: "POST",
      body: JSON.stringify({ email }),
    },
    false
  );
}

export async function confirmForgotPassword(
  email: string,
  code: string,
  new_password: string
): Promise<{ id_token: string; refresh_token: string; user_id?: string }> {
  const result = await apiFetch<{ id_token: string; refresh_token: string; user_id?: string }>(
    "/confirm-password",
    {
      method: "POST",
      body: JSON.stringify({ email, code, new_password }),
    },
    false
  );
  // Save tokens so user is logged in after password set
  saveTokens(result.id_token, result.refresh_token);
  return result;
}

export async function setPassword(
  email: string,
  new_password: string
): Promise<{ id_token: string; refresh_token: string; user_id?: string }> {
  const result = await apiFetch<{ id_token: string; refresh_token: string; user_id?: string }>(
    "/set-password",
    {
      method: "POST",
      body: JSON.stringify({ email, new_password }),
    },
    false
  );
  saveTokens(result.id_token, result.refresh_token);
  return result;
}

export async function changePassword(
  old_password: string,
  new_password: string
): Promise<{ message: string }> {
  return apiFetch<{ message: string }>("/change-password", {
    method: "POST",
    body: JSON.stringify({ old_password, new_password }),
  });
}

// ── Admin endpoints ──

/** Check if current user is an admin (returns 200 or 403). */
export async function checkAdminAccess(): Promise<boolean> {
  try {
    await apiFetch<AdminDashboard>("/admin/dashboard");
    return true;
  } catch (err) {
    // Only treat 403 as "not admin". Other errors (500, network) should
    // be retried or surfaced, but for now we treat 401 (expired session)
    // and 403 (not admin) as definitive denials.
    if (err instanceof ApiException && (err.status === 403 || err.status === 401)) {
      return false;
    }
    // For other errors (404 = route not deployed, 500 = server error),
    // log and return false so user isn't stuck.
    console.error("[AdminGuard] checkAdminAccess failed:", err);
    return false;
  }
}

/** Get admin dashboard summary. */
export async function getAdminDashboard(): Promise<AdminDashboard> {
  return apiFetch<AdminDashboard>("/admin/dashboard");
}

/** Get pending reviews (oldest first). */
export async function getAdminReviews(
  status?: string,
  limit: number = 20,
  cursor?: string
): Promise<ReviewsResponse> {
  const params = new URLSearchParams({ limit: String(limit) });
  if (status) params.set("status", status);
  if (cursor) params.set("cursor", cursor);
  return apiFetch<ReviewsResponse>(`/admin/reviews?${params}`);
}

/** Get a single review by ID. */
export async function getAdminReview(reviewId: string): Promise<ReviewRecord> {
  return apiFetch<ReviewRecord>(`/admin/reviews/${reviewId}`);
}

/** Approve a review (optionally with edited output). */
export async function approveReview(
  reviewId: string,
  data?: ApproveRequest
): Promise<{ message: string }> {
  return apiFetch<{ message: string }>(`/admin/reviews/${reviewId}/approve`, {
    method: "POST",
    body: JSON.stringify(data ?? {}),
  });
}

/** Reject a review (optionally with a reason). */
export async function rejectReview(
  reviewId: string,
  data?: RejectRequest
): Promise<{ message: string }> {
  return apiFetch<{ message: string }>(`/admin/reviews/${reviewId}/reject`, {
    method: "POST",
    body: JSON.stringify(data ?? {}),
  });
}

/** Get a presigned S3 URL to download/view an attachment. */
export async function getAttachmentDownloadUrl(
  reviewId: string,
  index: number
): Promise<{ url: string; filename: string; content_type: string }> {
  return apiFetch<{ url: string; filename: string; content_type: string }>(
    `/admin/reviews/${reviewId}/attachments/${index}/download`
  );
}

/** Replace an attachment with a new file. Uses FormData (not JSON). */
export async function replaceAttachment(
  reviewId: string,
  index: number,
  file: File
): Promise<{ status: string; new_filename: string }> {
  const formData = new FormData();
  formData.append("file", file);
  const token = getAccessToken();
  const res = await fetch(
    `${API_BASE}/admin/reviews/${reviewId}/attachments/${index}/replace`,
    {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    }
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Upload failed" }));
    throw new Error(err.detail || `Upload failed (${res.status})`);
  }
  return res.json();
}

/** Get admin user list. */
export async function getAdminUsers(
  limit: number = 50,
  cursor?: string
): Promise<AdminUsersResponse> {
  const params = new URLSearchParams({ limit: String(limit) });
  if (cursor) params.set("cursor", cursor);
  return apiFetch<AdminUsersResponse>(`/admin/users?${params}`);
}

/** Get admin user detail (full task history, reviews with traces, stats). */
export async function getAdminUserDetail(
  userId: string
): Promise<AdminUserDetail> {
  return apiFetch<AdminUserDetail>(`/admin/users/${userId}`);
}

/** Get admin task list (filterable). */
export async function getAdminTasks(
  agentId?: string,
  userId?: string,
  limit: number = 20,
  cursor?: string
): Promise<AdminTasksResponse> {
  const params = new URLSearchParams({ limit: String(limit) });
  if (agentId) params.set("agent_id", agentId);
  if (userId) params.set("user_id", userId);
  if (cursor) params.set("cursor", cursor);
  return apiFetch<AdminTasksResponse>(`/admin/tasks?${params}`);
}

/** Get a single task with full input/output (admin view). */
export async function getAdminTask(
  agentId: string,
  taskId: string
): Promise<AdminTask> {
  return apiFetch<AdminTask>(`/admin/tasks/${agentId}/${taskId}`);
}

/** Get pipeline trace for a task. */
export async function getAdminTaskTrace(
  agentId: string,
  taskId: string
): Promise<Record<string, unknown>> {
  return apiFetch<Record<string, unknown>>(`/admin/tasks/${agentId}/${taskId}/trace`);
}

/** Get audit log. */
export async function getAdminAudit(
  action?: string,
  limit: number = 50,
  cursor?: string
): Promise<AuditResponse> {
  const params = new URLSearchParams({ limit: String(limit) });
  if (action) params.set("action", action);
  if (cursor) params.set("cursor", cursor);
  return apiFetch<AuditResponse>(`/admin/audit?${params}`);
}
