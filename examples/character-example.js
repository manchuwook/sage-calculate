import {
  combineTierAndModifier,
  createCharacterAttributes,
  characterBuilder,
  createCharacter,
  applySkillTrainings,
  applyFocusLevels,
  TrainingLevel
} from '../src';
import { pipe } from 'effect/Function';

/**
 * Example showing how to create a character using the builder pattern
 */
const exampleUsingBuilder = () => {
  console.log('=== Example Using Builder Pattern ===');
  
  // Create attributes from tiers and modifiers
  const strength = combineTierAndModifier('Common', 3);
  const endurance = combineTierAndModifier('Deficit', 4);
  const coordination = combineTierAndModifier('Remarkable', 6);
  const quickness = combineTierAndModifier('Exceptional', 4);
  const willpower = combineTierAndModifier('Common', 3);
  const intellect = combineTierAndModifier('Common', 4);
  const charisma = combineTierAndModifier('Common', 3);
  const sensitivity = combineTierAndModifier('Exceptional', 3);
  
  if (!strength || !endurance || !coordination || !quickness || 
      !willpower || !intellect || !charisma || !sensitivity) {
    console.error('Failed to create attributes');
    return;
  }
  
  // Create character attributes
  const attributes = createCharacterAttributes(
    strength,
    endurance,
    coordination,
    quickness,
    willpower,
    intellect,
    charisma,
    sensitivity
  );
  
  // Build character using the builder pattern
  const character = characterBuilder(attributes)
    .withSkillTrainings([
      { skillName: 'Agility', level: TrainingLevel.Skilled },
      { skillName: 'Athletics', level: TrainingLevel.Skilled },
      { skillName: 'Axiomatic Magic', level: TrainingLevel.Skilled },
      { skillName: 'Bonds Magic', level: TrainingLevel.Skilled },
      { skillName: 'Cunning', level: TrainingLevel.Skilled },
      { skillName: 'Focus Magic', level: TrainingLevel.Skilled },
      { skillName: 'Missile Weapons', level: TrainingLevel.Adept },
      { skillName: 'Mobility', level: TrainingLevel.Cursory },
      { skillName: 'Stealth', level: TrainingLevel.Skilled },
      { skillName: 'Swords', level: TrainingLevel.Cursory },
      { skillName: 'Unarmed Combat', level: TrainingLevel.Cursory }
    ])
    .withFocusLevels([
      { focusName: 'Escape', level: 1 },
      { focusName: 'Prowess', level: 1 },
      { focusName: 'Ritual', level: 1 },
      { focusName: 'Formulae', level: 2 },
      { focusName: 'Discern', level: 1 },
      { focusName: 'Manipulate', level: 1 },
      { focusName: 'Archery', level: 2 },
      { focusName: 'Hide', level: 2 }
    ])
    .build();
  
  // Output character information
  console.log('Character Pools:', character.pools);
  console.log('Character Defenses:', character.defenses);
  console.log('Character Body Power:', character.statistics.bodyPower);
  console.log('Character Movement:', character.statistics.movement);
  
  // Get and print all focus options with their roll values
  const skillsWithFocus = character.skills
    .filter(skill => skill.focusOptions.some(focus => focus.focusLevel > 0));
  
  console.log('\nSkills with Focus:');
  skillsWithFocus.forEach(skill => {
    console.log(`${skill.name} (${skill.skillTraining}):`);
    skill.focusOptions
      .filter(focus => focus.focusLevel > 0)
      .forEach(focus => {
        console.log(`  - ${focus.focus}: ${focus.d10}d10 (${focus.threshold}+) [Level ${focus.focusLevel}]`);
      });
  });
};

/**
 * Example showing how to use generators with the library
 */
const exampleUsingGenerators = () => {
  console.log('\n=== Example Using Generators ===');
  
  // Create a simple character
  const strength = combineTierAndModifier('Common', 0);
  const endurance = combineTierAndModifier('Common', 0);
  const coordination = combineTierAndModifier('Common', 0);
  const quickness = combineTierAndModifier('Common', 0);
  const willpower = combineTierAndModifier('Common', 0);
  const intellect = combineTierAndModifier('Common', 0);
  const charisma = combineTierAndModifier('Common', 0);
  const sensitivity = combineTierAndModifier('Common', 0);
  
  if (!strength || !endurance || !coordination || !quickness || 
      !willpower || !intellect || !charisma || !sensitivity) {
    console.error('Failed to create attributes');
    return;
  }
  
  // Create character
  const attributes = createCharacterAttributes(
    strength, endurance, coordination, quickness,
    willpower, intellect, charisma, sensitivity
  );
  
  const character = characterBuilder(attributes)
    .withSkillTrainings([
      { skillName: 'Agility', level: TrainingLevel.Skilled },
      { skillName: 'Athletics', level: TrainingLevel.Adept },
      { skillName: 'Axiomatic Magic', level: TrainingLevel.Expert },
      { skillName: 'Blood Magic', level: TrainingLevel.Skilled },
      { skillName: 'Focus Magic', level: TrainingLevel.Adept }
    ])
    .build();
  
  // Define a generator function to yield skills of a certain type
  function* getSkillsByType(skills, type) {
    for (const skill of skills) {
      if (skill.type === type) {
        yield skill;
      }
    }
  }
  
  // Create a generator for magic skills
  const magicSkills = getSkillsByType(character.skills, 'Magic');
  
  // Use the generator to process skills
  console.log('Magic skills:');
  for (const skill of magicSkills) {
    console.log(`- ${skill.name} (${skill.skillTraining}): ${skill.attributeValue}d10 (${skill.attributeThreshold}+)`);
  }
  
  // Create a generator to yield skills by training level
  function* getSkillsByTrainingLevel(skills, level) {
    for (const skill of skills) {
      if (skill.skillTraining === level) {
        yield skill;
      }
    }
  }
  
  // Create a generator for adept skills
  const adeptSkills = getSkillsByTrainingLevel(character.skills, TrainingLevel.Adept);
  
  // Use the generator
  console.log('\nAdept-level skills:');
  for (const skill of adeptSkills) {
    console.log(`- ${skill.name} (${skill.type}): ${skill.attributeValue}d10 (${skill.attributeThreshold}+)`);
  }
};

/**
 * Example showing how to use functional programming concepts
 */
const exampleUsingFunctional = () => {
  console.log('\n=== Example Using Functional Programming ===');
  
  // Create attributes
  const strength = combineTierAndModifier('Common', 0);
  const endurance = combineTierAndModifier('Common', 0);
  const coordination = combineTierAndModifier('Common', 0);
  const quickness = combineTierAndModifier('Common', 0);
  const willpower = combineTierAndModifier('Common', 0);
  const intellect = combineTierAndModifier('Common', 0);
  const charisma = combineTierAndModifier('Common', 0);
  const sensitivity = combineTierAndModifier('Common', 0);
  
  if (!strength || !endurance || !coordination || !quickness || 
      !willpower || !intellect || !charisma || !sensitivity) {
    console.error('Failed to create attributes');
    return;
  }
  
  // Create character attributes
  const attributes = createCharacterAttributes(
    strength, endurance, coordination, quickness,
    willpower, intellect, charisma, sensitivity
  );
  
  // Use functions from the imports at the top
  // createCharacter, applySkillTrainings, and applyFocusLevels are already imported from '../src'
  
  // Use pipe to create a processing pipeline
  const character = pipe(
    attributes,
    createCharacter,
    char => applySkillTrainings(char, [
      { skillName: 'Agility', level: TrainingLevel.Skilled },
      { skillName: 'Athletics', level: TrainingLevel.Adept }
    ]),
    char => applyFocusLevels(char, [
      { focusName: 'Acrobatics', level: 2 },
      { focusName: 'Prowess', level: 3 }
    ])
  );
  
  // Create some utility functions
  const getSkillsByAttribute = (skills, attribute) => 
    skills.filter(skill => skill.attribute === attribute);
  
  const getSortedSkillsByTraining = (skills) => 
    [...skills].sort((a, b) => {
      const trainingLevels = {
        [TrainingLevel.Untrained]: 0,
        [TrainingLevel.Cursory]: 1,
        [TrainingLevel.Skilled]: 2,
        [TrainingLevel.Adept]: 3,
        [TrainingLevel.Expert]: 4
      };
      
      return trainingLevels[b.skillTraining] - trainingLevels[a.skillTraining];
    });
  
  // Get coordination-based skills and sort by training level
  const coordinationSkills = pipe(
    character.skills,
    skills => getSkillsByAttribute(skills, 'Coordination'),
    getSortedSkillsByTraining
  );
  
  // Output results
  console.log('Coordination-based skills (sorted by training level):');
  coordinationSkills.forEach(skill => {
    console.log(`- ${skill.name} (${skill.skillTraining}): ${skill.attributeValue}d10 (${skill.attributeThreshold}+)`);
  });
};

// Run the examples
exampleUsingBuilder();
exampleUsingGenerators();
exampleUsingFunctional();
