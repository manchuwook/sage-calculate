import { FocusOption, Skill, TrainingLevel } from '../types';

/**
 * Default values for focus options
 */
const DEFAULT_FOCUS_OPTION: Omit<FocusOption, 'focus'> = {
  d10: 0,
  threshold: 0,
  focusLevel: 0
};

/**
 * Creates a focus option with default values
 */
const createFocOpt = (focus: string): FocusOption => ({
  focus,
  ...DEFAULT_FOCUS_OPTION
});

/**
 * Valid skill types
 */
export type SkillType = 'Field' | 'Magic' | 'Melee' | 'Ranged';

/**
 * Valid attribute names
 */
export type AttributeName = 
  'Strength' | 'Endurance' | 'Coordination' | 'Quickness' | 
  'Willpower' | 'Intellect' | 'Charisma' | 'Sensitivity';

/**
 * Base skill template data with focus options
 */
export const skillTemplates: ReadonlyArray<Omit<Skill, 'attributeValue' | 'attributeThreshold' | 'baseAttributeValue'>> = [
  {
    name: 'Agility',
    attribute: 'Coordination',
    type: 'Field',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      createFocOpt('Acrobatics'),
      createFocOpt('Escape')
    ]
  },
  {
    name: 'Athletics',
    attribute: 'Strength',
    type: 'Field',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      createFocOpt('Grapple'),
      createFocOpt('Prowess')
    ]
  },
  {
    name: 'Axiomatic Magic',
    attribute: 'Intellect',
    type: 'Magic',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      createFocOpt('Formulae'),
      createFocOpt('Ritual')
    ]
  },
  {
    name: 'Blood Magic',
    attribute: 'Endurance',
    type: 'Magic',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      createFocOpt('Inherited'),
      createFocOpt('Morphic')
    ]
  },
  {
    name: 'Bonds Magic',
    attribute: 'Charisma',
    type: 'Magic',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      createFocOpt('Ego'),
      createFocOpt('Spirit')
    ]
  },
  {
    name: 'Close Weapons',
    attribute: 'Quickness',
    type: 'Melee',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      createFocOpt('Slice'),
      createFocOpt('Stab')
    ]
  },
  {
    name: 'Command',
    attribute: 'Charisma',
    type: 'Field',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      createFocOpt('Inspire'),
      createFocOpt('Intimidate')
    ]
  },
  {
    name: 'Cunning',
    attribute: 'Intellect',
    type: 'Field',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      createFocOpt('Discern'),
      createFocOpt('Plan')
    ]
  },
  {
    name: 'Dexterity',
    attribute: 'Coordination',
    type: 'Field',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      createFocOpt('Finesse'),
      createFocOpt('Pilfer')
    ]
  },
  {
    name: 'Flexible Weapons',
    attribute: 'Quickness',
    type: 'Melee',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      createFocOpt('Arc'),
      createFocOpt('Lash')
    ]
  },
  {
    name: 'Focus Magic',
    attribute: 'Willpower',
    type: 'Magic',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      createFocOpt('Banish'),
      createFocOpt('Manipulate')
    ]
  },
  {
    name: 'Gunnery',
    attribute: 'Intellect',
    type: 'Ranged',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      createFocOpt('Direct'),
      createFocOpt('Indirect')
    ]
  },
  {
    name: 'Hafted Weapons',
    attribute: 'Strength',
    type: 'Melee',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      createFocOpt('Impale'),
      createFocOpt('Strike')
    ]
  },
  {
    name: 'Long Arms',
    attribute: 'Sensitivity',
    type: 'Ranged',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      createFocOpt('Crossbow'),
      createFocOpt('Rifle')
    ]
  },
  {
    name: 'Missile Weapons',
    attribute: 'Coordination',
    type: 'Ranged',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      createFocOpt('Archery'),
      createFocOpt('Throw')
    ]
  },
  {
    name: 'Mobility',
    attribute: 'Quickness',
    type: 'Field',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      createFocOpt('Chase'),
      createFocOpt('Skirmish')
    ]
  },
  {
    name: 'Observation',
    attribute: 'Sensitivity',
    type: 'Field',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      createFocOpt('Search'),
      createFocOpt('Survey')
    ]
  },
  {
    name: 'Persuade',
    attribute: 'Charisma',
    type: 'Field',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      createFocOpt('Con'),
      createFocOpt('Handle')
    ]
  },
  {
    name: 'Pistols',
    attribute: 'Coordination',
    type: 'Ranged',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      createFocOpt('Handgun'),
      createFocOpt('Mechanical')
    ]
  },
  {
    name: 'Stealth',
    attribute: 'Coordination',
    type: 'Field',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      createFocOpt('Hide'),
      createFocOpt('Infiltration')
    ]
  },
  {
    name: 'Swords',
    attribute: 'Coordination',
    type: 'Melee',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      createFocOpt('Cut'),
      createFocOpt('Thrust')
    ]
  },
  {
    name: 'Unarmed Combat',
    attribute: 'Coordination',
    type: 'Melee',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      createFocOpt('Kick'),
      createFocOpt('Punch')
    ]
  }
] as const;

/**
 * Gets a specific skill template by name
 * 
 * @param name - The name of the skill template to find
 * @returns The skill template or undefined if not found
 */
export const getSkillTemplate = (name: string) => 
  skillTemplates.find(template => template.name === name);

/**
 * Gets all skill templates of a specific type
 * 
 * @param type - The skill type to filter by
 * @returns An array of skill templates matching the type
 */
export const getSkillTemplatesByType = (type: SkillType) => 
  skillTemplates.filter(template => template.type === type);

/**
 * Gets all skill templates associated with a specific attribute
 * 
 * @param attribute - The attribute to filter by
 * @returns An array of skill templates associated with the attribute
 */
export const getSkillTemplatesByAttribute = (attribute: AttributeName) => 
  skillTemplates.filter(template => template.attribute === attribute);
