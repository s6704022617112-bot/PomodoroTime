import React from 'react';

interface NotebookButtonProps {
  onClick: () => void;
  isDark: boolean;
}

export function NotebookButton({ onClick }: NotebookButtonProps) {
  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40">
      <button
        id="notebook-guide-button"
        type="button"
        onClick={onClick}
        title="เปิดคู่มือวิธีใช้ตัวจับเวลา Pomodoro"
        aria-label="คู่มือวิธีใช้ตัวจับเวลา Pomodoro"
        className="group relative flex items-center justify-center p-1 bg-transparent border-0 outline-none transition-all duration-300 hover:scale-115 active:scale-95 cursor-pointer"
      >
        {/* Cute Notebook SVG Illustration - Clean Graphic */}
        <svg
          viewBox="0 0 48 48"
          className="w-10 h-10 sm:w-11 sm:h-11 transition-transform group-hover:rotate-[-6deg] drop-shadow-md group-hover:drop-shadow-lg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Notebook Back Shadow */}
          <rect x="9" y="8" width="30" height="34" rx="4" fill="#d97706" opacity="0.4" />
          {/* Notebook Cover */}
          <rect x="10" y="6" width="28" height="34" rx="4" fill="#f59e0b" />
          {/* Spine Binding */}
          <path d="M10 6H16V40H10C7.79086 40 6 38.2091 6 36V10C6 7.79086 7.79086 6 10 6Z" fill="#d97706" />
          {/* Binding Spirals / Rings */}
          <circle cx="10" cy="12" r="1.5" fill="#fef3c7" />
          <circle cx="10" cy="18" r="1.5" fill="#fef3c7" />
          <circle cx="10" cy="24" r="1.5" fill="#fef3c7" />
          <circle cx="10" cy="30" r="1.5" fill="#fef3c7" />
          <circle cx="10" cy="36" r="1.5" fill="#fef3c7" />
          {/* Bookmark Ribbon */}
          <path d="M22 6V20L25 17L28 20V6H22Z" fill="#ef4444" />
          {/* Notebook Front Details / Lines */}
          <rect x="18" y="24" width="14" height="2" rx="1" fill="#fef3c7" opacity="0.85" />
          <rect x="18" y="28" width="10" height="2" rx="1" fill="#fef3c7" opacity="0.85" />
          <rect x="18" y="32" width="12" height="2" rx="1" fill="#fef3c7" opacity="0.85" />
        </svg>

        {/* Floating Tooltip */}
        <span
          className="pointer-events-none absolute right-full mr-2.5 whitespace-nowrap rounded-xl bg-zinc-900 dark:bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-white dark:text-zinc-900 shadow-md opacity-0 transition-all duration-200 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 hidden sm:block"
        >
          📖 วิธีใช้ Pomodoro
        </span>
      </button>
    </div>
  );
}
