export const STATUS_STYLES = {
  // Application tracking
  Applied: 'bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100',
  'Under Review': 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-100',
  Shortlisted: 'bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-100',
  Interview: 'bg-warning-50 text-warning-700 ring-1 ring-inset ring-warning-100',
  Selected: 'bg-success-50 text-success-700 ring-1 ring-inset ring-success-100',
  Rejected: 'bg-critical-50 text-critical-700 ring-1 ring-inset ring-critical-100',

  // Verification / licensing / collaboration workflows
  Submitted: 'bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100',
  'Pending Verification': 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-100',
  Negotiation: 'bg-warning-50 text-warning-700 ring-1 ring-inset ring-warning-100',
  Approved: 'bg-success-50 text-success-700 ring-1 ring-inset ring-success-100',
  Verified: 'bg-success-50 text-success-700 ring-1 ring-inset ring-success-100',
  Proposed: 'bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100',
  Open: 'bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100',
  'In Progress': 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-100',
  Completed: 'bg-success-50 text-success-700 ring-1 ring-inset ring-success-100',
  Closed: 'bg-navy-50 text-navy-500 ring-1 ring-inset ring-navy-100',
  Licensed: 'bg-success-50 text-success-700 ring-1 ring-inset ring-success-100',
  Available: 'bg-success-50 text-success-700 ring-1 ring-inset ring-success-100',

  Active: 'bg-success-50 text-success-700 ring-1 ring-inset ring-success-100',

  // Patent status
  Filed: 'bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100',
  Granted: 'bg-success-50 text-success-700 ring-1 ring-inset ring-success-100',
  'Not Filed': 'bg-navy-50 text-navy-500 ring-1 ring-inset ring-navy-100',
}

export function statusStyle(status) {
  return STATUS_STYLES[status] || 'bg-navy-50 text-navy-500 ring-1 ring-inset ring-navy-100'
}

export const PRIORITY_STYLES = {
  Critical: 'bg-critical-50 text-critical-700',
  High: 'bg-warning-50 text-warning-700',
  Medium: 'bg-amber-50 text-amber-700',
  Low: 'bg-success-50 text-success-700',
}

export function priorityStyle(priority) {
  return PRIORITY_STYLES[priority] || PRIORITY_STYLES.Medium
}

// Match-score banding (drives colour of AI match percentages across the app).
export function matchBand(score) {
  if (score >= 90) return { label: 'Excellent Match', text: 'text-success-600', badge: 'bg-success-50 text-success-700 ring-1 ring-inset ring-success-100', bar: 'bg-success-500' }
  if (score >= 75) return { label: 'Strong Match', text: 'text-brand-600', badge: 'bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100', bar: 'bg-brand-500' }
  if (score >= 50) return { label: 'Moderate Match', text: 'text-amber-600', badge: 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-100', bar: 'bg-amber-400' }
  return { label: 'Low Match', text: 'text-critical-600', badge: 'bg-critical-50 text-critical-700 ring-1 ring-inset ring-critical-100', bar: 'bg-critical-500' }
}

// Same banding as matchBand, but returning real hex values for SVG strokes
// (circular gauges) where Tailwind utility classes don't apply.
export function matchBandHex(score) {
  if (score >= 90) return '#12B76A'
  if (score >= 75) return '#3168F0'
  if (score >= 50) return '#F79009'
  return '#D92D20'
}

// Skill-benchmark bar colour: green once current meets/exceeds the target,
// amber for a near miss, red for a wide gap.
export function benchmarkColor(current, target) {
  if (current >= target) return { bar: 'bg-success-500', text: 'text-success-600' }
  const gap = target - current
  if (gap <= 12) return { bar: 'bg-amber-400', text: 'text-amber-600' }
  return { bar: 'bg-critical-500', text: 'text-critical-600' }
}
