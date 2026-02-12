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
  referral_code?: string;
}

export interface SignupResponse {
  agent_email: string;
  agent_id: string;
  display_name: string;
  message: string;
  pending_verification: boolean;
  referral_code?: string;
}

export interface ReferralInfo {
  referral_code: string;
  referral_link: string;
  referral_count: number;
  is_premium: boolean;
  premium_until: number;
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
  // Extended fields (already in backend TaskRecord)
  input_summary?: string;
  output_summary?: string;
  sender_email?: string;
  attachment_names?: string[];
  thread_id?: string;
  parent_task_id?: string;
  completed_at?: number;
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

// ── Admin / Review Gate ──

export interface ReviewRecord {
  review_id: string;
  task_id: string;
  agent_id: string;
  project_id: string;
  user_id: string;
  status: "pending" | "approved" | "rejected";
  created_at: number;
  reviewed_at: number;
  reviewed_by: string;
  full_input: string;
  full_output: string;
  edited_output: string;
  reject_reason: string;
  parsed_email_json: string;
  agent_email: string;
  custom_message_id: string;
  pipeline_trace: string;
  attachment_s3_keys: string[];
  attachment_metadata: AttachmentMeta[];
  sender_email: string;
  subject: string;
  complexity: string;
}

export interface AttachmentMeta {
  filename: string;
  content_type: string;
  s3_key: string;
}

export interface ReviewsResponse {
  reviews: ReviewRecord[];
  cursor: string | null;
}

export interface ApproveRequest {
  edited_output?: string;
}

export interface RejectRequest {
  reason?: string;
}

export interface AdminDashboard {
  pending_reviews: number;
  total_reviews: number;
  total_agents: number;
  total_users: number;
  recent_reviews: ReviewRecord[];
}

export interface AdminUser {
  user_id: string;
  email: string;
  tasks_used: number;
  tasks_limit: number;
  plan: string;
  agent_count: number;
  last_task_at: number;
  joined_at: number;
  forwards_per_day: number;
}

export interface AdminUsersResponse {
  users: AdminUser[];
  cursor: string | null;
}

export interface AdminTask {
  task_id: string;
  agent_id: string;
  user_id: string;
  sender_email: string;
  subject: string;
  status: string;
  created_at: number;
  completed_at: number;
  input_chars: number;
  output_chars: number;
  has_attachments: boolean;
  attachment_names: string[];
  input_summary: string;
  output_summary: string;
  thread_id: string;
  parent_task_id: string;
  reply_message_id: string;
  full_input: string;
  full_output: string;
}

export interface AdminTasksResponse {
  tasks: AdminTask[];
  cursor: string | null;
}

export interface AuditEntry {
  audit_id: string;
  timestamp: number;
  admin_id: string;
  action: string;
  resource_type: string;
  resource_id: string;
  details: string;
  ip_address: string;
}

export interface AuditResponse {
  entries: AuditEntry[];
  cursor: string | null;
}

// ── Admin User Detail ──

export interface AdminAgent {
  agent_id: string;
  agent_email: string;
  display_name: string;
  status: string;
  tasks_completed: number;
  created_at: number;
}

export interface AdminUserReview {
  review_id: string;
  task_id: string;
  agent_id: string;
  status: string;
  subject: string;
  created_at: number;
  reviewed_at: number;
  complexity: string;
  pipeline_trace: string;
  attachment_metadata: AttachmentMeta[];
  full_input: string;
  full_output: string;
  edited_output: string;
  sender_email: string;
  agent_email: string;
}

export interface AdminUserStats {
  total_tasks: number;
  total_with_attachments: number;
  total_input_chars: number;
  total_output_chars: number;
  forwards_per_day: number;
}

export interface AdminUserDetail {
  user_id: string;
  email: string;
  joined_at: number;
  agent_count: number;
  usage?: {
    user_id: string;
    tasks_used: number;
    tasks_limit: number;
    plan: string;
    period_start?: number;
  };
  agents: AdminAgent[];
  tasks: AdminTask[];
  reviews: AdminUserReview[];
  stats: AdminUserStats;
}

export interface PipelineTrace {
  stage_times: Record<string, number>;
  intake_result?: Record<string, unknown>;
  plan_result?: Record<string, unknown>;
  review_result?: Record<string, unknown>;
  provenance_result?: Record<string, unknown>;
}

// ── Generic ──

export interface ApiError {
  message: string;
  code?: string;
  status: number;
}
