import { describe, it, expect } from 'vitest';
import { 
  combineTierAndModifier, 
  createCharacterAttributes, 
  createCharacter,
  characterBuilder,
  TrainingLevel
} from '../src';

describe('Attributes', () => {
  it('should combine tier and modifier correctly', () => {
    const attribute = combineTierAndModifier('Common', 3);
    expect(attribute).toBeDefined();
    expect(attribute?.d10).toBe(7);
    expect(attribute?.threshold).toBe(5);
    expect(attribute?.pool).toBe(5);
    expect(attribute?.statistics).toBe(6);
    expect(attribute?.defense).toBe(5);
  });

  it('should handle invalid tier names', () => {
    const attribute = combineTierAndModifier('NonExistentTier', 3);
    expect(attribute).toBeUndefined();
  });

  it('should handle attribute levels exceeding maximum defined level', () => {
    // Legendary (24) + 7 = 31, which exceeds the maximum level of 30
    const attribute = combineTierAndModifier('Legendary', 7);
    expect(attribute).toBeUndefined();
  });
  
  it('should handle attribute levels below minimum defined level', () => {
    // Deficit (0) with modifier -1 = -1, which is below the minimum level of 0
    const attribute = combineTierAndModifier('Deficit', -1);
    expect(attribute).toBeUndefined();
  });
  
  it('should handle attribute levels at boundary conditions', () => {
    // Test maximum valid level: Legendary (24) + 6 = 30
    const maxAttribute = combineTierAndModifier('Legendary', 6);
    expect(maxAttribute).toBeDefined();
    expect(maxAttribute?.d10).toBe(16);
    
    // Test minimum valid level: Deficit (0) + 0 = 0
    const minAttribute = combineTierAndModifier('Deficit', 0);
    expect(minAttribute).toBeDefined();
    expect(minAttribute?.d10).toBe(1);
  });
  
  it('should correctly calculate attributes when modifier pushes level into next tier range', () => {
    // Common (8) + 4 = 12, which is in the Exceptional tier range
    const attributeExceedingTier = combineTierAndModifier('Common', 4);
    expect(attributeExceedingTier).toBeDefined();
    expect(attributeExceedingTier?.d10).toBe(7); // Value for level 12
    
    // Common (8) + 8 = 16, which is in the Remarkable tier range
    const attributeExceedingMultipleTiers = combineTierAndModifier('Common', 8);
    expect(attributeExceedingMultipleTiers).toBeDefined();
    expect(attributeExceedingMultipleTiers?.d10).toBe(9); // Value for level 16
    
    // Deficit (0) + 4 = 4, which is in the Poor tier range
    const attributeExceedingLowestTier = combineTierAndModifier('Deficit', 4);
    expect(attributeExceedingLowestTier).toBeDefined();
    expect(attributeExceedingLowestTier?.d10).toBe(4); // Value for level 4
  });
});

describe('Character Builder', () => {
  it('should create a character with attributes', () => {
    // Create attributes
    const strength = combineTierAndModifier('Deficit', 4);
    const endurance = combineTierAndModifier('Deficit', 3);
    const coordination = combineTierAndModifier('Remarkable', 6);
    const quickness = combineTierAndModifier('Exceptional', 4);
    const willpower = combineTierAndModifier('Common', 3);
    const intellect = combineTierAndModifier('Common', 4);
    const charisma = combineTierAndModifier('Common', 3);
    const sensitivity = combineTierAndModifier('Exceptional', 3);
    
    // Ensure all attributes were created successfully
    expect(strength).toBeDefined();
    expect(endurance).toBeDefined();
    expect(coordination).toBeDefined();
    expect(quickness).toBeDefined();
    expect(willpower).toBeDefined();
    expect(intellect).toBeDefined();
    expect(charisma).toBeDefined();
    expect(sensitivity).toBeDefined();
    
    if (!strength || !endurance || !coordination || !quickness || 
        !willpower || !intellect || !charisma || !sensitivity) {
      throw new Error('Failed to create attributes');
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
    
    // Create character
    const character = createCharacter(attributes);
    
    // Verify character was created with correct derived values
    expect(character).toBeDefined();
    expect(character.pools.actionPool).toBe(19); // 11 (coordination) + 8 (quickness)
    expect(character.defenses.body).toBe(3); // 2 (strength) + 1 (endurance)
    expect(character.statistics.bodyPower).toBe(4); // 2 (strength) + 2 (endurance)
  });
  
  it('should apply skill trainings and focus levels correctly', () => {
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
      throw new Error('Failed to create attributes');
    }
    
    // Create character using builder pattern
    const character = characterBuilder(
      createCharacterAttributes(
        strength,
        endurance,
        coordination,
        quickness,
        willpower,
        intellect,
        charisma,
        sensitivity
      )
    )
    .withSkillTrainings([
      { skillName: 'Agility', level: TrainingLevel.Skilled },
      { skillName: 'Athletics', level: TrainingLevel.Adept }
    ])
    .withFocusLevels([
      { focusName: 'Acrobatics', level: 2 },
      { focusName: 'Prowess', level: 3 }
    ])
    .build();
    
    // Verify skill training was applied correctly
    const agilitySkill = character.skills.find(s => s.name === 'Agility');
    expect(agilitySkill).toBeDefined();
    expect(agilitySkill?.skillTraining).toBe(TrainingLevel.Skilled);
    expect(agilitySkill?.attributeValue).toBe(7); // 5 (base) + 2 (skilled bonus)
    
    const athleticsSkill = character.skills.find(s => s.name === 'Athletics');
    expect(athleticsSkill).toBeDefined();
    expect(athleticsSkill?.skillTraining).toBe(TrainingLevel.Adept);
    expect(athleticsSkill?.attributeValue).toBe(8); // 5 (base) + 3 (adept bonus)
    
    // Verify focus levels were applied correctly
    const acrobaticsFocus = agilitySkill?.focusOptions.find(f => f.focus === 'Acrobatics');
    expect(acrobaticsFocus).toBeDefined();
    expect(acrobaticsFocus?.focusLevel).toBe(2);
    expect(acrobaticsFocus?.d10).toBe(9); // 7 (skill) + 2 (focus level)
    
    const prowessFocus = athleticsSkill?.focusOptions.find(f => f.focus === 'Prowess');
    expect(prowessFocus).toBeDefined();
    expect(prowessFocus?.focusLevel).toBe(3);
    expect(prowessFocus?.d10).toBe(11); // 8 (skill) + 3 (focus level)
  });
  
  it('should enforce maximum focus level based on training level', () => {
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
      throw new Error('Failed to create attributes');
    }
    
    // Create character using builder pattern
    const character = characterBuilder(
      createCharacterAttributes(
        strength,
        endurance,
        coordination,
        quickness,
        willpower,
        intellect,
        charisma,
        sensitivity
      )
    )
    .withSkillTrainings([
      { skillName: 'Agility', level: TrainingLevel.Cursory } // max focus level 1
    ])
    .withFocusLevels([
      { focusName: 'Acrobatics', level: 3 } // should be capped at 1
    ])
    .build();
    
    // Verify focus level was capped
    const agilitySkill = character.skills.find(s => s.name === 'Agility');
    const acrobaticsFocus = agilitySkill?.focusOptions.find(f => f.focus === 'Acrobatics');
    expect(acrobaticsFocus?.focusLevel).toBe(1); // Should be capped at 1 for Cursory
  });
});
