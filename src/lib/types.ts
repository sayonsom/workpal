/* ═══════════════════════════════════════════════
   API type definitions for Workpal backend
   Base URL: https://lr90vna1b9.execute-api.us-west-2.amazonaws.com/prod
   ═══════════════════════════════════════════════ */

// ── Auth ──

export interface SignupRequest {
  email: string;
  password: string;
  workpal_handle?: string;
  profile_text?: string;
  name?: string;
}

export interface SignupResponse {
  agent_email: string;
  agent_id: string;
  display_name: string;
  message: string;
  pending_verification: boolean;
}

export interface VerifyCodeRequest {
  email: string;
  code: string;
}

export interface VerifyCodeResponse {
  verified: boolean;
  agent_email: string;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

/** Login response — flat structure (not nested in tokens) */
export interface LoginResponse {
  id_token: string;
  refresh_token: string;
  user_id: string;
}

export interface RefreshResponse {
  id_token: string;
  refresh_token: string;
}

// ── Handle Check ──

export interface CheckHandleResponse {
  handle: string;
  email: string;
  available: boolean;
}

// ── Agents ──

export interface Agent {
  agent_id: string;
  agent_email: string;
  owner_email: string;
  display_name: string;
  domain_tags: string[];
  profile_summary: string;
  status: "active" | "paused" | "deleted";
  skills: Skill[];
  samples: Sample[];
  allowed_senders: string[];
  phone_number: string;
  voice_enabled: boolean;
  active_skills: string[];
  sub_skills: SubSkill[];
}

export interface AgentsListResponse {
  agents: Agent[];
  count: number;
}

export interface PatchAgentRequest {
  display_name?: string;
  status?: "active" | "paused";
}

/** @deprecated Agents are now created during signup */
export interface CreateAgentRequest {
  display_name?: string;
  linkedin_url?: string;
}

// ── Personalize ──

export interface PersonalizeAgentRequest {
  profile_text?: string;
  linkedin_url?: string;
}

export interface PersonalizeAgentResponse {
  message: string;
  agent_id: string;
  display_name: string;
  domain_tags: string[];
  profile_summary: string;
}

// ── Share ──

export interface ShareAgentRequest {
  emails: string[];
}

// ── Tasks ──

export interface Task {
  task_id: string;
  subject: string;
  status: "processing" | "completed" | "failed";
  created_at: number; // Unix timestamp (seconds)
  input_chars: number;
  output_chars: number;
  has_attachments: boolean;
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
  tasks_remaining: number;
  plan: string;
}

// ── Skills (Legacy — deprecated, use Skills Catalog instead) ──

/** @deprecated Use CatalogSkill + SubSkill instead */
export interface Skill {
  id: string;
  agent_id: string;
  name: string;
  description: string;
  created_at: string;
}

/** @deprecated Use ActivateSkillRequest instead */
export interface CreateSkillRequest {
  name: string;
  description: string;
}

/** @deprecated */
export interface UpdateSkillRequest {
  name?: string;
  description?: string;
}

// ── Skills Catalog (NEW) ──

export interface CatalogSkill {
  skill_id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  keywords: string[];
}

export interface SkillsCatalogResponse {
  skills: CatalogSkill[];
  categories: string[];
}

export interface ActivateSkillRequest {
  skill_id: string;
}

export interface ActivateSkillResponse {
  message: string;
  active_skills: string[];
}

export interface SubSkill {
  parent_skill_id: string;
  name: string;
  content: string;
  source: "user" | "youtube";
  created_at: number;
}

export interface CreateSubSkillRequest {
  name: string;
  content: string;
}

export interface AgentSkillsResponse {
  active_skills: CatalogSkill[];
  sub_skills: SubSkill[];
  legacy_skills: Record<string, unknown>[];
}

// ── Samples ──

export interface Sample {
  name: string;
  agent_id: string;
  description: string;
  content: string;
  created_at?: string;
}

export interface CreateSampleRequest {
  name: string;
  description: string;
  content: string;
}

export interface UpdateSampleRequest {
  name?: string;
  description?: string;
  content?: string;
}

// ── Voice / Phone ──

export interface RegisterPhoneRequest {
  phone_number: string;
}

export interface PhoneStatusResponse {
  phone_number: string;
  voice_enabled: boolean;
  elevenlabs_agent_id: string;
  twilio_number: string;
}

// ── Generic ──

export interface ApiError {
  message: string;
  code?: string;
  status: number;
}
