import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { z } from "zod";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

const BUDGET_PRESETS = [
  { value: "8k-15k", label: "Rs. 8,000 - Rs. 15,000" },
  { value: "16k-35k", label: "Rs. 16,000 - Rs. 35,000" },
  { value: "30k+", label: "Rs. 30,000+" },
  { value: "custom", label: "Enter custom amount" },
] as const;

const contactSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be less than 100 characters")
      .regex(/^[a-zA-Z\s.'-]+$/, "Name contains invalid characters"),
    email: z
      .string()
      .trim()
      .email("Please enter a valid email address")
      .max(255, "Email is too long"),
    phone: z
      .string()
      .trim()
      .max(15, "Phone number is too long")
      .regex(/^[+\d\s()-]*$/, "Phone number contains invalid characters")
      .optional()
      .or(z.literal("")),
    budget: z.string().min(1, "Please select a budget"),
    customBudget: z.string().optional().or(z.literal("")),
    details: z
      .string()
      .trim()
      .min(10, "Please share at least 10 characters about your project")
      .max(1000, "Message must be less than 1000 characters"),
  })
  .superRefine((data, ctx) => {
    if (data.budget === "custom") {
      const raw = (data.customBudget ?? "").replace(/[,\s]/g, "");
      const num = Number(raw);

      if (!raw) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["customBudget"],
          message: "Please enter your budget amount",
        });
      } else if (Number.isNaN(num) || num <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["customBudget"],
          message: "Enter a valid amount in numbers",
        });
      } else if (num < 1000) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["customBudget"],
          message: "Minimum budget is Rs. 1,000",
        });
      } else if (num > 100000000) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["customBudget"],
          message: "Amount looks too high",
        });
      }
    }
  });

type ContactForm = z.infer<typeof contactSchema>;
type FieldErrors = Partial<Record<keyof ContactForm, string>>;

const initialForm: ContactForm = {
  name: "",
  email: "",
  phone: "",
  budget: "",
  customBudget: "",
  details: "",
};

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const updateField = <K extends keyof ContactForm>(key: K, value: ContactForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ContactForm | undefined;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }

      setErrors(fieldErrors);
      toast({
        title: "Please fix the highlighted fields",
        description: "Some details need your attention before sending.",
        variant: "destructive",
      });
      return;
    }

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      toast({
        title: "Contact form is not configured",
        description: "Add your EmailJS keys in the environment file before using this form.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      const emailjs = (await import("emailjs-com")).default;

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: result.data.name,
          from_email: result.data.email,
          phone: result.data.phone || "Not provided",
          budget:
            result.data.budget === "custom"
              ? `Custom: Rs. ${result.data.customBudget}`
              : result.data.budget,
          message: result.data.details,
          reply_to: result.data.email,
        },
        EMAILJS_PUBLIC_KEY,
      );

      toast({
        title: "Message sent",
        description: "Thank you for reaching out. I'll get back to you within 24 hours.",
      });
      setForm(initialForm);
      setErrors({});
    } catch (error) {
      console.error("EmailJS send failed", error);
      toast({
        title: "Message failed to send",
        description: "Please try again in a moment or contact me directly by email.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputBase =
    "w-full rounded-xl border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none";
  const inputClass = (hasError?: string) =>
    `${inputBase} ${hasError ? "border-destructive focus:border-destructive" : "border-border focus:border-primary/50"}`;

  return (
    <>
      <Toaster />
      <section id="contact" className="relative py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center sm:mb-16"
        >
          <p className="mb-2 text-xs uppercase tracking-widest text-primary sm:text-sm">Get In Touch</p>
          <h2 className="text-3xl font-display font-bold sm:text-4xl md:text-5xl">
            Let&apos;s Build Something <span className="text-gradient-gold">Amazing</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl px-2 text-sm text-muted-foreground sm:text-base">
            Ready to take your business to the next level? Fill the form and I&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.form
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 rounded-2xl glass p-5 sm:space-y-5 sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              <div>
                <input
                  type="text"
                  placeholder="Your Name *"
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className={inputClass(errors.name)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "err-name" : undefined}
                />
                {errors.name && <p id="err-name" className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email Address *"
                  required
                  maxLength={255}
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={inputClass(errors.email)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "err-email" : undefined}
                />
                {errors.email && <p id="err-email" className="mt-1 text-xs text-destructive">{errors.email}</p>}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  maxLength={15}
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className={inputClass(errors.phone)}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "err-phone" : undefined}
                />
                {errors.phone && <p id="err-phone" className="mt-1 text-xs text-destructive">{errors.phone}</p>}
              </div>

              <div>
                <select
                  value={form.budget}
                  onChange={(e) => updateField("budget", e.target.value)}
                  className={inputClass(errors.budget)}
                  aria-invalid={!!errors.budget}
                  aria-describedby={errors.budget ? "err-budget" : undefined}
                >
                  <option value="">Select Budget *</option>
                  {BUDGET_PRESETS.map((b) => (
                    <option key={b.value} value={b.value}>
                      {b.label}
                    </option>
                  ))}
                </select>
                {errors.budget && <p id="err-budget" className="mt-1 text-xs text-destructive">{errors.budget}</p>}
              </div>
            </div>

            {form.budget === "custom" && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    Rs.
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Enter your budget amount (e.g. 25000)"
                    maxLength={12}
                    value={form.customBudget ?? ""}
                    onChange={(e) => updateField("customBudget", e.target.value.replace(/[^\d,\s]/g, ""))}
                    className={`${inputClass(errors.customBudget)} pl-12`}
                    aria-invalid={!!errors.customBudget}
                    aria-describedby={errors.customBudget ? "err-custom" : undefined}
                  />
                </div>
                {errors.customBudget && (
                  <p id="err-custom" className="mt-1 text-xs text-destructive">
                    {errors.customBudget}
                  </p>
                )}
                <p className="mt-1 text-xs text-muted-foreground">Minimum Rs. 1,000, numbers only.</p>
              </motion.div>
            )}

            <div>
              <textarea
                placeholder="Tell me about your project... *"
                required
                maxLength={1000}
                rows={5}
                value={form.details}
                onChange={(e) => updateField("details", e.target.value)}
                className={`${inputClass(errors.details)} resize-none`}
                aria-invalid={!!errors.details}
                aria-describedby={errors.details ? "err-details" : undefined}
              />
              <div className="mt-1 flex justify-between">
                {errors.details ? (
                  <p id="err-details" className="text-xs text-destructive">
                    {errors.details}
                  </p>
                ) : (
                  <span />
                )}
                <p className="text-xs text-muted-foreground">{form.details.length}/1000</p>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: submitting ? 1 : 1.02 }}
              whileTap={{ scale: submitting ? 1 : 0.98 }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[0_0_40px_hsla(43,96%,56%,0.3)] disabled:cursor-not-allowed disabled:opacity-60 sm:py-4"
            >
              {submitting ? "Sending..." : <>Send Message <Send size={18} /></>}
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-5 sm:gap-6"
          >
            {[
              {
                icon: Phone,
                title: "Phone",
                value: "+91 82484 73894",
                subtitle: "Mon-Sat, 09am - 06pm IST",
                href: "tel:+918248473894",
              },
              {
                icon: Mail,
                title: "Email",
                value: "matrixheavenxdeveloper@gmail.com",
                subtitle: "Reply within 24 hours",
                href: "mailto:matrixheavenxdeveloper@gmail.com",
              },
              {
                icon: MapPin,
                title: "Location",
                value: "India",
                subtitle: "Available for remote work worldwide",
                href: null as string | null,
              },
            ].map((item, i) => {
              const content = (
                <>
                  <div className="shrink-0 rounded-xl bg-primary/10 p-3">
                    <item.icon className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-semibold text-foreground sm:text-base">{item.title}</h4>
                    <p className="mt-1 break-words text-sm text-foreground sm:text-base">{item.value}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">{item.subtitle}</p>
                  </div>
                </>
              );

              const className =
                "flex items-start gap-4 rounded-2xl glass p-5 transition-all duration-300 hover:glow-gold sm:p-6";

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  {item.href ? (
                    <a href={item.href} className={className}>
                      {content}
                    </a>
                  ) : (
                    <div className={className}>{content}</div>
                  )}
                </motion.div>
              );
            })}

            <div className="mt-2 rounded-2xl glass p-5 sm:p-6">
              <h4 className="mb-3 text-sm font-semibold text-foreground sm:text-base">Limited Availability</h4>
              <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                I&apos;m open to new projects while keeping a high level of quality and attention for every client.
              </p>
            </div>
          </motion.div>
        </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
