import { pipe } from 'effect/Function';
import { 
  Character, 
  CharacterAttributes, 
  Attribute, 
  TrainingLevel 
} from '../types';
import { combineTierAndModifier, extractDefenseValues, extractPoolValues, extractStatistics, extractD10Values, extractThresholds } from './attributes';
import { calculateDefenses } from './defenses';
import { calculatePools } from './pools';
import { calculateStatistics } from './statistics';
import { calculateSkills, updateFocusLevelInList, updateSkillTrainingInList } from './skills';
import {
  characterModificationMonoid as modificationMonoid
} from './character-monoids';

/**
 * Creates a character attributes object from individual attributes
 * 
 * @param strength - Strength attribute
 * @param endurance - Endurance attribute
 * @param coordination - Coordination attribute
 * @param quickness - Quickness attribute
 * @param willpower - Willpower attribute
 * @param intellect - Intellect attribute
 * @param charisma - Charisma attribute
 * @param sensitivity - Sensitivity attribute
 * @returns A CharacterAttributes object
 */
export const createCharacterAttributes = (
  strength: Attribute,
  endurance: Attribute,
  coordination: Attribute,
  quickness: Attribute,
  willpower: Attribute,
  intellect: Attribute,
  charisma: Attribute,
  sensitivity: Attribute
): CharacterAttributes => ({
  strength,
  endurance,
  coordination,
  quickness,
  willpower,
  intellect,
  charisma,
  sensitivity
});

/**
 * Creates character attributes object using tier names and modifiers
 * 
 * @param strengthTier - Strength tier name
 * @param strengthMod - Strength modifier
 * @param enduranceTier - Endurance tier name
 * @param enduranceMod - Endurance modifier
 * @param coordinationTier - Coordination tier name
 * @param coordinationMod - Coordination modifier
 * @param quicknessTier - Quickness tier name
 * @param quicknessMod - Quickness modifier
 * @param willpowerTier - Willpower tier name
 * @param willpowerMod - Willpower modifier
 * @param intellectTier - Intellect tier name
 * @param intellectMod - Intellect modifier
 * @param charismaTier - Charisma tier name
 * @param charismaMod - Charisma modifier
 * @param sensitivityTier - Sensitivity tier name
 * @param sensitivityMod - Sensitivity modifier
 * @returns A CharacterAttributes object or undefined if any tier is invalid
 */
export const createCharacterAttributesFromTiers = (
  strengthTier: string,
  strengthMod: number,
  enduranceTier: string,
  enduranceMod: number,
  coordinationTier: string,
  coordinationMod: number,
  quicknessTier: string,
  quicknessMod: number,
  willpowerTier: string,
  willpowerMod: number,
  intellectTier: string,
  intellectMod: number,
  charismaTier: string,
  charismaMod: number,
  sensitivityTier: string,
  sensitivityMod: number
): CharacterAttributes | undefined => {
  // Generate all attributes
  const strength = combineTierAndModifier(strengthTier, strengthMod);
  const endurance = combineTierAndModifier(enduranceTier, enduranceMod);
  const coordination = combineTierAndModifier(coordinationTier, coordinationMod);
  const quickness = combineTierAndModifier(quicknessTier, quicknessMod);
  const willpower = combineTierAndModifier(willpowerTier, willpowerMod);
  const intellect = combineTierAndModifier(intellectTier, intellectMod);
  const charisma = combineTierAndModifier(charismaTier, charismaMod);
  const sensitivity = combineTierAndModifier(sensitivityTier, sensitivityMod);
  
  // If any attribute couldn't be created, return undefined
  if (!strength || !endurance || !coordination || !quickness || 
      !willpower || !intellect || !charisma || !sensitivity) {
    return undefined;
  }
  
  return createCharacterAttributes(
    strength,
    endurance,
    coordination,
    quickness,
    willpower,
    intellect,
    charisma,
    sensitivity
  );
};

/**
 * Creates a complete character from attributes
 * 
 * @param attributes - The character attributes
 * @returns A Character object with calculated properties
 */
export const createCharacter = (
  attributes: CharacterAttributes
): Character => {
  // Convert attributes to array for easier processing
  const attributesArray = [
    attributes.strength,
    attributes.endurance,
    attributes.coordination,
    attributes.quickness,
    attributes.willpower,
    attributes.intellect,
    attributes.charisma,
    attributes.sensitivity
  ];
  
  // Extract values from attributes
  const d10Values = extractD10Values(attributesArray);
  const thresholdValues = extractThresholds(attributesArray);
  const poolValues = extractPoolValues(attributesArray);
  const statisticsValues = extractStatistics(attributesArray);
  const defenseValues = extractDefenseValues(attributesArray);
  
  // Calculate derived properties
  const pools = calculatePools(poolValues);
  const statistics = calculateStatistics(statisticsValues);
  const defenses = calculateDefenses(defenseValues);
  const skills = calculateSkills(d10Values, thresholdValues);
  
  return {
    attributes,
    pools,
    statistics,
    defenses,
    skills
  };
};

/**
 * Applies a set of skill trainings to a character
 * 
 * @param character - The character to update
 * @param skillTrainings - Array of skill name and training level pairs
 * @returns A new character with updated skills
 */
export const applySkillTrainings = (
  character: Character,
  skillTrainings: Array<{ skillName: string; level: TrainingLevel }>
): Character => {
  let updatedSkills = [...character.skills];
  
  // Apply each skill training
  for (const { skillName, level } of skillTrainings) {
    updatedSkills = updateSkillTrainingInList(
      updatedSkills,
      skillName,
      level
    );
  }
  
  return {
    ...character,
    skills: updatedSkills
  };
};

/**
 * Applies a set of focus levels to a character
 * 
 * @param character - The character to update
 * @param focusLevels - Array of focus name and level pairs
 * @returns A new character with updated foci
 */
export const applyFocusLevels = (
  character: Character,
  focusLevels: Array<{ focusName: string; level: number }>
): Character => {
  let updatedSkills = [...character.skills];
  
  // Apply each focus level
  for (const { focusName, level } of focusLevels) {
    updatedSkills = updateFocusLevelInList(
      updatedSkills,
      focusName,
      level
    );
  }
  
  return {
    ...character,
    skills: updatedSkills
  };
};

/**
 * Chain function to build a character with a fluent interface
 */
type CharacterBuilder = {
  withSkillTrainings: (
    skillTrainings: Array<{ skillName: string; level: TrainingLevel }>
  ) => CharacterBuilder;
  withFocusLevels: (
    focusLevels: Array<{ focusName: string; level: number }>
  ) => CharacterBuilder;
  build: () => Character;
};

/**
 * Creates a fluent builder for characters using the monoid pattern
 * 
 * @param attributes - The character attributes
 * @returns A CharacterBuilder instance
 */
export const characterBuilder = (
  attributes: CharacterAttributes
): CharacterBuilder => {
  let baseCharacter = createCharacter(attributes);
  let modifications = modificationMonoid.empty;
  
  return {
    withSkillTrainings(skillTrainings) {
      modifications = modificationMonoid.combine(modifications, {
        skillTrainings,
        focusLevels: []
      });
      return this;
    },
    
    withFocusLevels(focusLevels) {
      modifications = modificationMonoid.combine(modifications, {
        skillTrainings: [],
        focusLevels
      });
      return this;
    },
    
    build() {
      return pipe(
        baseCharacter,
        character => applySkillTrainings(character, modifications.skillTrainings),
        character => applyFocusLevels(character, modifications.focusLevels)
      );
    }
  };
};
