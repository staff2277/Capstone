import { useEffect, useState, useRef, useCallback } from "react";

const GRID_COLS = 20;
const GRID_ROWS = 12;
const TOTAL_CELLS = GRID_COLS * GRID_ROWS;
const TRANSITION_DURATION = 1200; // ms for full pixelated dissolve

const PageLoader = ({ isLoading, onTransitionEnd }) => {
  const [phase, setPhase] = useState("loading"); // "loading" | "dissolving" | "done"
  const [dissolvedCells, setDissolvedCells] = useState(new Set());
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const animFrameRef = useRef(null);

  // Animate the progress bar while loading
  useEffect(() => {
    if (phase !== "loading") return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return 90; // Cap at 90% until actually loaded
        return prev + Math.random() * 8 + 2;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [phase]);

  // When loading finishes, jump to 100% then start dissolve
  useEffect(() => {
    if (!isLoading && phase === "loading") {
      setProgress(100);
      const timer = setTimeout(() => {
        setPhase("dissolving");
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isLoading, phase]);

  // Pixelated dissolve animation
  const startDissolve = useCallback(() => {
    const cellIndices = Array.from({ length: TOTAL_CELLS }, (_, i) => i);
    // Shuffle indices for random dissolve order
    for (let i = cellIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cellIndices[i], cellIndices[j]] = [cellIndices[j], cellIndices[i]];
    }

    const batchSize = Math.ceil(TOTAL_CELLS / 20); // 20 waves
    let batchIndex = 0;
    const newDissolved = new Set();

    const animateNextBatch = () => {
      const start = batchIndex * batchSize;
      const end = Math.min(start + batchSize, TOTAL_CELLS);

      for (let i = start; i < end; i++) {
        newDissolved.add(cellIndices[i]);
      }
      setDissolvedCells(new Set(newDissolved));
      batchIndex++;

      if (batchIndex * batchSize < TOTAL_CELLS) {
        animFrameRef.current = setTimeout(
          animateNextBatch,
          TRANSITION_DURATION / 20
        );
      } else {
        // All cells dissolved
        setTimeout(() => {
          setPhase("done");
          onTransitionEnd?.();
        }, 200);
      }
    };

    animateNextBatch();
  }, [onTransitionEnd]);

  useEffect(() => {
    if (phase === "dissolving") {
      startDissolve();
    }
    return () => {
      if (animFrameRef.current) clearTimeout(animFrameRef.current);
    };
  }, [phase, startDissolve]);

  if (phase === "done") return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999]"
      style={{ pointerEvents: phase === "dissolving" ? "none" : "auto" }}
    >
      {/* Pixel grid overlay for dissolve effect */}
      {phase === "dissolving" && (
        <div
          className="absolute inset-0 z-[10001]"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
          }}
        >
          {Array.from({ length: TOTAL_CELLS }, (_, i) => {
            const isDissolved = dissolvedCells.has(i);
            return (
              <div
                key={i}
                style={{
                  backgroundColor: "#0a0a0a",
                  opacity: isDissolved ? 0 : 1,
                  transform: isDissolved
                    ? `scale(${Math.random() * 0.5}) rotate(${Math.random() * 90}deg)`
                    : "scale(1) rotate(0deg)",
                  transition: `opacity 0.3s ease-out, transform 0.4s ease-out`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Loader content (visible during loading phase) */}
      {phase === "loading" && (
        <div className="absolute inset-0 z-[10002] bg-[#0a0a0a] flex flex-col items-center justify-center">
          {/* Logo with pulse */}
          <div className="relative mb-10">
            <div
              className="absolute inset-0 rounded-full blur-2xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(229,0,0,0.3) 0%, transparent 70%)",
                animation: "loaderPulse 2s ease-in-out infinite",
              }}
            />
            <div className="relative flex items-center gap-3">
              <img
                src="/static/images/logo.svg"
                alt="StreamVibe Logo"
                className="w-[60px] sm:w-[80px]"
                style={{ animation: "loaderFloat 3s ease-in-out infinite" }}
              />
              <img
                src="/static/images/StreamVibe.svg"
                alt="StreamVibe"
                className="w-[90px] sm:w-[120px]"
                style={{
                  animation: "loaderFadeIn 1s ease-out forwards",
                  opacity: 0,
                }}
              />
            </div>
          </div>

          {/* Pixelated progress bar */}
          <div className="w-[240px] sm:w-[320px] relative">
            {/* Track */}
            <div
              className="h-[6px] rounded-full overflow-hidden"
              style={{ backgroundColor: "#1a1a1a" }}
            >
              {/* Pixelated fill - segmented blocks */}
              <div className="h-full flex gap-[2px]">
                {Array.from({ length: 30 }, (_, i) => {
                  const cellProgress = ((i + 1) / 30) * 100;
                  const isActive = progress >= cellProgress;
                  return (
                    <div
                      key={i}
                      className="flex-1 rounded-[1px] transition-all duration-150"
                      style={{
                        backgroundColor: isActive ? "#E50000" : "transparent",
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "scaleY(1)" : "scaleY(0.3)",
                        boxShadow: isActive
                          ? "0 0 8px rgba(229,0,0,0.5)"
                          : "none",
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Loading text */}
            <p
              className="text-center mt-4 text-[13px] tracking-[0.2em] uppercase"
              style={{
                color: "#666",
                fontFamily: "'Manrope', monospace",
                letterSpacing: "0.25em",
              }}
            >
              Loading
              <span style={{ animation: "loaderDots 1.4s infinite steps(4)" }}>
                ...
              </span>
            </p>
          </div>

          {/* Floating pixel particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={i}
                className="absolute rounded-sm"
                style={{
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  backgroundColor: `rgba(229, 0, 0, ${Math.random() * 0.4 + 0.1})`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `loaderParticle ${3 + Math.random() * 4}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Inline keyframes */}
      <style>{`
        @keyframes loaderPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.3); opacity: 1; }
        }
        @keyframes loaderFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes loaderFadeIn {
          0% { opacity: 0; transform: translateX(-10px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes loaderDots {
          0% { content: ''; opacity: 0.3; }
          25% { opacity: 0.5; }
          50% { opacity: 0.7; }
          75% { opacity: 1; }
        }
        @keyframes loaderParticle {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
          10% { opacity: 1; }
          50% {
            transform: translate(${Math.random() > 0.5 ? '' : '-'}30px, -60px) scale(0.5);
            opacity: 0.6;
          }
          90% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default PageLoader;
