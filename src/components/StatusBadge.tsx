interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'dot';
}

const colorMap: Record<string, string> = {
  healthy: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  warning: 'bg-amber-50 text-amber-700 ring-amber-200',
  critical: 'bg-red-50 text-red-700 ring-red-200',
  low: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  medium: 'bg-amber-50 text-amber-700 ring-amber-200',
  high: 'bg-red-50 text-red-700 ring-red-200',
  'very-high': 'bg-red-50 text-red-700 ring-red-200',
  draft: 'bg-surface-100 text-surface-600 ring-surface-200',
  review: 'bg-primary-50 text-primary-700 ring-primary-200',
  approved: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  ready: 'bg-violet-50 text-violet-700 ring-violet-200',
  pending: 'bg-amber-50 text-amber-700 ring-amber-200',
  analyzing: 'bg-primary-50 text-primary-700 ring-primary-200',
  completed: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  error: 'bg-red-50 text-red-700 ring-red-200',
  business: 'bg-blue-50 text-blue-700 ring-blue-200',
  functional: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
  technical: 'bg-slate-100 text-slate-700 ring-slate-200',
  'non-functional': 'bg-purple-50 text-purple-700 ring-purple-200',
};

const dotColorMap: Record<string, string> = {
  healthy: 'bg-emerald-500',
  warning: 'bg-amber-500',
  critical: 'bg-red-500',
  low: 'bg-emerald-500',
  medium: 'bg-amber-500',
  high: 'bg-red-500',
  'very-high': 'bg-red-500',
};

export default function StatusBadge({ status, variant = 'default' }: StatusBadgeProps) {
  if (variant === 'dot') {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span className={`w-1.5 h-1.5 rounded-full ${dotColorMap[status] ?? 'bg-surface-400'}`} />
        <span className="text-xs capitalize text-surface-600">{status}</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium capitalize ring-1 ring-inset ${colorMap[status] ?? 'bg-surface-100 text-surface-600 ring-surface-200'}`}>
      {status}
    </span>
  );
}
