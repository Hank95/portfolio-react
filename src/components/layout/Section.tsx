import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  as?: 'section' | 'div';
  wide?: boolean;
  mileMarker?: number;
}

export function Section({
  id,
  children,
  className,
  containerClassName,
  as: Component = 'section',
  wide = false,
  mileMarker,
}: SectionProps) {
  return (
    <Component
      id={id}
      className={cn('py-16 md:py-24 relative', className)}
    >
      {/* Subtle mile marker */}
      {mileMarker !== undefined && (
        <div className="absolute top-8 right-4 md:right-8 font-mono text-[10px] text-text-subtle/30 tracking-wider select-none pointer-events-none">
          MI {mileMarker}
        </div>
      )}
      <div
        className={cn(
          wide ? 'wide-container' : 'content-container',
          containerClassName
        )}
      >
        {children}
      </div>
    </Component>
  );
}
