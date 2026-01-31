import { cn } from '@/lib/utils';

type Status = 'live' | 'building' | 'professional';

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  live: {
    label: 'Live',
    className: 'text-status-live bg-status-live/10',
  },
  building: {
    label: 'Building',
    className: 'text-status-building bg-status-building/10',
  },
  professional: {
    label: 'Professional',
    className: 'text-status-professional bg-status-professional/10',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 text-xs font-mono rounded',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
