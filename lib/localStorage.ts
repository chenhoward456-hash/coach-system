export interface TaskData {
  [key: string]: boolean;
}

export interface ScoreData {
  score1: number;
  score2: number;
  score3: number;
  score4: number;
  timestamp: string;
}

export interface DiagnosisData {
  mainIssue: string;
  activities: string[];
  timeCommitment: string;
  result: string;
  timestamp: string;
}

const STORAGE_KEYS = {
  TASKS: 'coach-system-tasks',
  SCORES: 'coach-system-scores',
  DIAGNOSIS: 'coach-system-diagnosis',
};

export const storage = {
  getTasks: (): TaskData => {
    if (typeof window === 'undefined') return {};
    const data = localStorage.getItem(STORAGE_KEYS.TASKS);
    return data ? JSON.parse(data) : {};
  },

  saveTasks: (tasks: TaskData): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  },

  getScores: (): ScoreData | null => {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(STORAGE_KEYS.SCORES);
    return data ? JSON.parse(data) : null;
  },

  saveScores: (scores: ScoreData): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.SCORES, JSON.stringify(scores));
  },

  getDiagnosis: (): DiagnosisData | null => {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(STORAGE_KEYS.DIAGNOSIS);
    return data ? JSON.parse(data) : null;
  },

  saveDiagnosis: (diagnosis: DiagnosisData): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.DIAGNOSIS, JSON.stringify(diagnosis));
  },

  clearAll: (): void => {
    if (typeof window === 'undefined') return;
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  },
};
