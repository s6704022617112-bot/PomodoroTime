export type PomodoroMode = 'work' | 'break';

export interface PomodoroSettings {
  workMinutes: number;
  workSeconds: number;
  breakMinutes: number;
  breakSeconds: number;
  totalRounds: number;
}

export type TimerStatus = 'idle' | 'running' | 'paused' | 'completed';

export interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  shape: 'circle' | 'star' | 'seed' | 'leaf';
  opacity: number;
}
