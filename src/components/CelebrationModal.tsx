import React from 'react';
import { Sparkles, Trophy, RotateCcw, PartyPopper } from 'lucide-react';
import type { PomodoroSettings } from '../types';

interface CelebrationModalProps {
  isOpen: boolean;
  onReset: () => void;
  settings: PomodoroSettings;
  isDark: boolean;
}

export function CelebrationModal({
  isOpen,
  onReset,
  settings,
  isDark,
}: CelebrationModalProps) {
  if (!isOpen) return null;

  const totalFocusSeconds = ((settings.workMinutes || 0) * 60 + (settings.workSeconds || 0)) * settings.totalRounds;
  const totalFocusMinutes = Math.round((totalFocusSeconds / 60) * 10) / 10;

  return (
    <div
      id="celebration-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300"
    >
      <div
        id="celebration-modal"
        className="relative w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl text-center border border-zinc-200/80 dark:border-zinc-800 overflow-hidden"
        style={{
          backgroundColor: 'var(--modal-bg)',
          color: 'var(--text)',
          boxShadow: '0 20px 40px var(--shadow)',
        }}
      >
        {/* Top Badge / Icon */}
        <div className="mx-auto w-18 h-18 rounded-3xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4">
          <Trophy className="w-9 h-9" />
        </div>

        {/* Celebration Title */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[#FF6347]/10 dark:bg-[#E2553D]/20 text-[#FF6347] dark:text-[#E2553D] mb-2">
          <PartyPopper className="w-3.5 h-3.5" />
          <span>ยินดีด้วย! คุณทำสำเร็จแล้ว 🍅✨</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1" style={{ letterSpacing: '-0.03em' }}>
          ยอดเยี่ยมมากๆ 🎉
        </h2>

        <p className="text-sm opacity-80 mt-2 leading-relaxed">
          คุณผ่านช่วงเวลาโฟกัสทำงานครบทั้ง <strong>{settings.totalRounds} รอบ</strong> เรียบร้อยแล้ว
        </p>

        {/* Summary Card */}
        <div className="mt-5 p-4 rounded-2xl bg-black/3 dark:bg-white/4 border border-zinc-200/50 dark:border-zinc-800/60 flex items-center justify-around text-center">
          <div>
            <div className="text-2xl font-black text-[#FF6347] dark:text-[#E2553D]">
              {settings.totalRounds}
            </div>
            <div className="text-xs opacity-60 mt-0.5 font-medium">
              รอบที่สำเร็จ
            </div>
          </div>
          <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-700 opacity-60" />
          <div>
            <div className="text-2xl font-black text-[#00BFFF] dark:text-[#4FC3F7]">
              {totalFocusMinutes}
            </div>
            <div className="text-xs opacity-60 mt-0.5 font-medium">
              นาทีที่มุ่งมั่น
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <button
            id="start-new-session-btn"
            type="button"
            onClick={onReset}
            className="w-full py-3.5 px-6 rounded-full font-bold text-sm bg-[#FF6347] dark:bg-[#E2553D] hover:scale-105 text-white shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>เริ่มรอบใหม่ (Start New Cycle)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
