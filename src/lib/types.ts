/* ═══════════════════════════════════════════════
   API type definitions for Workpal backend
   Base URL: https://lr90vna1b9.execute-api.us-west-2.amazonaws.com/prod
   ═══════════════════════════════════════════════ */

// ── Auth ──

export interface SignupRequest {
  email: string;
  password: string;
  linkedin_url: string;
  name?: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface SignupResponse {
  tokens: AuthTokens;
  agent: Agent;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  tokens: AuthTokens;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

export interface RefreshResponse {
  access_token: string;
}

// ── Agents ──

export interface Agent {
  id: string;
  agent_email: string;
  name: string;
  status: "active" | "paused" | "deleted";
  linkedin_url?: string;
  created_at: string;
  updated_at: string;
}

export interface PatchAgentRequest {
  name?: string;
  status?: "active" | "paused";
}

export interface CreateAgentRequest {
  name?: string;
  linkedin_url?: string;
}

// ── Tasks ──

export interface Task {
  id: string;
  agent_id: string;
  subject: string;
  status: "processing" | "completed" | "failed";
  input_preview: string;
  output_preview?: string;
  created_at: string;
  completed_at?: string;
}

export interface TasksResponse {
  tasks: Task[];
  next_cursor?: string;
  has_more: boolean;
}

// ── Usage ──

export interface UsageStats {
  tasks_used: number;
  tasks_limit: number;
  period_start: string;
  period_end: string;
  plan: string;
}

// ── Skills ──

export interface Skill {
  id: string;
  agent_id: string;
  name: string;
  description: string;
  created_at: string;
}

export interface CreateSkillRequest {
  name: string;
  description: string;
}

export interface UpdateSkillRequest {
  name?: string;
  description?: string;
}

// ── Samples ──

export interface Sample {
  id: string;
  agent_id: string;
  title: string;
  content: string;
  created_at: string;
}

export interface CreateSampleRequest {
  title: string;
  content: string;
}

export interface UpdateSampleRequest {
  title?: string;
  content?: string;
}

// ── Generic ──

export interface ApiError {
  message: string;
  code?: string;
  status: number;
}
