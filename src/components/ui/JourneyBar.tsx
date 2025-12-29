import { useEffect, useState, useRef } from 'react';
import { BC100K_COURSE } from '@/data/bc100k-course';

// Portfolio sections mapped to race waypoints
const PORTFOLIO_WAYPOINTS = [
  { id: 'intro', label: 'Start', mile: 0 },
  { id: 'work', label: 'Work', mile: 20 },
  { id: 'about', label: 'About', mile: 45 },
  { id: 'contact', label: 'Finish', mile: 62 },
];

// Generate SVG path from elevation points
function generatePath(
  points: readonly number[],
  width: number,
  height: number,
  minElev: number,
  maxElev: number
): string {
  const range = maxElev - minElev;
  const segmentWidth = width / (points.length - 1);
  const padding = height * 0.15;

  let path = '';
  for (let i = 0; i < points.length; i++) {
    const x = i * segmentWidth;
    const normalizedElev = (points[i] - minElev) / range;
    const y = height - padding - normalizedElev * (height - 2 * padding);
    path += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
  }
  return path;
}

function generateAreaPath(
  points: readonly number[],
  width: number,
  height: number,
  minElev: number,
  maxElev: number
): string {
  const linePath = generatePath(points, width, height, minElev, maxElev);
  return `${linePath} L ${width} ${height} L 0 ${height} Z`;
}

function getElevationAtProgress(
  progress: number,
  points: readonly number[]
): number {
  const index = Math.min(
    Math.floor(progress * (points.length - 1)),
    points.length - 1
  );
  return points[index];
}

export function JourneyBar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverProgress, setHoverProgress] = useState<number | null>(null);
  const [hoveredAidStation, setHoveredAidStation] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const { elevationPoints, distance, minElevation, maxElevation, aidStations } = BC100K_COURSE;

  const width = 1000;
  const height = 60;
  const linePath = generatePath(elevationPoints, width, height, minElevation, maxElevation);
  const areaPath = generateAreaPath(elevationPoints, width, height, minElevation, maxElevation);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(Math.max(window.scrollY / scrollHeight, 0), 1);
      setScrollProgress(progress);

      // Show after scrolling past 10% of the page
      setIsVisible(window.scrollY > window.innerHeight * 0.1);
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!profileRef.current) return;
    const rect = profileRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    setHoverProgress(Math.min(Math.max(x, 0), 1));

    // Check if hovering near an aid station
    const mouseProgress = Math.min(Math.max(x, 0), 1);
    const mouseMile = mouseProgress * distance;
    const nearbyStation = aidStations.findIndex(
      (station) => Math.abs(station.mile - mouseMile) < 1.5
    );
    setHoveredAidStation(nearbyStation >= 0 ? nearbyStation : null);
  };

  // Progress calculations
  const progressX = scrollProgress * width;
  const progressMile = scrollProgress * distance;
  const progressElevation = getElevationAtProgress(scrollProgress, elevationPoints);
  const progressY =
    height * 0.15 +
    (1 - (progressElevation - minElevation) / (maxElevation - minElevation)) * (height * 0.7);

  // Hover calculations
  const displayProgress = hoverProgress ?? scrollProgress;
  const displayMile = displayProgress * distance;
  const displayElevation = getElevationAtProgress(displayProgress, elevationPoints);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className={`
        fixed bottom-0 left-0 right-0 z-50
        transition-all duration-500 ease-out
        ${isExpanded ? 'h-28' : 'h-12'}
      `}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => {
        setIsExpanded(false);
        setHoverProgress(null);
        setHoveredAidStation(null);
      }}
    >
      {/* Glassmorphism background */}
      <div
        className={`
          absolute inset-0
          bg-gradient-to-t from-bg via-bg/95 to-bg/80
          backdrop-blur-md
          border-t border-border/50
          transition-all duration-500
        `}
      />

      {/* Content container */}
      <div className="relative h-full max-w-5xl mx-auto px-6 flex flex-col justify-end">
        {/* Expanded view - full elevation profile */}
        <div
          ref={profileRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            setHoverProgress(null);
            setHoveredAidStation(null);
          }}
          className={`
            absolute inset-x-6 top-3
            transition-all duration-500 cursor-crosshair
            ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
          `}
        >
          <svg
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
            className="w-full h-14"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="journeyFill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
              </linearGradient>
              <linearGradient id="journeyProgressFill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
              </linearGradient>
              <clipPath id="journeyProgressClip">
                <rect x="0" y="0" width={progressX} height={height} />
              </clipPath>
              <filter id="journeyGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background fill */}
            <path d={areaPath} fill="url(#journeyFill)" />

            {/* Progress fill */}
            <path d={areaPath} fill="url(#journeyProgressFill)" clipPath="url(#journeyProgressClip)" />

            {/* Elevation line */}
            <path
              d={linePath}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-text-subtle"
              opacity="0.4"
            />

            {/* Progress line */}
            <path
              d={linePath}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinecap="round"
              clipPath="url(#journeyProgressClip)"
            />

            {/* Aid station markers */}
            {aidStations.map((station, index) => {
              const stationX = (station.mile / distance) * width;
              const stationElev = getElevationAtProgress(station.mile / distance, elevationPoints);
              const stationY =
                height * 0.15 +
                (1 - (stationElev - minElevation) / (maxElevation - minElevation)) * (height * 0.7);
              const isPassed = progressMile >= station.mile;
              const isHovered = hoveredAidStation === index;

              return (
                <g key={station.name} className="cursor-pointer">
                  {/* Vertical line from marker to bottom */}
                  <line
                    x1={stationX}
                    y1={stationY + 3}
                    x2={stationX}
                    y2={height}
                    stroke={isHovered ? '#22c55e' : isPassed ? '#3b82f6' : 'currentColor'}
                    strokeWidth="1"
                    strokeDasharray="2 2"
                    className={isPassed || isHovered ? '' : 'text-text-subtle'}
                    opacity={isHovered ? 0.8 : isPassed ? 0.4 : 0.2}
                  />
                  {/* Triangle marker */}
                  <polygon
                    points={`${stationX},${stationY - 4} ${stationX - 4},${stationY + 4} ${stationX + 4},${stationY + 4}`}
                    fill={isHovered ? '#22c55e' : isPassed ? '#3b82f6' : 'currentColor'}
                    className={isPassed || isHovered ? '' : 'text-text-subtle'}
                    opacity={isHovered ? 1 : isPassed ? 0.7 : 0.4}
                  />
                  {/* Hover glow */}
                  {isHovered && (
                    <circle
                      cx={stationX}
                      cy={stationY}
                      r="12"
                      fill="#22c55e"
                      fillOpacity="0.15"
                    />
                  )}
                </g>
              );
            })}

            {/* Portfolio waypoint markers */}
            {PORTFOLIO_WAYPOINTS.map((waypoint) => {
              const waypointX = (waypoint.mile / distance) * width;
              const waypointElev = getElevationAtProgress(waypoint.mile / distance, elevationPoints);
              const waypointY =
                height * 0.15 +
                (1 - (waypointElev - minElevation) / (maxElevation - minElevation)) * (height * 0.7);
              const isPassed = progressMile >= waypoint.mile;

              return (
                <g key={waypoint.id}>
                  <line
                    x1={waypointX}
                    y1={waypointY + 4}
                    x2={waypointX}
                    y2={height}
                    stroke={isPassed ? '#3b82f6' : 'currentColor'}
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    className={isPassed ? '' : 'text-text-subtle'}
                    opacity={isPassed ? 0.6 : 0.3}
                  />
                  <circle
                    cx={waypointX}
                    cy={waypointY}
                    r={isPassed ? 4 : 3}
                    fill={isPassed ? '#3b82f6' : 'currentColor'}
                    className={isPassed ? '' : 'text-text-subtle'}
                  />
                </g>
              );
            })}

            {/* Hover indicator */}
            {hoverProgress !== null && (
              <line
                x1={hoverProgress * width}
                y1="0"
                x2={hoverProgress * width}
                y2={height}
                stroke="currentColor"
                strokeWidth="1"
                className="text-text-muted"
                opacity="0.5"
              />
            )}

            {/* Progress dot */}
            <circle cx={progressX} cy={progressY} r="6" fill="#3b82f6" filter="url(#journeyGlow)" />
            <circle cx={progressX} cy={progressY} r="10" fill="#3b82f6" fillOpacity="0.2" />
          </svg>

          {/* Aid station tooltip */}
          {hoveredAidStation !== null && (
            <div
              className="absolute -top-8 px-2 py-1 bg-bg-muted border border-border rounded text-xs whitespace-nowrap transform -translate-x-1/2 pointer-events-none"
              style={{
                left: `${(aidStations[hoveredAidStation].mile / distance) * 100}%`,
              }}
            >
              <span className="text-status-live font-medium">{aidStations[hoveredAidStation].name}</span>
              <span className="text-text-subtle ml-2">Mile {aidStations[hoveredAidStation].mile}</span>
            </div>
          )}
        </div>

        {/* Bottom info bar - always visible */}
        <div className="relative flex items-center justify-between h-12 text-xs font-mono">
          {/* Left - Race name */}
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-text-muted hidden sm:block">Black Canyon 100k</span>
          </div>

          {/* Center - Progress info */}
          <div className="flex items-center gap-3">
            {/* Mini elevation silhouette (collapsed view) */}
            <div className={`transition-opacity duration-300 ${isExpanded ? 'opacity-0' : 'opacity-100'}`}>
              <svg viewBox={`0 0 ${width} 20`} className="w-32 h-4" preserveAspectRatio="none">
                <path
                  d={generatePath(elevationPoints, width, 20, minElevation, maxElevation)}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-text-subtle"
                  opacity="0.5"
                />
                <circle
                  cx={progressX}
                  cy={
                    20 * 0.1 +
                    (1 - (progressElevation - minElevation) / (maxElevation - minElevation)) * 20 * 0.8
                  }
                  r="3"
                  fill="#3b82f6"
                />
              </svg>
            </div>

            <span className="text-text">
              {displayMile.toFixed(1)} mi
            </span>
            <span className="text-text-subtle">·</span>
            <span className="text-text-muted">
              {displayElevation.toLocaleString()} ft
            </span>
          </div>

          {/* Right - Waypoints */}
          <div className="hidden md:flex items-center gap-4">
            {PORTFOLIO_WAYPOINTS.map((waypoint, index) => {
              const isPassed = progressMile >= waypoint.mile;
              const isCurrent =
                index < PORTFOLIO_WAYPOINTS.length - 1
                  ? progressMile >= waypoint.mile && progressMile < PORTFOLIO_WAYPOINTS[index + 1].mile
                  : progressMile >= waypoint.mile;

              return (
                <button
                  key={waypoint.id}
                  onClick={() => {
                    const element = document.getElementById(waypoint.id);
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`
                    transition-colors text-xs
                    ${isCurrent ? 'text-accent' : isPassed ? 'text-text-muted' : 'text-text-subtle'}
                    hover:text-text
                  `}
                >
                  {waypoint.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
