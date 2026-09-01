/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import type { PomodoroMode, PomodoroSettings, TimerStatus } from './types';
import { TomatoTimer } from './components/TomatoTimer';
import { SettingsModal } from './components/SettingsModal';
import { GuideModal } from './components/GuideModal';
import { CelebrationModal } from './components/CelebrationModal';
import { CancelConfirmModal } from './components/CancelConfirmModal';
import { ExplosionEffect } from './components/ExplosionEffect';
import { NotebookButton } from './components/NotebookButton';
import { Header } from './components/Header';
import { playClickSound, playChimeSound, playExplosionSound } from './utils/audio';

const DEFAULT_SETTINGS: PomodoroSettings = {
  workMinutes: 25,
  workSeconds: 0,
  breakMinutes: 5,
  breakSeconds: 0,
  totalRounds: 4,
};

export default function App() {
  const [settings, setSettings] = useState<PomodoroSettings>(DEFAULT_SETTINGS);
  const [mode, setMode] = useState<PomodoroMode>('work');
  const [timeLeft, setTimeLeft] = useState<number>(DEFAULT_SETTINGS.workMinutes * 60 + DEFAULT_SETTINGS.workSeconds);
  const [status, setStatus] = useState<TimerStatus>('idle');
  const [currentRound, setCurrentRound] = useState<number>(1);

  // Modals & Effects State
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState<boolean>(false);
  const [isExploding, setIsExploding] = useState<boolean>(false);

  // Theme & Audio State
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Sync dark mode class on <html>
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Current session's total target duration in seconds
  const currentTotalDuration =
    mode === 'work'
      ? settings.workMinutes * 60 + (settings.workSeconds || 0)
      : settings.breakMinutes * 60 + (settings.breakSeconds || 0);

  // Sound effects helper
  const handleToggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // Timer Tick Mechanism
  useEffect(() => {
    let timerId: ReturnType<typeof setInterval> | null = null;

    if (status === 'running') {
      timerId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 1) {
            return prev - 1;
          }

          // When time runs out
          if (mode === 'work') {
            if (currentRound >= settings.totalRounds) {
              // ALL ROUNDS COMPLETED! Tomato explodes!
              setStatus('completed');
              setIsExploding(true);
              playExplosionSound(isMuted);
              setTimeout(() => {
                setShowCelebration(true);
              }, 600);
              return 0;
            } else {
              // Switch from Work to Break
              setMode('break');
              playChimeSound(isMuted);
              return settings.breakMinutes * 60 + (settings.breakSeconds || 0);
            }
          } else {
            // Switch from Break to next Work round
            setCurrentRound((r) => r + 1);
            setMode('work');
            playChimeSound(isMuted);
            return settings.workMinutes * 60 + (settings.workSeconds || 0);
          }
        });
      }, 1000);
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [status, mode, currentRound, settings, isMuted]);

  // Handlers
  const handleStart = useCallback(() => {
    playClickSound(isMuted);
    setStatus('running');
  }, [isMuted]);

  const handleStop = useCallback(() => {
    playClickSound(isMuted);
    setStatus('paused');
  }, [isMuted]);

  const handleCancelClick = useCallback(() => {
    playClickSound(isMuted);
    setShowCancelConfirm(true);
  }, [isMuted]);

  const handleConfirmCancel = useCallback(() => {
    playClickSound(isMuted);
    setStatus('idle');
    setMode('work');
    setCurrentRound(1);
    setTimeLeft(settings.workMinutes * 60 + (settings.workSeconds || 0));
    setIsExploding(false);
    setShowCelebration(false);
  }, [isMuted, settings.workMinutes, settings.workSeconds]);

  const handleSaveSettings = (newSettings: PomodoroSettings) => {
    setSettings(newSettings);
    // Immediately update timer display to new configured duration
    if (mode === 'work') {
      setTimeLeft(newSettings.workMinutes * 60 + (newSettings.workSeconds || 0));
    } else {
      setTimeLeft(newSettings.breakMinutes * 60 + (newSettings.breakSeconds || 0));
    }
  };

  const handleResetAfterCelebration = () => {
    playClickSound(isMuted);
    setIsExploding(false);
    setShowCelebration(false);
    setStatus('idle');
    setMode('work');
    setCurrentRound(1);
    setTimeLeft(settings.workMinutes * 60 + (settings.workSeconds || 0));
  };

  // Keyboard Shortcuts (Space to start/stop, Esc to close modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        if (showSettings || showGuide || showCelebration || showCancelConfirm) return;
        if (status === 'running') {
          handleStop();
        } else if (status === 'idle' || status === 'paused') {
          handleStart();
        }
      } else if (e.key === 'Escape') {
        setShowSettings(false);
        setShowGuide(false);
        setShowCancelConfirm(false);
        if (showCelebration) {
          handleResetAfterCelebration();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, showSettings, showGuide, showCelebration, showCancelConfirm, handleStart, handleStop]);

  return (
    <div
      id="pomodoro-app-container"
      className="min-h-screen flex flex-col justify-between transition-colors duration-400 relative overflow-hidden"
      style={{
        backgroundColor: 'var(--bg)',
        color: 'var(--text)',
      }}
    >
      {/* Top Header */}
      <Header
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Center Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 w-full max-w-4xl mx-auto z-10">
        <TomatoTimer
          mode={mode}
          timeLeft={timeLeft}
          totalDuration={currentTotalDuration}
          status={status}
          currentRound={currentRound}
          totalRounds={settings.totalRounds}
          onStart={handleStart}
          onStop={handleStop}
          onCancel={handleCancelClick}
          onOpenSettings={() => {
            playClickSound(isMuted);
            setShowSettings(true);
          }}
          isExploding={isExploding}
          isDark={isDark}
        />
      </main>

      {/* Footer Area */}
      <footer className="py-5 text-center text-xs opacity-50 select-none pb-6 sm:pb-5 tracking-wide">
        Focus & Flow with Pomodoro.
      </footer>

      {/* Bottom Right Floating Notebook Guide Button */}
      <NotebookButton
        onClick={() => {
          playClickSound(isMuted);
          setShowGuide(true);
        }}
        isDark={isDark}
      />

      {/* Explosion Fireworks Particles when all rounds complete */}
      {isExploding && (
        <ExplosionEffect onComplete={() => {}} />
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onSave={handleSaveSettings}
        isDark={isDark}
      />

      {/* Guide Notebook Modal */}
      <GuideModal
        isOpen={showGuide}
        onClose={() => setShowGuide(false)}
        isDark={isDark}
      />

      {/* Cancel Confirmation Modal */}
      <CancelConfirmModal
        isOpen={showCancelConfirm}
        onClose={() => setShowCancelConfirm(false)}
        onConfirm={handleConfirmCancel}
        isDark={isDark}
      />

      {/* Congratulations Celebration Modal */}
      <CelebrationModal
        isOpen={showCelebration}
        onReset={handleResetAfterCelebration}
        settings={settings}
        isDark={isDark}
      />
    </div>
  );
}
