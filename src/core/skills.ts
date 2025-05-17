import { FocusOption, Skill, SkillTrainingData, TrainingLevel } from '../types';
import { map, } from 'effect/Array';
import { pipe } from 'effect/Function';
import { skillTemplates } from './skillTemplates';
import { skillTrainingData } from './skillTrainingData';

/**
 * Mapping of attribute names to their index in the attribute arrays
 */
export const attributeNameToIndex: Record<string, number> = {
  'Strength': 0,
  'Endurance': 1,
  'Coordination': 2,
  'Quickness': 3,
  'Willpower': 4,
  'Intellect': 5,
  'Charisma': 6,
  'Sensitivity': 7
} as const;

/**
 * Retrieves a skill training data by level
 * 
 * @param level - The training level to find
 * @returns The skill training data or undefined if not found
 */
export const getSkillTrainingByLevel = (
  level: TrainingLevel
): SkillTrainingData | undefined =>
  skillTrainingData.find(training => training.level === level);

/**
 * Updates focus options with the given attribute values
 * 
 * @param focusOptions - The focus options to update
 * @param d10 - The d10 value to set
 * @param threshold - The threshold value to set
 * @returns A new array of updated focus options
 */
export const updateFocusOptions = (
  focusOptions: ReadonlyArray<FocusOption>,
  d10: number,
  threshold: number
): FocusOption[] =>
  pipe(
    focusOptions,
    map((focus: FocusOption): FocusOption => ({
      ...focus,
      d10: d10 + focus.focusLevel,
      threshold
    }))
  );

/**
 * Creates a skill object with attribute values
 * 
 * @param template - The skill template
 * @param attributeD10 - The attribute's d10 value
 * @param attributeThreshold - The attribute's threshold value
 * @returns A new skill object with updated values
 */
export const createSkill = (
  template: Omit<Skill, 'attributeValue' | 'attributeThreshold' | 'baseAttributeValue'>,
  attributeD10: number,
  attributeThreshold: number
): Skill => ({
  ...template,
  attributeValue: attributeD10,
  attributeThreshold,
  baseAttributeValue: attributeD10,
  focusOptions: updateFocusOptions(
    template.focusOptions,
    attributeD10,
    attributeThreshold
  )
});

/**
 * Generates skills based on attribute levels and thresholds
 * 
 * @param attributeLevels - Array of attribute d10 values
 * @param attributeThresholds - Array of attribute threshold values
 * @returns An array of skills with values calculated from attributes
 */
export const calculateSkills = (
  attributeLevels: number[],
  attributeThresholds: number[]
): Skill[] => {
  // Ensure we have at least 8 values for each array, filling with 0 if necessary
  const d10Values = [...attributeLevels, ...Array(8).fill(0)].slice(0, 8);
  const thresholdValues = [...attributeThresholds, ...Array(8).fill(0)].slice(0, 8);

  interface SkillTemplate extends Omit<Skill, 'attributeValue' | 'attributeThreshold' | 'baseAttributeValue'> { }

  return pipe(
    skillTemplates,
    map((template: SkillTemplate): Skill => {
      const attrIndex: number = attributeNameToIndex[template.attribute];
      return createSkill(
        template,
        d10Values[attrIndex],
        thresholdValues[attrIndex]
      );
    })
  );
};

/**
 * Updates a skill's training level
 * 
 * @param skill - The skill to update
 * @param trainingLevel - The new training level
 * @returns A new skill with updated training level and recalculated values
 */
export const updateSkillTraining = (
  skill: Skill,
  trainingLevel: TrainingLevel
): Skill => {
  const trainingData = getSkillTrainingByLevel(trainingLevel);
  if (!trainingData) return skill;

  const bonusD10 = trainingData.bonusD10;
  const newAttributeValue = skill.baseAttributeValue + bonusD10;

  return {
    ...skill,
    skillTraining: trainingLevel,
    attributeValue: newAttributeValue,
    focusOptions: updateFocusOptions(
      skill.focusOptions,
      newAttributeValue,
      skill.attributeThreshold
    )
  };
};

/**
 * Updates a focus level within a skill
 * 
 * @param skill - The skill containing the focus
 * @param focusName - The name of the focus to update
 * @param focusLevel - The new focus level
 * @returns A new skill with the updated focus and recalculated values
 */
export const updateFocusLevel = (
  skill: Skill,
  focusName: string,
  focusLevel: number
): Skill => {
  const trainingData = getSkillTrainingByLevel(skill.skillTraining);
  if (!trainingData) return skill;

  // Validate focus level doesn't exceed maximum for the training level
  const validFocusLevel = Math.min(
    focusLevel,
    trainingData.maxFocusLevel
  );

  return {
    ...skill,
    focusOptions: skill.focusOptions.map(focus =>
      focus.focus === focusName
        ? {
          ...focus,
          focusLevel: validFocusLevel,
          d10: skill.attributeValue + validFocusLevel
        }
        : focus
    )
  };
};

/**
 * Updates a skill's training in a list of skills
 * 
 * @param skills - The list of skills
 * @param skillName - The name of the skill to update
 * @param trainingLevel - The new training level
 * @returns A new array of skills with the updated skill
 */
export const updateSkillTrainingInList = (
  skills: Skill[],
  skillName: string,
  trainingLevel: TrainingLevel
): Skill[] =>
  skills.map(skill =>
    skill.name === skillName
      ? updateSkillTraining(skill, trainingLevel)
      : skill
  );

/**
 * Updates a focus level in a list of skills
 * 
 * @param skills - The list of skills
 * @param focusName - The name of the focus to update
 * @param focusLevel - The new focus level
 * @returns A new array of skills with the updated focus
 */
export const updateFocusLevelInList = (
  skills: Skill[],
  focusName: string,
  focusLevel: number
): Skill[] => {
  // Find the skill that contains this focus
  const skillIndex = skills.findIndex(skill =>
    skill.focusOptions.some(focus => focus.focus === focusName)
  );

  if (skillIndex === -1) return skills;

  return [
    ...skills.slice(0, skillIndex),
    updateFocusLevel(skills[skillIndex], focusName, focusLevel),
    ...skills.slice(skillIndex + 1)
  ];
};

/**
 * Extracts all focus options from a list of skills into a flattened array
 * 
 * @param skills - The list of skills to extract from
 * @returns A flattened array of all focus options
 */
export const extractAllFoci = (skills: Skill[]): FocusOption[] =>
  skills.flatMap(skill => skill.focusOptions);

/**
 * Gets formatted roll strings for all foci
 * 
 * @param skills - The list of skills
 * @returns An array of foci with their roll strings
 */
export const getFociRolls = (
  skills: Skill[]
): Array<{ focus: string; roll: string }> => {
  const foci = extractAllFoci(skills);

  // Sort by focus name
  foci.sort((a, b) => a.focus.localeCompare(b.focus));

  return foci.map(focus => ({
    focus: focus.focus,
    roll: `${focus.d10}d10 (${focus.threshold}+)`
  }));
};

/**
 * Builds a complete set of skills using default attribute values
 * This is useful for UIs that need to display all skills without specific character attributes
 * 
 * @param defaultD10 - Optional default d10 value for all attributes (defaults to 0)
 * @param defaultThreshold - Optional default threshold value for all attributes (defaults to 0)
 * @returns A complete array of skills with uniform attribute values
 */
export const buildCompleteSkillList = (
  defaultD10: number = 0,
  defaultThreshold: number = 0
): Skill[] => {
  // Create an array of attribute values, all set to the same defaultD10
  const attributeLevels = Array(8).fill(defaultD10);
  const attributeThresholds = Array(8).fill(defaultThreshold);
  
  return calculateSkills(attributeLevels, attributeThresholds);
};

/**
 * Gets a list of all available skill names from the templates
 * This is useful for UI dropdowns and similar components
 * 
 * @returns An array of all skill names
 */
export const getAllSkillNames = (): string[] => 
  skillTemplates.map(template => template.name);

/**
 * Gets a list of all available focus names from the templates
 * This is useful for UI dropdowns and similar components
 * 
 * @returns An array of all focus names
 */
export const getAllFocusNames = (): string[] => 
  skillTemplates.flatMap(template => 
    template.focusOptions.map(focus => focus.focus)
  );

/**
 * Gets a mapping of skills to their available focus options
 * This is useful for UI components that need to show related focus options
 * 
 * @returns An object mapping skill names to arrays of focus names
 */
export const getSkillToFocusMapping = (): Record<string, string[]> => 
  skillTemplates.reduce((mapping, template) => {
    mapping[template.name] = template.focusOptions.map(focus => focus.focus);
    return mapping;
  }, {} as Record<string, string[]>);

/**
 * Gets a map of skills by type (Field, Magic, Melee, Ranged)
 * This is useful for UI organization
 * 
 * @returns An object mapping skill types to arrays of skill names
 */
export const getSkillsByType = (): Record<string, string[]> => {
  const result: Record<string, string[]> = {};
  
  skillTemplates.forEach(template => {
    if (!result[template.type]) {
      result[template.type] = [];
    }
    result[template.type].push(template.name);
  });
  
  return result;
};
