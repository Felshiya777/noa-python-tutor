export interface UserProgress {
  completedLevels: string[];
  levelProgress: {
    [levelId: string]: {
      completedExercises: string[];
      quizScore: number;
      notesContent: string;
    };
  };
}

const STORAGE_KEY = 'python-tutor-progress';

export const getProgress = (): UserProgress => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return { completedLevels: [], levelProgress: {} };
    }
  }
  return { completedLevels: [], levelProgress: {} };
};

export const saveProgress = (progress: UserProgress) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

export const completeExercise = (levelId: string, exerciseId: string) => {
  const progress = getProgress();
  if (!progress.levelProgress[levelId]) {
    progress.levelProgress[levelId] = {
      completedExercises: [],
      quizScore: 0,
      notesContent: ''
    };
  }
  if (!progress.levelProgress[levelId].completedExercises.includes(exerciseId)) {
    progress.levelProgress[levelId].completedExercises.push(exerciseId);
  }
  saveProgress(progress);
};

export const saveQuizScore = (levelId: string, score: number) => {
  const progress = getProgress();
  if (!progress.levelProgress[levelId]) {
    progress.levelProgress[levelId] = {
      completedExercises: [],
      quizScore: 0,
      notesContent: ''
    };
  }
  progress.levelProgress[levelId].quizScore = score;
  saveProgress(progress);
};

export const completeLevel = (levelId: string) => {
  const progress = getProgress();
  if (!progress.completedLevels.includes(levelId)) {
    progress.completedLevels.push(levelId);
  }
  saveProgress(progress);
};

export const saveNotes = (levelId: string, content: string) => {
  const progress = getProgress();
  if (!progress.levelProgress[levelId]) {
    progress.levelProgress[levelId] = {
      completedExercises: [],
      quizScore: 0,
      notesContent: ''
    };
  }
  progress.levelProgress[levelId].notesContent = content;
  saveProgress(progress);
};

export const getNotes = (levelId: string): string => {
  const progress = getProgress();
  return progress.levelProgress[levelId]?.notesContent || '';
};
