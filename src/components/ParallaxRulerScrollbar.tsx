import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface ParallaxRulerScrollbarProps {
  targetRef: React.RefObject<HTMLElement | null>;
  className?: string;
}

export default function ParallaxRulerScrollbar({
  targetRef,
  className = '',
}: ParallaxRulerScrollbarProps) {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === 'dark';

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [scrollState, setScrollState] = useState({
    scrollTop: 0,
    scrollHeight: 1,
    clientHeight: 1,
  });

  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hoverY, setHoverY] = useState<number | null>(null);

  const dragStartYRef = useRef(0);
  const dragStartScrollTopRef = useRef(0);

  // Selector dimensions
  const selectorHeight = 40;

  // Read scroll metrics from target container
  const updateScrollMetrics = useCallback(() => {
    const el = targetRef.current;
    if (!el) return;
    setScrollState({
      scrollTop: el.scrollTop,
      scrollHeight: el.scrollHeight,
      clientHeight: el.clientHeight,
    });
  }, [targetRef]);

  // Attach scroll & resize listeners to target
  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    updateScrollMetrics();

    const handleScroll = () => {
      // Direct high-frequency update
      setScrollState((prev) => {
        if (
          prev.scrollTop === el.scrollTop &&
          prev.scrollHeight === el.scrollHeight &&
          prev.clientHeight === el.clientHeight
        ) {
          return prev;
        }
        return {
          scrollTop: el.scrollTop,
          scrollHeight: el.scrollHeight,
          clientHeight: el.clientHeight,
        };
      });
    };

    el.addEventListener('scroll', handleScroll, { passive: true });

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateScrollMetrics();
      });
      resizeObserver.observe(el);
    }

    window.addEventListener('resize', updateScrollMetrics);

    return () => {
      el.removeEventListener('scroll', handleScroll);
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('resize', updateScrollMetrics);
    };
  }, [targetRef, updateScrollMetrics]);

  // Derived scroll calculations
  const maxScroll = Math.max(1, scrollState.scrollHeight - scrollState.clientHeight);
  const scrollFraction = Math.min(1, Math.max(0, scrollState.scrollTop / maxScroll));
  const canScroll = scrollState.scrollHeight > scrollState.clientHeight + 4;

  // Track height
  const [trackHeight, setTrackHeight] = useState(600);
  useEffect(() => {
    const updateTrackHeight = () => {
      if (containerRef.current) {
        setTrackHeight(containerRef.current.clientHeight);
      }
    };
    updateTrackHeight();
    window.addEventListener('resize', updateTrackHeight);
    return () => window.removeEventListener('resize', updateTrackHeight);
  }, []);

  const availableTrack = Math.max(10, trackHeight - selectorHeight);
  const selectorY = scrollFraction * availableTrack;

  // Parallax drawing on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    // Color definitions based on theme & activity
    const lineBaseColor = isDark ? 'rgba(255, 255, 255,' : 'rgba(15, 23, 42,';
    const accentColor = isDark ? '#a855f7' : '#6366f1';
    const accentSecondary = isDark ? '#38bdf8' : '#0284c7';

    // 1. Vertical datum guide line on the outer edge (right side)
    const datumX = width - 1;
    ctx.beginPath();
    ctx.strokeStyle = `${lineBaseColor} 0.12)`;
    ctx.lineWidth = 1;
    ctx.moveTo(datumX, 0);
    ctx.lineTo(datumX, height);
    ctx.stroke();

    // 2. PARALLAX TICK MARKS (Tacchette del righello in parallasse)
    // Ticks are spaced evenly by tickStep (e.g. 7.5px)
    // As the user scrolls, the ticks drift vertically with parallax velocity:
    const tickStep = 8;
    const parallaxRatio = 0.32; // Parallax drift factor relative to scrollTop
    const parallaxShift = (scrollState.scrollTop * parallaxRatio);

    // Calculate the range of ticks visible in the current viewport height
    const startTickIndex = Math.floor((parallaxShift - 40) / tickStep);
    const endTickIndex = Math.ceil((parallaxShift + height + 40) / tickStep);

    const selectorCenterY = selectorY + selectorHeight / 2;
    const focalRadius = 45; // Optical magnification radius around the position selector

    ctx.font = '500 8.5px "JetBrains Mono", monospace';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    for (let i = startTickIndex; i <= endTickIndex; i++) {
      const tickVirtualY = i * tickStep;
      const screenY = tickVirtualY - parallaxShift;

      if (screenY < -10 || screenY > height + 10) continue;

      // Distance from selector center for vernier / magnifying lens effect
      const distFromSelector = Math.abs(screenY - selectorCenterY);
      const isFocal = distFromSelector < focalRadius;
      const focalGlow = isFocal ? Math.pow(1 - distFromSelector / focalRadius, 1.8) : 0;

      const isDeca = Math.abs(i) % 10 === 0;
      const isPenta = Math.abs(i) % 5 === 0 && !isDeca;

      let tickLength: number;
      let alpha: number;
      let strokeColor: string;
      let lineWidth: number;

      if (isDeca) {
        tickLength = 19 + focalGlow * 7;
        alpha = 0.55 + focalGlow * 0.45;
        lineWidth = 1.25;
        strokeColor = isFocal
          ? accentColor
          : `${lineBaseColor} ${alpha})`;
      } else if (isPenta) {
        tickLength = 12 + focalGlow * 5;
        alpha = 0.35 + focalGlow * 0.45;
        lineWidth = 1;
        strokeColor = isFocal
          ? accentSecondary
          : `${lineBaseColor} ${alpha})`;
      } else {
        tickLength = 6.5 + focalGlow * 4;
        alpha = 0.18 + focalGlow * 0.45;
        lineWidth = 0.75;
        strokeColor = isFocal
          ? `${accentSecondary}`
          : `${lineBaseColor} ${alpha})`;
      }

      const startX = datumX;
      const endX = datumX - tickLength;

      ctx.beginPath();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = lineWidth;
      ctx.moveTo(startX, Math.round(screenY) + 0.5);
      ctx.lineTo(endX, Math.round(screenY) + 0.5);
      ctx.stroke();

      // Render metric numbers on major ticks (Deca)
      if (isDeca && (width >= 34 || isFocal || isHovered)) {
        // Coordinate label: index formatted as 2-digit number (e.g. 00, 10, 20...)
        const displayNum = String(Math.abs(i % 100)).padStart(2, '0');
        ctx.fillStyle = isFocal
          ? (isDark ? '#e9d5ff' : '#4338ca')
          : `${lineBaseColor} ${0.4 + focalGlow * 0.5})`;
        ctx.fillText(displayNum, endX - 4, Math.round(screenY) + 0.5);
      }
    }

    // 3. Focal Reticle / Vernier Hairline at exact selector center
    ctx.beginPath();
    ctx.strokeStyle = isDark ? 'rgba(168, 85, 247, 0.85)' : 'rgba(99, 102, 241, 0.9)';
    ctx.lineWidth = 1.5;
    ctx.moveTo(datumX, selectorCenterY);
    ctx.lineTo(datumX - 26, selectorCenterY);
    ctx.stroke();

    // Subtle hairline endpoint dot
    ctx.beginPath();
    ctx.fillStyle = isDark ? '#38bdf8' : '#0284c7';
    ctx.arc(datumX - 26, selectorCenterY, 1.75, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }, [
    scrollState.scrollTop,
    selectorY,
    selectorHeight,
    trackHeight,
    isDark,
    isHovered,
    isDragging,
  ]);

  // Pointer interaction for dragging the position selector
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    const container = containerRef.current;
    if (!container || !targetRef.current || !canScroll) return;

    const rect = container.getBoundingClientRect();
    const clientY = e.clientY - rect.top;

    container.setPointerCapture(e.pointerId);
    setIsDragging(true);

    // If clicked on track outside the current selector, jump center to click
    const isClickOnSelector = clientY >= selectorY && clientY <= selectorY + selectorHeight;

    if (!isClickOnSelector) {
      const targetRatio = Math.max(0, Math.min(1, (clientY - selectorHeight / 2) / availableTrack));
      targetRef.current.scrollTop = targetRatio * maxScroll;
      dragStartYRef.current = clientY;
      dragStartScrollTopRef.current = targetRatio * maxScroll;
    } else {
      dragStartYRef.current = clientY;
      dragStartScrollTopRef.current = targetRef.current.scrollTop;
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const currentY = e.clientY - rect.top;
    setHoverY(currentY);

    if (!isDragging || !targetRef.current || !canScroll) return;

    const deltaY = currentY - dragStartYRef.current;
    const deltaRatio = deltaY / availableTrack;
    const newScrollTop = Math.max(0, Math.min(maxScroll, dragStartScrollTopRef.current + deltaRatio * maxScroll));
    targetRef.current.scrollTop = newScrollTop;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging && containerRef.current) {
      try {
        containerRef.current.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore if pointer capture already ended
      }
      setIsDragging(false);
    }
  };

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const el = targetRef.current;
    if (!el || !canScroll) return;

    const scrollDelta = 60;
    const pageDelta = el.clientHeight * 0.85;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        el.scrollBy({ top: scrollDelta, behavior: 'smooth' });
        break;
      case 'ArrowUp':
        e.preventDefault();
        el.scrollBy({ top: -scrollDelta, behavior: 'smooth' });
        break;
      case 'PageDown':
        e.preventDefault();
        el.scrollBy({ top: pageDelta, behavior: 'smooth' });
        break;
      case 'PageUp':
        e.preventDefault();
        el.scrollBy({ top: -pageDelta, behavior: 'smooth' });
        break;
      case 'Home':
        e.preventDefault();
        el.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'End':
        e.preventDefault();
        el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
        break;
    }
  };

  const scrollPercentage = Math.round(scrollFraction * 100);

  return (
    <aside
      ref={containerRef}
      role="scrollbar"
      aria-orientation="vertical"
      aria-valuenow={scrollPercentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={language === 'it' ? 'Righello graduato di scorrimento' : 'Graduated scroll ruler'}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoverY(null);
      }}
      className={`absolute right-0 top-16 md:top-0 bottom-0 w-9 sm:w-11 z-30 select-none touch-none outline-none focus-visible:ring-1 focus-visible:ring-purple-500/50 cursor-ns-resize transition-opacity duration-300 ${
        isHovered || isDragging ? 'opacity-100' : 'opacity-70 hover:opacity-100'
      } ${className}`}
      title={
        language === 'it'
          ? `Posizione pagina: ${scrollPercentage}% (Trascina o clicca per scorrere)`
          : `Page position: ${scrollPercentage}% (Drag or click to scroll)`
      }
    >
      {/* Background glass rail */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-colors duration-200 ${
          isDark
            ? isHovered || isDragging
              ? 'bg-zinc-950/40 backdrop-blur-xs'
              : 'bg-zinc-950/15'
            : isHovered || isDragging
              ? 'bg-white/40 backdrop-blur-xs'
              : 'bg-white/10'
        }`}
      />

      {/* The Parallax Ruler Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* ========================================================
          THE POSITION SELECTOR (Selettore della posizione)
          Precision Vernier Caliper Jaw with percentage readout
      ======================================================== */}
      <div
        className="absolute right-0 w-full pointer-events-none will-change-transform"
        style={{
          transform: `translate3d(0, ${selectorY}px, 0)`,
          height: `${selectorHeight}px`,
        }}
      >
        {/* Vernier Caliper Head */}
        <div 
          className={`absolute right-0.5 top-0 bottom-0 w-8 sm:w-10 rounded-l-lg border flex flex-col items-center justify-between py-1 px-0.5 shadow-md transition-all duration-150 ${
            isDark
              ? isDragging
                ? 'bg-zinc-900 border-purple-500/80 shadow-purple-500/20'
                : isHovered
                  ? 'bg-zinc-900/90 border-white/30 shadow-black/40'
                  : 'bg-zinc-950/80 border-white/15 shadow-black/30'
              : isDragging
                ? 'bg-white border-indigo-600 shadow-indigo-500/20'
                : isHovered
                  ? 'bg-white/95 border-slate-400 shadow-slate-300'
                  : 'bg-white/80 border-slate-300 shadow-slate-200'
          }`}
        >
          {/* Top Micro Vernier Notch */}
          <div className="flex items-center gap-0.5 opacity-60">
            <span className="w-1 h-0.5 rounded-full bg-current" />
            <span className="w-2 h-0.5 rounded-full bg-current" />
          </div>

          {/* Central Precision Percentage Readout */}
          <div className="flex flex-col items-center leading-none">
            <span 
              className={`font-mono-tech text-[9px] sm:text-[9.5px] font-bold tracking-tighter ${
                isDark 
                  ? isDragging ? 'text-purple-300' : 'text-zinc-200' 
                  : isDragging ? 'text-indigo-600' : 'text-slate-700'
              }`}
            >
              {scrollPercentage}%
            </span>
          </div>

          {/* Bottom Grip Notches (Tactile grab indicator) */}
          <div className="flex items-center gap-0.5 opacity-60">
            <span className="w-2 h-0.5 rounded-full bg-current" />
            <span className="w-1 h-0.5 rounded-full bg-current" />
          </div>

          {/* Outer glowing index needle mark */}
          <div 
            className={`absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-3.5 rounded-l-sm transition-colors ${
              isDark 
                ? 'bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]' 
                : 'bg-indigo-600 shadow-[0_0_6px_rgba(99,102,241,0.6)]'
            }`} 
          />
        </div>

        {/* Hover / Drag Floating Precision Tag */}
        {(isDragging || isHovered) && (
          <div
            className={`absolute right-10 sm:right-12 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md text-[10px] font-mono-tech font-semibold whitespace-nowrap shadow-xl border pointer-events-none transition-all duration-150 animate-in fade-in slide-in-from-right-1 ${
              isDark
                ? 'bg-zinc-900/95 text-purple-200 border-purple-500/40 shadow-black/80'
                : 'bg-white/95 text-indigo-700 border-indigo-200 shadow-slate-400/50'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              <span>
                {language === 'it' ? 'POS' : 'LOC'} {String(scrollPercentage).padStart(3, '0')}%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Target inspection preview hairline on hover when not dragging */}
      {isHovered && !isDragging && hoverY !== null && Math.abs(hoverY - (selectorY + selectorHeight / 2)) > 24 && (
        <div
          className="absolute right-0 w-5 pointer-events-none border-t border-dashed transition-all"
          style={{
            top: `${hoverY}px`,
            borderColor: isDark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(15, 23, 42, 0.35)',
          }}
        />
      )}
    </aside>
  );
}
