import { Skill, TrainingLevel } from '../types';

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
      { focus: 'Acrobatics', d10: 0, threshold: 0, focusLevel: 0 },
      { focus: 'Escape', d10: 0, threshold: 0, focusLevel: 0 }
    ]
  },
  {
    name: 'Athletics',
    attribute: 'Strength',
    type: 'Field',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      { focus: 'Grapple', d10: 0, threshold: 0, focusLevel: 0 },
      { focus: 'Prowess', d10: 0, threshold: 0, focusLevel: 0 }
    ]
  },
  {
    name: 'Axiomatic Magic',
    attribute: 'Intellect',
    type: 'Magic',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      { focus: 'Formulae', d10: 0, threshold: 0, focusLevel: 0 },
      { focus: 'Ritual', d10: 0, threshold: 0, focusLevel: 0 }
    ]
  },
  {
    name: 'Blood Magic',
    attribute: 'Endurance',
    type: 'Magic',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      { focus: 'Inherited', d10: 0, threshold: 0, focusLevel: 0 },
      { focus: 'Morphic', d10: 0, threshold: 0, focusLevel: 0 }
    ]
  },
  {
    name: 'Bonds Magic',
    attribute: 'Charisma',
    type: 'Magic',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      { focus: 'Ego', d10: 0, threshold: 0, focusLevel: 0 },
      { focus: 'Spirit', d10: 0, threshold: 0, focusLevel: 0 }
    ]
  },
  {
    name: 'Close Weapons',
    attribute: 'Quickness',
    type: 'Melee',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      { focus: 'Slice', d10: 0, threshold: 0, focusLevel: 0 },
      { focus: 'Stab', d10: 0, threshold: 0, focusLevel: 0 }
    ]
  },
  {
    name: 'Command',
    attribute: 'Charisma',
    type: 'Field',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      { focus: 'Inspire', d10: 0, threshold: 0, focusLevel: 0 },
      { focus: 'Intimidate', d10: 0, threshold: 0, focusLevel: 0 }
    ]
  },
  {
    name: 'Cunning',
    attribute: 'Intellect',
    type: 'Field',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      { focus: 'Discern', d10: 0, threshold: 0, focusLevel: 0 },
      { focus: 'Plan', d10: 0, threshold: 0, focusLevel: 0 }
    ]
  },
  {
    name: 'Dexterity',
    attribute: 'Coordination',
    type: 'Field',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      { focus: 'Finesse', d10: 0, threshold: 0, focusLevel: 0 },
      { focus: 'Pilfer', d10: 0, threshold: 0, focusLevel: 0 }
    ]
  },
  {
    name: 'Flexible Weapons',
    attribute: 'Quickness',
    type: 'Melee',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      { focus: 'Arc', d10: 0, threshold: 0, focusLevel: 0 },
      { focus: 'Lash', d10: 0, threshold: 0, focusLevel: 0 }
    ]
  },
  {
    name: 'Focus Magic',
    attribute: 'Willpower',
    type: 'Magic',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      { focus: 'Banish', d10: 0, threshold: 0, focusLevel: 0 },
      { focus: 'Manipulate', d10: 0, threshold: 0, focusLevel: 0 }
    ]
  },
  {
    name: 'Gunnery',
    attribute: 'Intellect',
    type: 'Ranged',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      { focus: 'Direct', d10: 0, threshold: 0, focusLevel: 0 },
      { focus: 'Indirect', d10: 0, threshold: 0, focusLevel: 0 }
    ]
  },
  {
    name: 'Hafted Weapons',
    attribute: 'Strength',
    type: 'Melee',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      { focus: 'Impale', d10: 0, threshold: 0, focusLevel: 0 },
      { focus: 'Strike', d10: 0, threshold: 0, focusLevel: 0 }
    ]
  },
  {
    name: 'Long Arms',
    attribute: 'Sensitivity',
    type: 'Ranged',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      { focus: 'Crossbow', d10: 0, threshold: 0, focusLevel: 0 },
      { focus: 'Rifle', d10: 0, threshold: 0, focusLevel: 0 }
    ]
  },
  {
    name: 'Missile Weapons',
    attribute: 'Coordination',
    type: 'Ranged',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      { focus: 'Archery', d10: 0, threshold: 0, focusLevel: 0 },
      { focus: 'Throw', d10: 0, threshold: 0, focusLevel: 0 }
    ]
  },
  {
    name: 'Mobility',
    attribute: 'Quickness',
    type: 'Field',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      { focus: 'Chase', d10: 0, threshold: 0, focusLevel: 0 },
      { focus: 'Skirmish', d10: 0, threshold: 0, focusLevel: 0 }
    ]
  },
  {
    name: 'Observation',
    attribute: 'Sensitivity',
    type: 'Field',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      { focus: 'Search', d10: 0, threshold: 0, focusLevel: 0 },
      { focus: 'Survey', d10: 0, threshold: 0, focusLevel: 0 }
    ]
  },
  {
    name: 'Persuade',
    attribute: 'Charisma',
    type: 'Field',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      { focus: 'Con', d10: 0, threshold: 0, focusLevel: 0 },
      { focus: 'Handle', d10: 0, threshold: 0, focusLevel: 0 }
    ]
  },
  {
    name: 'Pistols',
    attribute: 'Coordination',
    type: 'Ranged',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      { focus: 'Handgun', d10: 0, threshold: 0, focusLevel: 0 },
      { focus: 'Mechanical', d10: 0, threshold: 0, focusLevel: 0 }
    ]
  },
  {
    name: 'Stealth',
    attribute: 'Coordination',
    type: 'Field',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      { focus: 'Hide', d10: 0, threshold: 0, focusLevel: 0 },
      { focus: 'Infiltration', d10: 0, threshold: 0, focusLevel: 0 }
    ]
  },
  {
    name: 'Swords',
    attribute: 'Coordination',
    type: 'Melee',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      { focus: 'Cut', d10: 0, threshold: 0, focusLevel: 0 },
      { focus: 'Thrust', d10: 0, threshold: 0, focusLevel: 0 }
    ]
  },
  {
    name: 'Unarmed Combat',
    attribute: 'Coordination',
    type: 'Melee',
    skillTraining: TrainingLevel.Untrained,
    focusOptions: [
      { focus: 'Kick', d10: 0, threshold: 0, focusLevel: 0 },
      { focus: 'Punch', d10: 0, threshold: 0, focusLevel: 0 }
    ]
  }
] as const;
