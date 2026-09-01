import React from 'react';
import { X, BookOpen, Clock, Coffee, Play, SlidersHorizontal, Sparkles, CheckCircle2 } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export function GuideModal({ isOpen, onClose, isDark }: GuideModalProps) {
  if (!isOpen) return null;

  return (
    <div
      id="guide-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="guide-modal"
        className="w-full max-w-lg rounded-3xl p-6 sm:p-7 shadow-2xl transition-all border border-zinc-200/80 dark:border-zinc-800 max-h-[90vh] overflow-y-auto"
        style={{
          backgroundColor: 'var(--modal-bg)',
          color: 'var(--text)',
          boxShadow: '0 20px 40px var(--shadow)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200/60 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-500">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">วิธีใช้ตัวจับเวลา Pomodoro</h2>
              <p className="text-xs opacity-60">
                คู่มือและเคล็ดลับการใช้งานแบบง่ายๆ
              </p>
            </div>
          </div>
          <button
            id="close-guide-btn"
            type="button"
            onClick={onClose}
            aria-label="ปิดหน้าต่างคู่มือ"
            className="p-2 rounded-full opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Bullet Points */}
        <div className="mt-5 space-y-3.5 text-sm">
          {/* Bullet 1 */}
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-black/3 dark:bg-white/4 border border-zinc-200/50 dark:border-zinc-800/60">
            <div className="mt-0.5 p-1.5 rounded-xl bg-[#FF6347]/10 dark:bg-[#E2553D]/20 text-[#FF6347] dark:text-[#E2553D] shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold">
                1. หลักการของเทคนิค Pomodoro
              </h3>
              <p className="text-xs sm:text-sm opacity-80 mt-1 leading-relaxed">
                แบ่งเวลาโฟกัสทำงานอย่างตั้งใจ (ค่าเริ่มต้น 25 นาที) สลับกับเวลาพักผ่อนสั้นๆ (ค่าเริ่มต้น 5 นาที) เพื่อรักษาพลังงานและสมาธิให้มีประสิทธิภาพสูงสุด
              </p>
            </div>
          </div>

          {/* Bullet 2 */}
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-black/3 dark:bg-white/4 border border-zinc-200/50 dark:border-zinc-800/60">
            <div className="mt-0.5 p-1.5 rounded-xl bg-[#00BFFF]/10 dark:bg-[#4FC3F7]/20 text-[#00BFFF] dark:text-[#4FC3F7] shrink-0">
              <Play className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold">
                2. การเริ่มและควบคุมเวลา
              </h3>
              <p className="text-xs sm:text-sm opacity-80 mt-1 leading-relaxed">
                • กดปุ่ม <span className="font-bold text-[#FF6347] dark:text-[#E2553D]">"Start"</span> เพื่อเริ่มนับเวลาถอยหลัง (ปุ่มจะเปลี่ยนเป็น <span className="font-bold text-amber-500">"Stop"</span> และเส้นสีฟ้ารอบมะเขือเทศจะค่อยๆ ลดลงตามเวลา)<br />
                • กดปุ่ม <span className="font-bold text-amber-500">"Stop"</span> เพื่อหยุดชั่วคราว และกด <span className="font-bold">"Start"</span> เพื่อจับเวลาต่อ<br />
                • กดปุ่ม <span className="font-bold opacity-75">"Cancel"</span> เพื่อยกเลิกและรีเซ็ตการจับเวลา
              </p>
            </div>
          </div>

          {/* Bullet 3 */}
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-black/3 dark:bg-white/4 border border-zinc-200/50 dark:border-zinc-800/60">
            <div className="mt-0.5 p-1.5 rounded-xl bg-purple-500/10 text-purple-500 shrink-0">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold">
                3. การปรับเปลี่ยนเวลาและรอบ
              </h3>
              <p className="text-xs sm:text-sm opacity-80 mt-1 leading-relaxed">
                • แตะหรือคลิกที่ <span className="font-bold text-[#FF6347] dark:text-[#E2553D]">"ตัวเลขนาฬิกาบนมะเขือเทศ"</span> โดยตรง เพื่อเปิดหน้าต่างตั้งค่า<br />
                • สามารถปรับเวลาทำงาน, เวลาพัก และจำนวนรอบทั้งหมดได้ตามความต้องการ
              </p>
            </div>
          </div>

          {/* Bullet 4 */}
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-black/3 dark:bg-white/4 border border-zinc-200/50 dark:border-zinc-800/60">
            <div className="mt-0.5 p-1.5 rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold">
                4. เมื่อครบจำนวนรอบที่กำหนด
              </h3>
              <p className="text-xs sm:text-sm opacity-80 mt-1 leading-relaxed">
                มะเขือเทศจะแสดงอนิเมชันความสำเร็จพร้อมข้อความยินดีในความสำเร็จของคุณ!
              </p>
            </div>
          </div>
        </div>

        {/* Footer Button */}
        <div className="mt-6 pt-3 flex justify-end">
          <button
            id="close-guide-confirm-btn"
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full font-bold text-sm bg-[#FF6347] dark:bg-[#E2553D] hover:scale-105 text-white transition-all cursor-pointer shadow-md"
          >
            เข้าใจแล้ว เริ่มใช้งานเลย!
          </button>
        </div>
      </div>
    </div>
  );
}
