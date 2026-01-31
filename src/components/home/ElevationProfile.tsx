import { useEffect, useState, useRef } from 'react';
import { BC100K_COURSE } from '@/data/bc100k-course';

// Convert elevation points to SVG path
function generatePath(points: readonly number[], width: number, height: number, minElev: number, maxElev: number): string {
  const range = maxElev - minElev;
  const segmentWidth = width / (points.length - 1);
  const padding = height * 0.1; // 10% padding top and bottom

  let path = '';
  for (let i = 0; i < points.length; i++) {
    const x = i * segmentWidth;
    const normalizedElev = (points[i] - minElev) / range;
    const y = height - padding - (normalizedElev * (height - 2 * padding));
    path += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
  }

  return path;
}

// Generate filled area path
function generateAreaPath(points: readonly number[], width: number, height: number, minElev: number, maxElev: number): string {
  const linePath = generatePath(points, width, height, minElev, maxElev);
  return `${linePath} L ${width} ${height} L 0 ${height} Z`;
}

// Get elevation at a specific mile
function getElevationAtMile(mile: number, totalMiles: number, points: readonly number[]): number {
  const index = Math.min(
    Math.floor((mile / totalMiles) * (points.length - 1)),
    points.length - 1
  );
  return points[index];
}

interface ElevationProfileProps {
  className?: string;
}

export function ElevationProfile({ className = '' }: ElevationProfileProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverPosition, setHoverPosition] = useState(0);
  const [hoveredAidStation, setHoveredAidStation] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { elevationPoints, aidStations, distance, minElevation, maxElevation } = BC100K_COURSE;

  const width = 1000;
  const height = 100;
  const linePath = generatePath(elevationPoints, width, height, minElevation, maxElevation);
  const areaPath = generateAreaPath(elevationPoints, width, height, minElevation, maxElevation);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(Math.max(window.scrollY / scrollHeight, 0), 1);
      setScrollProgress(progress);
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    setHoverPosition(Math.min(Math.max(x, 0), 1));

    // Check if near an aid station
    const hoverMile = x * distance;
    const nearbyStation = aidStations.find(
      (station) => Math.abs(station.mile - hoverMile) < 1.5
    );
    setHoveredAidStation(nearbyStation?.name || null);
  };

  // Calculate progress position
  const progressX = scrollProgress * width;
  const progressMile = scrollProgress * distance;
  const progressElevation = getElevationAtMile(progressMile, distance, elevationPoints);
  const progressY = height * 0.1 + (1 - (progressElevation - minElevation) / (maxElevation - minElevation)) * (height * 0.8);

  // Hover calculations
  const hoverMile = hoverPosition * distance;
  const hoverElevation = getElevationAtMile(hoverMile, distance, elevationPoints);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredAidStation(null);
      }}
      onMouseMove={handleMouseMove}
      role="img"
      aria-label={`Black Canyon 100k elevation profile. ${distance} miles, elevation from ${minElevation.toLocaleString()}ft to ${maxElevation.toLocaleString()}ft`}
    >
      {/* SVG Elevation Profile */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="w-full h-20 md:h-24"
        aria-hidden="true"
      >
        <defs>
          {/* Gradient for the filled area */}
          <linearGradient id="elevationFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(var(--color-accent))" stopOpacity="0.15" />
            <stop offset="50%" stopColor="rgb(var(--color-accent))" stopOpacity="0.08" />
            <stop offset="100%" stopColor="rgb(var(--color-accent))" stopOpacity="0.02" />
          </linearGradient>

          {/* Progress gradient */}
          <linearGradient id="progressFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(var(--color-accent))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="rgb(var(--color-accent))" stopOpacity="0.1" />
          </linearGradient>

          {/* Glow filter for progress dot */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Clip path for progress */}
          <clipPath id="progressClip">
            <rect x="0" y="0" width={progressX} height={height} />
          </clipPath>
        </defs>

        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((pct) => (
          <line
            key={pct}
            x1={pct * width}
            y1="0"
            x2={pct * width}
            y2={height}
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="4 4"
            className="text-border"
            opacity="0.5"
          />
        ))}

        {/* Background area fill */}
        <path
          d={areaPath}
          fill="url(#elevationFill)"
        />

        {/* Progress fill */}
        <path
          d={areaPath}
          fill="url(#progressFill)"
          clipPath="url(#progressClip)"
        />

        {/* Main elevation line */}
        <path
          d={linePath}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-text-subtle"
          opacity="0.6"
        />

        {/* Progress line overlay */}
        <path
          d={linePath}
          fill="none"
          stroke="rgb(var(--color-accent))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          clipPath="url(#progressClip)"
        />

        {/* Aid station markers */}
        {aidStations.map((station) => {
          const stationX = (station.mile / distance) * width;
          const stationElev = getElevationAtMile(station.mile, distance, elevationPoints);
          const stationY = height * 0.1 + (1 - (stationElev - minElevation) / (maxElevation - minElevation)) * (height * 0.8);
          const isHighlighted = hoveredAidStation === station.name;

          return (
            <g key={station.name}>
              {/* Vertical line to marker */}
              <line
                x1={stationX}
                y1={stationY}
                x2={stationX}
                y2={height - 5}
                stroke={isHighlighted ? 'rgb(var(--color-status-building))' : 'currentColor'}
                strokeWidth={isHighlighted ? 1.5 : 0.75}
                strokeDasharray={isHighlighted ? 'none' : '2 2'}
                className={isHighlighted ? '' : 'text-text-subtle'}
                opacity={isHighlighted ? 1 : 0.4}
              />
              {/* Marker dot */}
              <circle
                cx={stationX}
                cy={stationY}
                r={isHighlighted ? 4 : 2.5}
                fill={isHighlighted ? 'rgb(var(--color-status-building))' : 'currentColor'}
                className={isHighlighted ? '' : 'text-text-subtle'}
              />
            </g>
          );
        })}

        {/* Hover line */}
        {isHovered && (
          <line
            x1={hoverPosition * width}
            y1="0"
            x2={hoverPosition * width}
            y2={height}
            stroke="currentColor"
            strokeWidth="1"
            className="text-text-muted"
            opacity="0.6"
          />
        )}

        {/* Progress indicator dot */}
        <circle
          cx={progressX}
          cy={progressY}
          r="5"
          fill="rgb(var(--color-accent))"
          filter="url(#glow)"
        />
        <circle
          cx={progressX}
          cy={progressY}
          r="8"
          fill="rgb(var(--color-accent))"
          fillOpacity="0.2"
        />
      </svg>

      {/* Info bar below profile */}
      <div className="flex items-center justify-between mt-3 text-xs font-mono">
        <div className="flex items-center gap-4">
          <span className="text-text-subtle">0 mi</span>
          <span className="text-text-subtle opacity-60">|</span>
          <span className="text-text-subtle">{maxElevation.toLocaleString()} ft</span>
        </div>

        {/* Center info */}
        <div className="text-center">
          {isHovered ? (
            <span className="text-text-muted">
              {hoveredAidStation ? (
                <span className="text-status-building">{hoveredAidStation}</span>
              ) : (
                <>
                  <span className="text-text">{hoverMile.toFixed(1)} mi</span>
                  <span className="text-text-subtle mx-2">·</span>
                  <span>{hoverElevation.toLocaleString()} ft</span>
                </>
              )}
            </span>
          ) : (
            <span className="text-accent">
              {progressMile.toFixed(1)} mi · {progressElevation.toLocaleString()} ft
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <span className="text-text-subtle">{minElevation.toLocaleString()} ft</span>
          <span className="text-text-subtle opacity-60">|</span>
          <span className="text-text-subtle">{distance} mi</span>
        </div>
      </div>

      {/* Aid stations legend */}
      <div className="flex items-center justify-center gap-4 mt-2 text-xs text-text-subtle">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-text-subtle" />
          <span>Aid Stations</span>
        </div>
        <span className="opacity-40">·</span>
        <span className="opacity-60">Scroll to explore the course</span>
      </div>
    </div>
  );
}
