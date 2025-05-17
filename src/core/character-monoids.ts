import * as Semigroup from '@effect/typeclass/Semigroup';
import * as Monoid from '@effect/typeclass/Monoid';
import { TrainingLevel } from '../types';

/**
 * Type for skill training array
 */
export type SkillTrainings = Array<{ skillName: string; level: TrainingLevel }>;

/**
 * Type for focus level array
 */
export type FocusLevels = Array<{ focusName: string; level: number }>;

/**
 * Semigroup for combining skill trainings
 */
export const skillTrainingSemigroup = Semigroup.make<SkillTrainings>(
  (a, b) => [...a, ...b]
);

/**
 * Semigroup for combining focus levels
 */
export const focusLevelSemigroup = Semigroup.make<FocusLevels>(
  (a, b) => [...a, ...b]
);

/**
 * Monoid for character modifications that include both skill trainings and focus levels
 */
export interface CharacterModification {
  readonly skillTrainings: SkillTrainings;
  readonly focusLevels: FocusLevels;
}

export const emptyCharacterModification: CharacterModification = {
  skillTrainings: [],
  focusLevels: []
};

/**
 * Semigroup for CharacterModification to combine modifications
 */
export const characterModificationSemigroup = Semigroup.make<CharacterModification>(
  (self, that) => ({
    skillTrainings: [...self.skillTrainings, ...that.skillTrainings],
    focusLevels: [...self.focusLevels, ...that.focusLevels]
  })
);

/**
 * Monoid for CharacterModification
 */
export const characterModificationMonoid = Monoid.fromSemigroup(
  characterModificationSemigroup,
  emptyCharacterModification
);
