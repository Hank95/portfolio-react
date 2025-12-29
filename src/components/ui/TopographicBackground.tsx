import { useMemo } from 'react';

interface TopographicBackgroundProps {
  className?: string;
  opacity?: number;
  lineCount?: number;
}

export function TopographicBackground({
  className = '',
  opacity = 0.03,
  lineCount = 12,
}: TopographicBackgroundProps) {
  // Generate organic-looking contour lines
  const contourLines = useMemo(() => {
    const lines: string[] = [];
    const width = 1000;
    const height = 600;

    for (let i = 0; i < lineCount; i++) {
      const baseY = (height / (lineCount + 1)) * (i + 1);
      const amplitude = 30 + Math.random() * 40;
      const frequency = 0.003 + Math.random() * 0.002;
      const phase = Math.random() * Math.PI * 2;

      let path = `M 0 ${baseY}`;

      for (let x = 0; x <= width; x += 10) {
        // Combine multiple sine waves for organic feel
        const y =
          baseY +
          Math.sin(x * frequency + phase) * amplitude +
          Math.sin(x * frequency * 2.3 + phase * 1.5) * (amplitude * 0.4) +
          Math.sin(x * frequency * 0.5 + phase * 0.7) * (amplitude * 0.6);

        path += ` L ${x} ${y}`;
      }

      lines.push(path);
    }

    return lines;
  }, [lineCount]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        style={{ opacity }}
      >
        <defs>
          <linearGradient id="topoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.6" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {contourLines.map((path, index) => (
          <path
            key={index}
            d={path}
            fill="none"
            stroke="url(#topoGradient)"
            strokeWidth={0.8 + (index % 3 === 0 ? 0.4 : 0)}
            className="text-accent"
          />
        ))}
      </svg>
    </div>
  );
}
