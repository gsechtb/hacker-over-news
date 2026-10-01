import type { Severity } from "@/lib/posts";

const LABELS: Record<Severity, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

const CLASSES: Record<Severity, string> = {
  critical: "bg-[color-mix(in_srgb,var(--severity-critical)_16%,transparent)] text-[var(--severity-critical)] border-[var(--severity-critical)]",
  high: "bg-[color-mix(in_srgb,var(--severity-high)_16%,transparent)] text-[var(--severity-high)] border-[var(--severity-high)]",
  medium: "bg-[color-mix(in_srgb,var(--severity-medium)_16%,transparent)] text-[var(--severity-medium)] border-[var(--severity-medium)]",
  low: "bg-[color-mix(in_srgb,var(--severity-low)_16%,transparent)] text-[var(--severity-low)] border-[var(--severity-low)]",
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs font-medium uppercase tracking-wide ${CLASSES[severity]}`}
    >
      {LABELS[severity]}
    </span>
  );
}
