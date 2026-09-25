/**
 * Recreates the reference login animation: two endpoint avatars joined by
 * a dashed arc that bows UP toward the AI node sitting above it, plus a
 * small glowing signal that travels the arc on a loop.
 */
export default function PathFlow() {
  const path = "M70,150 Q320,55 570,150";

  return (
    <div className="relative mx-auto w-full max-w-[560px] py-2">
      <svg viewBox="0 0 640 210" className="w-full h-auto" aria-hidden="true">
        <defs>
          <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* dashed arc, bowing up toward the AI node */}
        <path
          d={path}
          fill="none"
          stroke="#2E4038"
          strokeWidth="2"
          strokeDasharray="2 8"
          strokeLinecap="round"
        />

        {/* traveling signal */}
        <circle r="5" fill="#2EE6A8" filter="url(#glow)">
          <animateMotion dur="3.4s" repeatCount="indefinite" path={path} />
        </circle>

        {/* left endpoint: the fitting */}
        <g>
          <circle cx="70" cy="150" r="26" fill="#111C17" stroke="#2E4038" strokeWidth="1.5" />
          <text x="70" y="156" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="15" fontWeight="600" fill="#FFFFFF">
            F
          </text>
        </g>

        {/* right endpoint: the inspector */}
        <g>
          <circle cx="570" cy="150" r="26" fill="#111C17" stroke="#2E4038" strokeWidth="1.5" />
          <text x="570" y="156" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="15" fontWeight="600" fill="#FFFFFF">
            Y
          </text>
        </g>

        {/* AI node, sitting just above the arc's peak, with a pulsing halo */}
        <g>
          <circle cx="320" cy="40" r="22" fill="none" stroke="#2EE6A8" strokeWidth="1.5" opacity="0.5">
            <animate attributeName="r" values="22;30;22" dur="2.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0;0.5" dur="2.6s" repeatCount="indefinite" />
          </circle>
          <circle cx="320" cy="40" r="22" fill="#0F1713" stroke="#2EE6A8" strokeWidth="1.5" />
          <text x="320" y="45" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="700" fill="#2EE6A8">
            AI
          </text>
          {/* short connector linking the AI node to the arc's peak */}
          <line x1="320" y1="62" x2="320" y2="80" stroke="#2E4038" strokeWidth="1.5" strokeDasharray="2 5" />
        </g>
      </svg>

      <div className="absolute left-0 right-0 top-0 h-full">
        <span className="absolute text-[0.72rem] text-white/45" style={{ left: "7%", top: "80%" }}>
          Fitting
        </span>
        <span className="absolute text-[0.72rem] text-white/45" style={{ left: "86%", top: "80%" }}>
          You
        </span>
        <span className="absolute text-[0.72rem] text-white/45" style={{ left: "46.5%", top: "40%" }}>
          Reads it
        </span>
      </div>
    </div>
  );
}
