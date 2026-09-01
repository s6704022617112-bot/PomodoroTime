import React from 'react';
import { Sun, Moon, Volume2, VolumeX } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export function Header({
  isDark,
  onToggleTheme,
  isMuted,
  onToggleMute,
}: HeaderProps) {
  return (
    <header className="w-full max-w-4xl mx-auto flex items-center justify-between p-6 sm:p-8">
      {/* Brand / Logo */}
      <div className="flex items-center gap-2">
        <h1
          className="text-2xl sm:text-3xl font-extrabold tracking-tight"
          style={{ letterSpacing: '-0.05em' }}
        >
          Pomodoro<span className="text-[#FF6347] dark:text-[#E2553D]">.</span>
        </h1>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {/* Sound Toggle */}
        <button
          id="sound-toggle-btn"
          type="button"
          onClick={onToggleMute}
          title={isMuted ? 'เปิดเสียงแจ้งเตือน' : 'ปิดเสียงแจ้งเตือน'}
          aria-label={isMuted ? 'เปิดเสียงแจ้งเตือน' : 'ปิดเสียงแจ้งเตือน'}
          className="p-2 rounded-full flex items-center justify-center bg-transparent border-0 opacity-60 hover:opacity-100 hover:scale-115 active:scale-95 transition-all cursor-pointer"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-zinc-400" />
          ) : (
            <Volume2 className="w-5 h-5 text-[#FF6347] dark:text-[#E2553D]" />
          )}
        </button>

        {/* Theme Toggle (Dark / Light) */}
        <button
          id="theme-toggle-btn"
          type="button"
          onClick={onToggleTheme}
          title={isDark ? 'เปลี่ยนเป็นโหมดสว่าง' : 'เปลี่ยนเป็นโหมดมืด'}
          aria-label={isDark ? 'เปลี่ยนเป็นโหมดสว่าง' : 'เปลี่ยนเป็นโหมดมืด'}
          className="p-2 rounded-full flex items-center justify-center bg-transparent border-0 opacity-60 hover:opacity-100 hover:scale-115 active:scale-95 transition-all cursor-pointer"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-amber-300" />
          ) : (
            <Moon className="w-5 h-5 text-zinc-700" />
          )}
        </button>
      </div>
    </header>
  );
}

