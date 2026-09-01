import React from 'react';
import { Play, Pause, RotateCcw, SlidersHorizontal } from 'lucide-react';
import type { PomodoroMode, TimerStatus } from '../types';

interface TomatoTimerProps {
  mode: PomodoroMode;
  timeLeft: number;
  totalDuration: number;
  status: TimerStatus;
  currentRound: number;
  totalRounds: number;
  onStart: () => void;
  onStop: () => void;
  onCancel: () => void;
  onOpenSettings: () => void;
  isExploding: boolean;
  isDark: boolean;
}

export function TomatoTimer({
  mode,
  timeLeft,
  totalDuration,
  status,
  currentRound,
  totalRounds,
  onStart,
  onStop,
  onCancel,
  onOpenSettings,
  isExploding,
  isDark,
}: TomatoTimerProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Progress fraction (1 -> 0)
  const progressFraction = totalDuration > 0 ? Math.max(0, Math.min(1, timeLeft / totalDuration)) : 1;

  const isRunning = status === 'running';
  // Golden yellow for break mode, vibrant tomato red for work mode
  const tomatoFill = mode === 'work'
    ? isDark ? '#E2553D' : '#FF6347'
    : isDark ? '#D97706' : '#F59E0B'; // Golden Yellow (สีเหลืองทอง)

  // Countdown line path length for SVG path
  const pathTotalLength = 1000;
  const strokeDashoffset = pathTotalLength * (1 - progressFraction);

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Main Timer Display Area with Tomato Outline Countdown */}
      <div
        id="main-display"
        className={`relative flex items-center justify-center transition-all duration-500 w-[290px] h-[275px] xs:w-[320px] xs:h-[305px] sm:w-[380px] sm:h-[360px] md:w-[410px] md:h-[390px] max-w-[88vw] max-h-[65vh] ${
          isExploding ? 'animate-pop' : ''
        }`}
      >
        {/* Tomato Graphic Container */}
        <div
          id="tomato-container"
          className={`relative w-full h-full flex flex-col items-center justify-center select-none tomato-drop-shadow ${
            isRunning ? 'animate-float-subtle' : ''
          }`}
        >
          {/* Tomato SVG Graphic with Outline Tracing Countdown */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg
              className="tomato-svg w-full h-full overflow-visible"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Round Tomato Base Body Fill */}
              <path
                fill={tomatoFill}
                d="M 60 18 C 88 18 108 38 108 64 C 108 90 88 108 60 108 C 32 108 12 90 12 64 C 12 38 32 18 60 18 Z"
                className="transition-colors duration-500"
              />

              {/* Subtle top organic highlights for editorial depth */}
              <path
                d="M 34 38 C 45 26 75 26 86 38 C 75 31 45 31 34 38 Z"
                fill="#ffffff"
                opacity={mode === 'work' ? 0.24 : 0.3}
              />

              {/* Tomato Contour Background Track (Subtle guide along round tomato edge) */}
              <path
                d="M 60 18 C 88 18 108 38 108 64 C 108 90 88 108 60 108 C 32 108 12 90 12 64 C 12 38 32 18 60 18 Z"
                fill="none"
                stroke={isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.1)'}
                strokeWidth="3.2"
              />

              {/* Cyan / Accent Countdown Line Tracing the Exact Round Tomato Shape Clockwise */}
              <path
                id="tomato-countdown-stroke"
                className="progress-ring__circle"
                d="M 60 18 C 88 18 108 38 108 64 C 108 90 88 108 60 108 C 32 108 12 90 12 64 C 12 38 32 18 60 18 Z"
                fill="none"
                stroke={isDark ? '#4FC3F7' : '#00BFFF'}
                strokeWidth="3.6"
                strokeLinecap="round"
                pathLength={pathTotalLength}
                strokeDasharray={pathTotalLength}
                strokeDashoffset={strokeDashoffset}
                style={{
                  filter: isDark
                    ? 'drop-shadow(0 0 4px rgba(79, 195, 247, 0.85))'
                    : 'drop-shadow(0 0 3px rgba(0, 191, 255, 0.75))',
                }}
              />

              {/* Tomato Leaves / Crown atop the tomato */}
              <g className="transition-transform duration-300 origin-center">
                {/* Stem */}
                <path
                  d="M60 4 C58 10 59 16 60 18 C61 16 62 10 60 4 Z"
                  fill="#2E7D32"
                />
                {/* Crown Leaves */}
                <path
                  d="M60 18 L70 9 L63 18 L76 15 L66 21 L73 28 L62 23 L60 30 L58 23 L47 28 L54 21 L44 15 L57 18 L50 9 Z"
                  fill="#4CAF50"
                />
                <path
                  d="M60 18 L65 12 L62 18 L70 16 L64 20 L68 25 L61 22 L60 27 L59 22 L52 25 L56 20 L50 16 L58 18 L55 12 Z"
                  fill="#388E3C"
                />
              </g>
            </svg>
          </div>

          {/* Interactive Foreground Inside Tomato */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-3 sm:px-4 w-full h-full pt-5 sm:pt-7">
            {/* Clickable Countdown Display */}
            <button
              id="pomodoro-timer-display"
              onClick={onOpenSettings}
              type="button"
              title="กดตรงนี้เพื่อตั้งค่าเวลาและรอบ"
              aria-label="ตั้งค่าเวลาและรอบ"
              className="group relative flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-2xl transition-transform hover:scale-105 active:scale-95 cursor-pointer focus:outline-none"
            >
              {/* Big Editorial Timer Digits */}
              <div
                id="timer-text"
                className="timer-text text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tight select-none"
                style={{
                  textShadow: '0 3px 12px rgba(0,0,0,0.28)',
                  letterSpacing: '-0.02em',
                }}
              >
                {formattedTime}
              </div>

              {/* Round & Mode Indicator */}
              <div
                id="round-indicator"
                className="text-xs sm:text-sm md:text-sm font-bold uppercase tracking-wider text-white/90 group-hover:text-white transition-colors mt-[-2px] sm:mt-0 flex items-center gap-1.5"
              >
                <span>
                  {mode === 'work'
                    ? `ROUND ${Math.min(currentRound, totalRounds)}/${totalRounds}`
                    : '☕ BREAK TIME'}
                </span>
                <SlidersHorizontal className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-75 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>

            {/* Cancel & Start/Stop Controls inside tomato */}
            <div id="controls" className="mt-3.5 sm:mt-5 flex items-center justify-center gap-2.5 sm:gap-3.5">
              {/* Cancel Button */}
              <button
                id="cancel-button"
                onClick={onCancel}
                type="button"
                className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm text-white/90 hover:text-white bg-black/20 hover:bg-black/35 backdrop-blur-xs border border-white/40 hover:border-white/70 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5 shadow-xs"
                title="ยกเลิกการจับเวลาทั้งหมด"
              >
                <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Cancel</span>
              </button>

              {/* Start / Stop Button */}
              <button
                id="start-stop-button"
                onClick={isRunning ? onStop : onStart}
                type="button"
                className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-md flex items-center gap-1.5 ${
                  isRunning
                    ? 'bg-amber-300 hover:bg-amber-200 text-zinc-900 shadow-amber-950/20'
                    : 'bg-white hover:bg-zinc-100 text-zinc-900 shadow-black/15'
                }`}
                title={isRunning ? 'หยุดชั่วคราว' : 'เริ่มนับเวลาถอยหลัง'}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                    <span>Stop</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ml-0.5" />
                    <span>Start</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

