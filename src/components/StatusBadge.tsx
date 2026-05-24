interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'dot';
}

const colorMap: Record<string, string> = {
  healthy: 'bg-success-500/10 text-success-600',
  warning: 'bg-warning-500/10 text-warning-600',
  critical: 'bg-danger-500/10 text-danger-600',
  low: 'bg-success-500/10 text-success-600',
  medium: 'bg-warning-500/10 text-warning-600',
  high: 'bg-danger-500/10 text-danger-600',
  'very-high': 'bg-danger-500/10 text-danger-600',
  draft: 'bg-surface-200 text-surface-600',
  review: 'bg-primary-100 text-primary-700',
  approved: 'bg-success-500/10 text-success-600',
  ready: 'bg-accent-500/10 text-accent-600',
  pending: 'bg-warning-500/10 text-warning-600',
  analyzing: 'bg-primary-100 text-primary-700',
  completed: 'bg-success-500/10 text-success-600',
  error: 'bg-danger-500/10 text-danger-600',
};

const dotColorMap: Record<string, string> = {
  healthy: 'bg-success-500',
  warning: 'bg-warning-500',
  critical: 'bg-danger-500',
  low: 'bg-success-500',
  medium: 'bg-warning-500',
  high: 'bg-danger-500',
  'very-high': 'bg-danger-500',
};

export default function StatusBadge({ status, variant = 'default' }: StatusBadgeProps) {
  if (variant === 'dot') {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span className={`w-2 h-2 rounded-full ${dotColorMap[status] ?? 'bg-surface-400'}`} />
        <span className="text-xs capitalize text-surface-600">{status}</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${colorMap[status] ?? 'bg-surface-200 text-surface-600'}`}>
      {status}
    </span>
  );
}
