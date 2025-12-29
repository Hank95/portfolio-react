import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  as?: 'section' | 'div';
  wide?: boolean;
}

export function Section({
  id,
  children,
  className,
  containerClassName,
  as: Component = 'section',
  wide = false,
}: SectionProps) {
  return (
    <Component
      id={id}
      className={cn('py-16 md:py-24', className)}
    >
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
