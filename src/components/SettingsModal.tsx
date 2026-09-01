import React, { useState, useEffect } from 'react';
import { X, Clock, Coffee, Repeat, Check, Sparkles } from 'lucide-react';
import type { PomodoroSettings } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: PomodoroSettings;
  onSave: (newSettings: PomodoroSettings) => void;
  isDark: boolean;
}

export function SettingsModal({
  isOpen,
  onClose,
  settings,
  onSave,
}: SettingsModalProps) {
  const [workMinutes, setWorkMinutes] = useState(settings.workMinutes);
  const [workSeconds, setWorkSeconds] = useState(settings.workSeconds ?? 0);
  const [breakMinutes, setBreakMinutes] = useState(settings.breakMinutes);
  const [breakSeconds, setBreakSeconds] = useState(settings.breakSeconds ?? 0);
  const [totalRounds, setTotalRounds] = useState(Math.max(2, settings.totalRounds));

  // Sync state whenever modal opens or settings update
  useEffect(() => {
    if (isOpen) {
      setWorkMinutes(settings.workMinutes);
      setWorkSeconds(settings.workSeconds ?? 0);
      setBreakMinutes(settings.breakMinutes);
      setBreakSeconds(settings.breakSeconds ?? 0);
      setTotalRounds(Math.max(2, settings.totalRounds));
    }
  }, [isOpen, settings]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedWorkMin = Math.max(0, Math.min(120, Number(workMinutes) || 0));
    const parsedWorkSec = Math.max(0, Math.min(59, Number(workSeconds) || 0));
    const parsedBreakMin = Math.max(0, Math.min(60, Number(breakMinutes) || 0));
    const parsedBreakSec = Math.max(0, Math.min(59, Number(breakSeconds) || 0));

    // Ensure total duration is at least 1 second
    const totalWorkSec = parsedWorkMin * 60 + parsedWorkSec;
    const finalWorkMin = totalWorkSec < 1 ? 0 : parsedWorkMin;
    const finalWorkSec = totalWorkSec < 1 ? 1 : parsedWorkSec;

    const totalBreakSec = parsedBreakMin * 60 + parsedBreakSec;
    const finalBreakMin = totalBreakSec < 1 ? 0 : parsedBreakMin;
    const finalBreakSec = totalBreakSec < 1 ? 1 : parsedBreakSec;

    onSave({
      workMinutes: finalWorkMin,
      workSeconds: finalWorkSec,
      breakMinutes: finalBreakMin,
      breakSeconds: finalBreakSec,
      totalRounds: Math.max(2, Math.min(20, totalRounds)),
    });
    onClose();
  };

  const workPresets = [15, 20, 25, 30, 45, 50];
  const breakPresets = [3, 5, 10, 15];
  const roundPresets = [2, 4, 6, 8];

  return (
    <div
      id="settings-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="settings-modal"
        className="w-full max-w-md rounded-3xl p-6 sm:p-7 shadow-2xl transition-all border border-zinc-200/80 dark:border-zinc-800 max-h-[90vh] overflow-y-auto"
        style={{
          backgroundColor: 'var(--modal-bg)',
          color: 'var(--text)',
          boxShadow: '0 20px 40px var(--shadow)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200/60 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-[#FF6347]/10 dark:bg-[#E2553D]/20 text-[#FF6347] dark:text-[#E2553D]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold tracking-tight">ตั้งค่าตัวจับเวลา</h2>
              <p className="text-xs opacity-60">
                ปรับเวลานาที/วินาที และจำนวนรอบ
              </p>
            </div>
          </div>
          <button
            id="close-settings-btn"
            type="button"
            onClick={onClose}
            aria-label="ปิดหน้าต่างตั้งค่า"
            className="p-2 rounded-full opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="mt-5 space-y-5">
          {/* Work Duration (Minutes + Seconds) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase font-bold tracking-wider opacity-80 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF6347] dark:bg-[#E2553D]" />
                เวลาทำงาน
              </label>
              <div className="flex items-center gap-2">
                {/* Minutes Input */}
                <div className="flex items-center gap-1">
                  <input
                    id="work-minutes-input"
                    type="number"
                    min="0"
                    max="120"
                    value={workMinutes}
                    onChange={(e) => setWorkMinutes(Math.max(0, Math.min(120, Number(e.target.value))))}
                    className="w-13 h-8 text-center font-bold text-base rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-[#FF6347] focus:outline-none"
                  />
                  <span className="text-xs opacity-60 font-medium">นาที</span>
                </div>

                <span className="opacity-40 font-bold">:</span>

                {/* Seconds Input */}
                <div className="flex items-center gap-1">
                  <input
                    id="work-seconds-input"
                    type="number"
                    min="0"
                    max="59"
                    value={workSeconds}
                    onChange={(e) => setWorkSeconds(Math.max(0, Math.min(59, Number(e.target.value))))}
                    className="w-13 h-8 text-center font-bold text-base rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-[#FF6347] focus:outline-none"
                  />
                  <span className="text-xs opacity-60 font-medium">วินาที</span>
                </div>
              </div>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {workPresets.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => {
                    setWorkMinutes(val);
                    setWorkSeconds(0);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    workMinutes === val && workSeconds === 0
                      ? 'bg-[#FF6347] dark:bg-[#E2553D] text-white shadow-xs'
                      : 'bg-black/5 dark:bg-white/5 opacity-70 hover:opacity-100'
                  }`}
                >
                  {val} นาที
                </button>
              ))}
            </div>
          </div>

          {/* Break Duration (Minutes + Seconds - Golden Yellow Theme) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase font-bold tracking-wider opacity-80 flex items-center gap-2">
                <Coffee className="w-3.5 h-3.5 text-amber-500" />
                เวลาพัก
              </label>
              <div className="flex items-center gap-2">
                {/* Minutes Input */}
                <div className="flex items-center gap-1">
                  <input
                    id="break-minutes-input"
                    type="number"
                    min="0"
                    max="60"
                    value={breakMinutes}
                    onChange={(e) => setBreakMinutes(Math.max(0, Math.min(60, Number(e.target.value))))}
                    className="w-13 h-8 text-center font-bold text-base rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                  <span className="text-xs opacity-60 font-medium">นาที</span>
                </div>

                <span className="opacity-40 font-bold">:</span>

                {/* Seconds Input */}
                <div className="flex items-center gap-1">
                  <input
                    id="break-seconds-input"
                    type="number"
                    min="0"
                    max="59"
                    value={breakSeconds}
                    onChange={(e) => setBreakSeconds(Math.max(0, Math.min(59, Number(e.target.value))))}
                    className="w-13 h-8 text-center font-bold text-base rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                  <span className="text-xs opacity-60 font-medium">วินาที</span>
                </div>
              </div>
            </div>

            {/* Break Presets */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {breakPresets.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => {
                    setBreakMinutes(val);
                    setBreakSeconds(0);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    breakMinutes === val && breakSeconds === 0
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-black/5 dark:bg-white/5 opacity-70 hover:opacity-100'
                  }`}
                >
                  {val} นาที
                </button>
              ))}
            </div>
          </div>

          {/* Total Rounds (Must be >= 2) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="total-rounds-input" className="text-xs uppercase font-bold tracking-wider opacity-80 flex items-center gap-2">
                <Repeat className="w-3.5 h-3.5 text-[#00BFFF] dark:text-[#4FC3F7]" />
                จำนวนรอบทั้งหมด <span className="text-[11px] font-medium opacity-60">(ขั้นต่ำ 2 รอบ)</span>
              </label>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setTotalRounds((prev) => Math.max(2, prev - 1))}
                  disabled={totalRounds <= 2}
                  className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 font-bold text-base transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                  title={totalRounds <= 2 ? 'จำนวนรอบต้องไม่น้อยกว่า 2 รอบ' : 'ลดจำนวนรอบ'}
                >
                  -
                </button>
                <input
                  id="total-rounds-input"
                  type="number"
                  min="2"
                  max="20"
                  value={totalRounds}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setTotalRounds(isNaN(val) ? 2 : Math.max(2, Math.min(20, val)));
                  }}
                  className="w-14 h-8 text-center font-bold text-base rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-[#00BFFF] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setTotalRounds((prev) => Math.min(20, prev + 1))}
                  className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 font-bold text-base transition-colors cursor-pointer"
                  title="เพิ่มจำนวนรอบ"
                >
                  +
                </button>
              </div>
            </div>

            {/* Round Presets (All >= 2) */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {roundPresets.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setTotalRounds(val)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    totalRounds === val
                      ? 'bg-[#00BFFF] dark:bg-[#4FC3F7] text-white shadow-xs'
                      : 'bg-black/5 dark:bg-white/5 opacity-70 hover:opacity-100'
                  }`}
                >
                  {val} รอบ
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-zinc-200/60 dark:border-zinc-800">
            <button
              id="cancel-settings-btn"
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-sm font-semibold opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer"
            >
              ยกเลิก
            </button>
            <button
              id="save-settings-btn"
              type="submit"
              className="px-6 py-2.5 rounded-full text-sm font-bold bg-[#FF6347] dark:bg-[#E2553D] hover:scale-105 text-white shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              บันทึกการตั้งค่า
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
