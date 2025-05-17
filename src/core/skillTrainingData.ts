import { SkillTrainingData, TrainingLevel } from '../types';

/**
 * Constant containing skill training data
 */

export const skillTrainingData: ReadonlyArray<SkillTrainingData> = [
  { level: TrainingLevel.Untrained, bonusD10: 0, maxFocusLevel: 0 },
  { level: TrainingLevel.Cursory, bonusD10: 1, maxFocusLevel: 1 },
  { level: TrainingLevel.Skilled, bonusD10: 2, maxFocusLevel: 2 },
  { level: TrainingLevel.Adept, bonusD10: 3, maxFocusLevel: 3 },
  { level: TrainingLevel.Expert, bonusD10: 4, maxFocusLevel: 4 }
] as const;
