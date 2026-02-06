"use client";

import { useState, FormEvent } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { CONTACT } from "@/lib/constants";

/* ──────────────────────────────────────────────
   Inline SVG icons (no icon libraries)
   ────────────────────────────────────────────── */

function EnvelopeIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#007A5A"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 4L12 13L2 4" />
    </svg>
  );
}

function HeadsetIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#007A5A"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 18v-6a9 9 0 0118 0v6" />
      <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5z" />
      <path d="M3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5z" />
    </svg>
  );
}

function HandshakeIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#007A5A"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.5 11.5L17 8l-4 1-3-3-6.5 6.5" />
      <path d="M3.5 14.5l4 4 3-1 2 2 2-2 2 2 3.5-3.5" />
      <path d="M13 9l4 4" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#007A5A"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
      <circle cx="12" cy="16" r="1" fill="#007A5A" stroke="none" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#007A5A"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
      <path d="M8 10h8M8 13h4" />
    </svg>
  );
}

/* ──────────────────────────────────────────────
   Shared form styles
   ────────────────────────────────────────────── */

const inputClass =
  "w-full h-10 px-3 rounded-[6px] border border-[var(--color-border-light)] bg-white text-[15px] text-text-primary placeholder:text-[var(--color-text-muted)] transition-colors duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] focus:border-info focus:outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2";

const selectClass =
  "w-full h-10 px-3 rounded-[6px] border border-[var(--color-border-light)] bg-white text-[15px] text-text-primary transition-colors duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] focus:border-info focus:outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2 appearance-none cursor-pointer";

const textareaClass =
  "w-full px-3 py-2.5 rounded-[6px] border border-[var(--color-border-light)] bg-white text-[15px] text-text-primary placeholder:text-[var(--color-text-muted)] transition-colors duration-[120ms] ease-[cubic-bezier(0.2,0,0,1)] focus:border-info focus:outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2 resize-y min-h-[100px]";

const labelClass = "block text-[13px] font-bold text-text-primary mb-1";

/* ──────────────────────────────────────────────
   Category icons map
   ────────────────────────────────────────────── */

const categoryIcons: Record<string, () => React.ReactNode> = {
  Sales: EnvelopeIcon,
  Support: HeadsetIcon,
  Partnerships: HandshakeIcon,
};

/* ──────────────────────────────────────────────
   Success banner component
   ────────────────────────────────────────────── */

function SuccessBanner({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-[8px] bg-[#f0faf6] border border-success">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2BAC76"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12l3 3 5-5" />
      </svg>
      <p className="text-[15px] text-text-primary font-bold">{message}</p>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Main ContactPage component
   ────────────────────────────────────────────── */

export default function ContactPage() {
  // Booking form state
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    company: "",
    meetingType: "",
    timezone: "",
    date: "",
    time: "",
    notes: "",
  });
  const [bookingSending, setBookingSending] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState("");

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    inquiryType: "",
    message: "",
  });
  const [contactSending, setContactSending] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState("");

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  async function handleBookingSubmit(e: FormEvent) {
    e.preventDefault();
    setBookingSending(true);
    setBookingError("");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingForm),
      });

      const data = await res.json();

      if (!res.ok) {
        setBookingError(data.error || "Something went wrong.");
        return;
      }

      setBookingSuccess(true);
      setBookingForm({
        name: "",
        email: "",
        company: "",
        meetingType: "",
        timezone: "",
        date: "",
        time: "",
        notes: "",
      });
    } catch {
      setBookingError("Network error. Please try again.");
    } finally {
      setBookingSending(false);
    }
  }

  async function handleContactSubmit(e: FormEvent) {
    e.preventDefault();
    setContactSending(true);
    setContactError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });

      const data = await res.json();

      if (!res.ok) {
        setContactError(data.error || "Something went wrong.");
        return;
      }

      setContactSuccess(true);
      setContactForm({
        name: "",
        email: "",
        company: "",
        role: "",
        inquiryType: "",
        message: "",
      });
    } catch {
      setContactError("Network error. Please try again.");
    } finally {
      setContactSending(false);
    }
  }

  return (
    <>
      {/* ── Section A: Header + Contact Categories ── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="text-center mb-12">
            <h1 className="text-[36px] md:text-[48px] font-bold text-text-primary leading-[1.1] mb-4">
              {CONTACT.heading}
            </h1>
            <p className="text-[17px] text-[var(--color-text-subtle)] max-w-[480px] mx-auto">
              Reach out to our team. We typically respond within a few hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[900px] mx-auto">
            {CONTACT.categories.map((cat) => {
              const Icon = categoryIcons[cat.title] || EnvelopeIcon;
              return (
                <Card key={cat.title} hoverable className="text-center p-8">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-[8px] bg-[#f0faf6] flex items-center justify-center">
                      <Icon />
                    </div>
                  </div>
                  <h3 className="text-[17px] font-bold text-text-primary mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-[15px] text-[var(--color-text-subtle)] mb-4">
                    {cat.description}
                  </p>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-[15px] font-bold text-link hover:underline transition-colors duration-[180ms]"
                  >
                    {CONTACT.email}
                  </a>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section B: Schedule a Call ── */}
      <section className="py-16 bg-surface-subtle">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="max-w-[680px] mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <CalendarIcon />
              <h2 className="text-[28px] md:text-[32px] font-bold text-text-primary">
                {CONTACT.booking.heading}
              </h2>
            </div>
            <p className="text-[15px] text-[var(--color-text-subtle)] mb-2">
              {CONTACT.booking.subtitle}
            </p>
            <p className="text-[15px] text-[var(--color-text-muted)] mb-8">
              {CONTACT.booking.description}
            </p>

            {bookingSuccess ? (
              <SuccessBanner message={CONTACT.form.bookingSuccessMessage} />
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-5">
                {/* Name + Email row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="booking-name" className={labelClass}>
                      Name <span className="text-danger">*</span>
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      required
                      placeholder="Your name"
                      className={inputClass}
                      value={bookingForm.name}
                      onChange={(e) =>
                        setBookingForm({ ...bookingForm, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="booking-email" className={labelClass}>
                      Work Email <span className="text-danger">*</span>
                    </label>
                    <input
                      id="booking-email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      className={inputClass}
                      value={bookingForm.email}
                      onChange={(e) =>
                        setBookingForm({
                          ...bookingForm,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="booking-company" className={labelClass}>
                    Company
                  </label>
                  <input
                    id="booking-company"
                    type="text"
                    placeholder="Your company"
                    className={inputClass}
                    value={bookingForm.company}
                    onChange={(e) =>
                      setBookingForm({
                        ...bookingForm,
                        company: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Meeting type + Timezone row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <label htmlFor="booking-meeting" className={labelClass}>
                      Meeting Platform
                    </label>
                    <select
                      id="booking-meeting"
                      className={selectClass}
                      value={bookingForm.meetingType}
                      onChange={(e) =>
                        setBookingForm({
                          ...bookingForm,
                          meetingType: e.target.value,
                        })
                      }
                    >
                      <option value="">Select platform</option>
                      {CONTACT.booking.meetingTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <ChevronDown />
                  </div>
                  <div className="relative">
                    <label htmlFor="booking-tz" className={labelClass}>
                      Timezone
                    </label>
                    <select
                      id="booking-tz"
                      className={selectClass}
                      value={bookingForm.timezone}
                      onChange={(e) =>
                        setBookingForm({
                          ...bookingForm,
                          timezone: e.target.value,
                        })
                      }
                    >
                      <option value="">Select timezone</option>
                      {CONTACT.booking.timezones.map((tz) => (
                        <option key={tz} value={tz}>
                          {tz}
                        </option>
                      ))}
                    </select>
                    <ChevronDown />
                  </div>
                </div>

                {/* Date + Time row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="booking-date" className={labelClass}>
                      Preferred Date <span className="text-danger">*</span>
                    </label>
                    <input
                      id="booking-date"
                      type="date"
                      required
                      min={today}
                      className={inputClass}
                      value={bookingForm.date}
                      onChange={(e) =>
                        setBookingForm({
                          ...bookingForm,
                          date: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="booking-time" className={labelClass}>
                      Preferred Time <span className="text-danger">*</span>
                    </label>
                    <select
                      id="booking-time"
                      required
                      className={selectClass}
                      value={bookingForm.time}
                      onChange={(e) =>
                        setBookingForm({
                          ...bookingForm,
                          time: e.target.value,
                        })
                      }
                    >
                      <option value="">Select time</option>
                      {CONTACT.booking.timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                    <ChevronDown />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="booking-notes" className={labelClass}>
                    Notes (optional)
                  </label>
                  <textarea
                    id="booking-notes"
                    placeholder="Tell us what you'd like to discuss..."
                    className={textareaClass}
                    value={bookingForm.notes}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, notes: e.target.value })
                    }
                  />
                </div>

                {/* Error */}
                {bookingError && (
                  <p className="text-[14px] text-danger font-bold">
                    {bookingError}
                  </p>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={bookingSending}
                  className="w-full md:w-auto"
                >
                  {bookingSending ? "Sending..." : CONTACT.booking.cta}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Section C: Send us a Message ── */}
      <section className="py-16">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="max-w-[680px] mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <MessageIcon />
              <h2 className="text-[28px] md:text-[32px] font-bold text-text-primary">
                {CONTACT.form.heading}
              </h2>
            </div>
            <p className="text-[15px] text-[var(--color-text-muted)] mb-8">
              Prefer to write? Drop us a message and we&apos;ll respond within
              24 hours.
            </p>

            {contactSuccess ? (
              <SuccessBanner message={CONTACT.form.successMessage} />
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-5">
                {/* Name + Email row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className={labelClass}>
                      Name <span className="text-danger">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Your name"
                      className={inputClass}
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className={labelClass}>
                      Work Email <span className="text-danger">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      className={inputClass}
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Company + Role row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-company" className={labelClass}>
                      Company
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      placeholder="Your company"
                      className={inputClass}
                      value={contactForm.company}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          company: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-role" className={labelClass}>
                      Role
                    </label>
                    <input
                      id="contact-role"
                      type="text"
                      placeholder="Your role"
                      className={inputClass}
                      value={contactForm.role}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          role: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Inquiry type */}
                <div className="relative">
                  <label htmlFor="contact-inquiry" className={labelClass}>
                    Inquiry Type
                  </label>
                  <select
                    id="contact-inquiry"
                    className={selectClass}
                    value={contactForm.inquiryType}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        inquiryType: e.target.value,
                      })
                    }
                  >
                    <option value="">Select type</option>
                    {CONTACT.form.inquiryTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <ChevronDown />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className={labelClass}>
                    Message <span className="text-danger">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    placeholder="How can we help?"
                    className={textareaClass}
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        message: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Error */}
                {contactError && (
                  <p className="text-[14px] text-danger font-bold">
                    {contactError}
                  </p>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={contactSending}
                  className="w-full md:w-auto"
                >
                  {contactSending ? "Sending..." : CONTACT.form.cta}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

/* ──────────────────────────────────────────────
   Chevron for custom select appearance
   ────────────────────────────────────────────── */

function ChevronDown() {
  return (
    <svg
      className="pointer-events-none absolute right-3 top-[38px] text-[var(--color-text-muted)]"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
