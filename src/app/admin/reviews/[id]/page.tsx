"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminShell from "@/components/admin/AdminShell";
import {
  getAdminReview,
  approveReview,
  rejectReview,
  getAdminDashboard,
  getAttachmentDownloadUrl,
  replaceAttachment,
} from "@/lib/api";
import type { ReviewRecord } from "@/lib/types";

function BackArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M11.5 1.5l3 3-9 9H2.5v-3l9-9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function formatTimestamp(ts: number): string {
  if (!ts) return "\u2014";
  return new Date(ts * 1000).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-warning/15 text-warning",
    approved: "bg-success/15 text-success",
    rejected: "bg-danger/15 text-danger",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-semibold uppercase tracking-wide ${styles[status] ?? "bg-[#EBEBEB] text-[var(--color-text-muted)]"}`}>
      {status}
    </span>
  );
}

function ComplexityBadge({ complexity }: { complexity: string }) {
  const styles: Record<string, string> = {
    LOW: "bg-success/10 text-success",
    MEDIUM: "bg-info/10 text-info",
    HIGH: "bg-danger/10 text-danger",
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold uppercase ${styles[complexity] ?? "bg-[#EBEBEB] text-[var(--color-text-muted)]"}`}>
      {complexity}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
      {children}
    </div>
  );
}

function AttachmentRow({
  att,
  index,
  reviewId,
  isPending,
  onReplaced,
}: {
  att: { filename: string; content_type: string; s3_key: string };
  index: number;
  reviewId: string;
  isPending: boolean;
  onReplaced: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [replacing, setReplacing] = useState(false);
  const [toast, setToast] = useState("");

  async function handleDownload() {
    setDownloading(true);
    try {
      const res = await getAttachmentDownloadUrl(reviewId, index);
      window.open(res.url, "_blank");
    } catch (err) {
      setToast("Download failed");
      setTimeout(() => setToast(""), 3000);
    } finally {
      setDownloading(false);
    }
  }

  async function handleReplace(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setReplacing(true);
    try {
      await replaceAttachment(reviewId, index, file);
      setToast("Replaced!");
      setTimeout(() => setToast(""), 3000);
      onReplaced();
    } catch (err) {
      setToast("Replace failed");
      setTimeout(() => setToast(""), 3000);
    } finally {
      setReplacing(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-[var(--color-border-light)] bg-surface-subtle text-[13px]">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-[var(--color-text-muted)] shrink-0">
        <path d="M4 2h5l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 2v4h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-text-primary font-medium truncate flex-1">{att.filename}</span>
      <span className="text-[var(--color-text-muted)] text-[11px] shrink-0">{att.content_type.split("/").pop()}</span>

      <button
        onClick={handleDownload}
        disabled={downloading}
        className="ml-2 px-2 py-1 rounded text-[11px] font-semibold text-cta hover:text-cta-hover hover:bg-cta/5 transition-colors cursor-pointer disabled:opacity-50"
        title="Download / Preview"
      >
        {downloading ? "..." : "Download"}
      </button>

      {isPending && (
        <>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={replacing}
            className="px-2 py-1 rounded text-[11px] font-semibold text-warning hover:bg-warning/5 transition-colors cursor-pointer disabled:opacity-50"
            title="Upload replacement file"
          >
            {replacing ? "Uploading..." : "Replace"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleReplace}
          />
        </>
      )}

      {toast && (
        <span className={`text-[11px] font-semibold ${toast.includes("fail") ? "text-danger" : "text-success"}`}>
          {toast}
        </span>
      )}
    </div>
  );
}

function ReviewDetailContent() {
  const router = useRouter();
  const params = useParams();
  const reviewId = params.id as string;

  const [review, setReview] = useState<ReviewRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pendingCount, setPendingCount] = useState(0);

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [editedOutput, setEditedOutput] = useState("");

  // Action state
  const [actionLoading, setActionLoading] = useState(false);
  const [actionResult, setActionResult] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Reject modal state
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  // Pipeline trace state
  const [showTrace, setShowTrace] = useState(false);
  const [parsedTrace, setParsedTrace] = useState<Record<string, unknown> | null>(null);

  const fetchReview = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAdminReview(reviewId);
      setReview(data);
      setEditedOutput(data.full_output);

      // Parse pipeline trace if available
      if (data.pipeline_trace) {
        try {
          setParsedTrace(JSON.parse(data.pipeline_trace));
        } catch {
          // not valid JSON, ignore
        }
      }
    } catch {
      setError("Failed to load review.");
    } finally {
      setLoading(false);
    }
  }, [reviewId]);

  const fetchPendingCount = useCallback(async () => {
    try {
      const dash = await getAdminDashboard();
      setPendingCount(dash.pending_reviews);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    fetchReview();
    fetchPendingCount();
  }, [fetchReview, fetchPendingCount]);

  async function handleApprove() {
    if (!review) return;
    setActionLoading(true);
    setActionResult(null);
    try {
      const payload = isEditing && editedOutput !== review.full_output
        ? { edited_output: editedOutput }
        : undefined;
      await approveReview(reviewId, payload);
      setActionResult({ type: "success", message: "Approved! Email has been sent to the user." });
      // Refresh review data
      await fetchReview();
      await fetchPendingCount();
    } catch (err) {
      setActionResult({ type: "error", message: err instanceof Error ? err.message : "Failed to approve." });
    } finally {
      setActionLoading(false);
    }
  }

  async function handleReject() {
    setActionLoading(true);
    setActionResult(null);
    try {
      await rejectReview(reviewId, { reason: rejectReason || undefined });
      setShowRejectModal(false);
      setRejectReason("");
      setActionResult({ type: "success", message: "Rejected. The response will not be sent." });
      await fetchReview();
      await fetchPendingCount();
    } catch (err) {
      setActionResult({ type: "error", message: err instanceof Error ? err.message : "Failed to reject." });
    } finally {
      setActionLoading(false);
    }
  }

  if (loading) {
    return (
      <AdminShell pendingCount={pendingCount}>
        <div className="max-w-[960px] animate-pulse">
          <div className="h-6 w-32 rounded bg-[#EBEBEB] mb-6" />
          <div className="h-8 w-2/3 rounded bg-[#EBEBEB] mb-4" />
          <div className="space-y-3">
            <div className="h-4 w-full rounded bg-[#EBEBEB]" />
            <div className="h-4 w-5/6 rounded bg-[#EBEBEB]" />
            <div className="h-4 w-4/6 rounded bg-[#EBEBEB]" />
          </div>
        </div>
      </AdminShell>
    );
  }

  if (error || !review) {
    return (
      <AdminShell pendingCount={pendingCount}>
        <div className="max-w-[960px]">
          <button
            onClick={() => router.push("/admin")}
            className="flex items-center gap-1.5 text-[13px] text-[var(--color-text-muted)] hover:text-text-primary transition-colors mb-6 cursor-pointer"
          >
            <BackArrow /> Back to Queue
          </button>
          <div className="text-center py-16">
            <p className="text-[15px] text-danger">{error || "Review not found."}</p>
          </div>
        </div>
      </AdminShell>
    );
  }

  const isPending = review.status === "pending";

  return (
    <AdminShell pendingCount={pendingCount}>
      <div className="max-w-[960px]">
        {/* Back button */}
        <button
          onClick={() => router.push("/admin")}
          className="flex items-center gap-1.5 text-[13px] text-[var(--color-text-muted)] hover:text-text-primary transition-colors mb-4 cursor-pointer"
        >
          <BackArrow /> Back to Queue
        </button>

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-[20px] font-bold text-text-primary truncate">
                {review.subject || "(no subject)"}
              </h1>
              <StatusBadge status={review.status} />
              {review.complexity && <ComplexityBadge complexity={review.complexity} />}
            </div>
            <div className="flex items-center gap-2 text-[13px] text-[var(--color-text-muted)] flex-wrap">
              <span>From: {review.sender_email}</span>
              <span>&middot;</span>
              <span>Agent: {review.agent_email}</span>
              <span>&middot;</span>
              <span>{formatTimestamp(review.created_at)}</span>
            </div>
          </div>
        </div>

        {/* Action result toast */}
        {actionResult && (
          <div className={`mb-4 px-4 py-3 rounded-lg text-[14px] font-medium ${
            actionResult.type === "success"
              ? "bg-success/10 text-success"
              : "bg-danger/10 text-danger"
          }`}>
            {actionResult.message}
          </div>
        )}

        {/* Content panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* User's Input */}
          <div>
            <SectionLabel>User&apos;s Request</SectionLabel>
            <div className="rounded-lg border border-[var(--color-border-light)] bg-surface-subtle p-4 min-h-[200px] max-h-[500px] overflow-y-auto custom-scrollbar">
              <pre className="text-[14px] text-text-primary whitespace-pre-wrap font-sans leading-relaxed">
                {review.full_input || "(no input)"}
              </pre>
            </div>
          </div>

          {/* Agent's Output */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <SectionLabel>Workpal&apos;s Response</SectionLabel>
              {isPending && (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-1 text-[12px] text-cta hover:text-cta-hover transition-colors cursor-pointer"
                >
                  <EditIcon />
                  {isEditing ? "Preview" : "Edit"}
                </button>
              )}
            </div>

            {isEditing && isPending ? (
              <textarea
                value={editedOutput}
                onChange={(e) => setEditedOutput(e.target.value)}
                className="w-full rounded-lg border border-cta/30 bg-white p-4 min-h-[200px] max-h-[500px] text-[14px] text-text-primary font-sans leading-relaxed resize-y focus:outline-none focus:border-cta focus:ring-1 focus:ring-cta/20"
              />
            ) : (
              <div className="rounded-lg border border-[var(--color-border-light)] bg-white p-4 min-h-[200px] max-h-[500px] overflow-y-auto custom-scrollbar">
                <pre className="text-[14px] text-text-primary whitespace-pre-wrap font-sans leading-relaxed">
                  {isEditing ? editedOutput : review.full_output || "(no output)"}
                </pre>
              </div>
            )}

            {isEditing && editedOutput !== review.full_output && (
              <p className="mt-1.5 text-[11px] text-info font-medium">
                Output has been edited. Approving will send the edited version.
              </p>
            )}
          </div>
        </div>

        {/* Attachments */}
        {review.attachment_metadata && review.attachment_metadata.length > 0 && (
          <div className="mb-6">
            <SectionLabel>Attachments</SectionLabel>
            <div className="space-y-2">
              {review.attachment_metadata.map((att, i) => (
                <AttachmentRow
                  key={i}
                  att={att}
                  index={i}
                  reviewId={review.review_id}
                  isPending={review.status === "pending"}
                  onReplaced={fetchReview}
                />
              ))}
            </div>
          </div>
        )}

        {/* Pipeline Trace (collapsible) */}
        {parsedTrace && (
          <div className="mb-6">
            <button
              onClick={() => setShowTrace(!showTrace)}
              className="flex items-center gap-2 text-[13px] font-semibold text-[var(--color-text-muted)] hover:text-text-primary transition-colors cursor-pointer"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className={`transition-transform ${showTrace ? "rotate-90" : ""}`}
              >
                <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Pipeline Trace
            </button>
            {showTrace && (
              <div className="mt-2 rounded-lg border border-[var(--color-border-light)] bg-[#1D1C1D] p-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                <pre className="text-[12px] text-[#E8E8E8] font-mono whitespace-pre-wrap">
                  {JSON.stringify(parsedTrace, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Metadata */}
        <div className="mb-6">
          <SectionLabel>Details</SectionLabel>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <div className="text-[11px] text-[var(--color-text-muted)] mb-0.5">Review ID</div>
              <div className="text-[13px] text-text-primary font-mono truncate">{review.review_id}</div>
            </div>
            <div>
              <div className="text-[11px] text-[var(--color-text-muted)] mb-0.5">Task ID</div>
              <div className="text-[13px] text-text-primary font-mono truncate">{review.task_id}</div>
            </div>
            <div>
              <div className="text-[11px] text-[var(--color-text-muted)] mb-0.5">Agent ID</div>
              <div className="text-[13px] text-text-primary font-mono truncate">{review.agent_id}</div>
            </div>
            <div>
              <div className="text-[11px] text-[var(--color-text-muted)] mb-0.5">User ID</div>
              <div className="text-[13px] text-text-primary font-mono truncate">{review.user_id}</div>
            </div>
            {review.reviewed_by && (
              <div>
                <div className="text-[11px] text-[var(--color-text-muted)] mb-0.5">Reviewed by</div>
                <div className="text-[13px] text-text-primary">{review.reviewed_by}</div>
              </div>
            )}
            {review.reviewed_at > 0 && (
              <div>
                <div className="text-[11px] text-[var(--color-text-muted)] mb-0.5">Reviewed at</div>
                <div className="text-[13px] text-text-primary">{formatTimestamp(review.reviewed_at)}</div>
              </div>
            )}
            {review.reject_reason && (
              <div className="col-span-2">
                <div className="text-[11px] text-[var(--color-text-muted)] mb-0.5">Reject reason</div>
                <div className="text-[13px] text-danger">{review.reject_reason}</div>
              </div>
            )}
          </div>
        </div>

        {/* Action buttons — only show for pending reviews */}
        {isPending && (
          <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border-light)]">
            <button
              onClick={handleApprove}
              disabled={actionLoading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cta text-white text-[14px] font-semibold hover:bg-cta-hover transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckIcon />
              {actionLoading ? "Sending..." : isEditing && editedOutput !== review.full_output ? "Approve with edits" : "Approve & Send"}
            </button>

            <button
              onClick={() => setShowRejectModal(true)}
              disabled={actionLoading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-danger/30 text-danger text-[14px] font-semibold hover:bg-danger/5 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <XIcon />
              Reject
            </button>
          </div>
        )}

        {/* Reject modal */}
        {showRejectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="fixed inset-0 bg-black/40"
              onClick={() => setShowRejectModal(false)}
            />
            <div className="relative bg-white rounded-xl shadow-[var(--shadow-lg)] w-full max-w-[440px] mx-4 p-6 modal-enter">
              <h3 className="text-[17px] font-bold text-text-primary mb-2">
                Reject this response?
              </h3>
              <p className="text-[14px] text-[var(--color-text-muted)] mb-4">
                The email will not be sent to the user. Optionally provide a reason.
              </p>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Reason for rejection (optional)..."
                className="w-full rounded-lg border border-[var(--color-border-light)] p-3 text-[14px] h-24 resize-none focus:outline-none focus:border-cta focus:ring-1 focus:ring-cta/20 mb-4"
              />
              <div className="flex items-center gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowRejectModal(false);
                    setRejectReason("");
                  }}
                  className="px-4 py-2 text-[14px] font-semibold text-[var(--color-text-muted)] hover:text-text-primary transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  disabled={actionLoading}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-danger text-white text-[14px] font-semibold hover:bg-danger/90 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {actionLoading ? "Rejecting..." : "Reject"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}

export default function ReviewDetailPage() {
  return (
    <AdminGuard>
      <ReviewDetailContent />
    </AdminGuard>
  );
}
