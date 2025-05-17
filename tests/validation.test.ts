import { describe, it, expect } from 'vitest';
import { 
  validateTierModifier, 
  validateAttributeLevel,
  validateAttributeLevelForTier,
  AttributeSchema,
  validateCharacterAttributes,
  validateAttribute,
  getTierForAttributeLevel,
  CharacterAttributesSchema
} from '../src/validation/attributes.zod';
import { combineTierAndModifier, createCharacterAttributes } from '../src';

describe('Attribute Validation', () => {
  describe('validateTierModifier', () => {
    it('should validate valid tier and modifier combinations', () => {
      const result1 = validateTierModifier('Common', 3);
      expect(result1.success).toBe(true);
      
      const result2 = validateTierModifier('Deficit', 0);
      expect(result2.success).toBe(true);
      
      const result3 = validateTierModifier('Legendary', 6);
      expect(result3.success).toBe(true);
    });
    
    it('should reject invalid tier and modifier combinations', () => {
      const result1 = validateTierModifier('Legendary', 7); // exceeds max level 30
      expect(result1.success).toBe(false);
      
      const result2 = validateTierModifier('Deficit', -1); // below min level 0
      expect(result2.success).toBe(false);
      
      const result3 = validateTierModifier('NonExistentTier' as any, 3);
      expect(result3.success).toBe(false);
    });
  });

  describe('validateAttributeLevel', () => {
    it('should validate valid attribute levels', () => {
      const result1 = validateAttributeLevel(0);
      expect(result1.success).toBe(true);
      
      const result2 = validateAttributeLevel(15);
      expect(result2.success).toBe(true);
      
      const result3 = validateAttributeLevel(30);
      expect(result3.success).toBe(true);
    });
    
    it('should reject invalid attribute levels', () => {
      const result1 = validateAttributeLevel(-1);
      expect(result1.success).toBe(false);
      
      const result2 = validateAttributeLevel(31);
      expect(result2.success).toBe(false);
      
      const result3 = validateAttributeLevel(3.5);
      expect(result3.success).toBe(false);
    });
  });

  describe('validateAttributeLevelForTier', () => {
    it('should validate levels within their tier range', () => {
      // Deficit tier (0-3)
      const result1 = validateAttributeLevelForTier('Deficit', 0);
      expect(result1.success).toBe(true);
      
      const result2 = validateAttributeLevelForTier('Deficit', 3);
      expect(result2.success).toBe(true);
      
      // Common tier (8-11)
      const result3 = validateAttributeLevelForTier('Common', 8);
      expect(result3.success).toBe(true);
      
      const result4 = validateAttributeLevelForTier('Common', 11);
      expect(result4.success).toBe(true);
    });
    
    it('should reject levels outside their tier range', () => {
      // Deficit tier (0-3)
      const result1 = validateAttributeLevelForTier('Deficit', 4);
      expect(result1.success).toBe(false);
      
      // Common tier (8-11)
      const result2 = validateAttributeLevelForTier('Common', 7);
      expect(result2.success).toBe(false);
      
      const result3 = validateAttributeLevelForTier('Common', 12);
      expect(result3.success).toBe(false);
    });
    
    it('should reject invalid tier names', () => {
      const result = validateAttributeLevelForTier('InvalidTier', 5);
      expect(result.success).toBe(false);
    });
  });

  describe('AttributeSchema', () => {
    it('should validate attributes created with combineTierAndModifier', () => {
      const attribute = combineTierAndModifier('Common', 3);
      expect(attribute).toBeDefined();
      
      if (attribute) {
        const result = AttributeSchema.safeParse(attribute);
        expect(result.success).toBe(true);
      }
    });
  });

  describe('Integration with combineTierAndModifier', () => {
    it('should validate the same edge cases as combineTierAndModifier', () => {
      // Test boundary cases
      const maxLevelResult = validateTierModifier('Legendary', 6);
      expect(maxLevelResult.success).toBe(true);
      const maxLevelAttr = combineTierAndModifier('Legendary', 6);
      expect(maxLevelAttr).toBeDefined();
      
      const minLevelResult = validateTierModifier('Deficit', 0);
      expect(minLevelResult.success).toBe(true);
      const minLevelAttr = combineTierAndModifier('Deficit', 0);
      expect(minLevelAttr).toBeDefined();
      
      // Test invalid cases
      const exceedMaxResult = validateTierModifier('Legendary', 7);
      expect(exceedMaxResult.success).toBe(false);
      const exceedMaxAttr = combineTierAndModifier('Legendary', 7);
      expect(exceedMaxAttr).toBeUndefined();
      
      const belowMinResult = validateTierModifier('Deficit', -1);
      expect(belowMinResult.success).toBe(false);
      const belowMinAttr = combineTierAndModifier('Deficit', -1);
      expect(belowMinAttr).toBeUndefined();
      
      // Test cross-tier cases
      const crossTierResult = validateTierModifier('Common', 4); // level 12, in Exceptional range
      expect(crossTierResult.success).toBe(true);
      const crossTierAttr = combineTierAndModifier('Common', 4);
      expect(crossTierAttr).toBeDefined();
    });
  });

  describe('getTierForAttributeLevel', () => {
    it('should return the correct tier for a given attribute level', () => {
      expect(getTierForAttributeLevel(0)).toBe('Deficit');
      expect(getTierForAttributeLevel(4)).toBe('Poor');
      expect(getTierForAttributeLevel(8)).toBe('Common');
      expect(getTierForAttributeLevel(12)).toBe('Exceptional');
      expect(getTierForAttributeLevel(16)).toBe('Remarkable');
      expect(getTierForAttributeLevel(20)).toBe('Heroic');
      expect(getTierForAttributeLevel(24)).toBe('Legendary');
      
      // Boundary cases
      expect(getTierForAttributeLevel(3)).toBe('Deficit');
      expect(getTierForAttributeLevel(7)).toBe('Poor');
      expect(getTierForAttributeLevel(11)).toBe('Common');
      expect(getTierForAttributeLevel(15)).toBe('Exceptional');
      expect(getTierForAttributeLevel(19)).toBe('Remarkable');
      expect(getTierForAttributeLevel(23)).toBe('Heroic');
      expect(getTierForAttributeLevel(30)).toBe('Legendary');
    });
    
    it('should return undefined for invalid attribute levels', () => {
      expect(getTierForAttributeLevel(-1)).toBeUndefined();
      expect(getTierForAttributeLevel(31)).toBeUndefined();
      expect(getTierForAttributeLevel(3.5)).toBeUndefined();
    });
  });
  
  describe('validateAttribute', () => {
    it('should validate valid attributes', () => {
      const attribute = combineTierAndModifier('Common', 3);
      expect(attribute).toBeDefined();
      
      if (attribute) {
        const result = validateAttribute(attribute);
        expect(result.success).toBe(true);
      }
    });
    
    it('should reject invalid attributes', () => {
      const invalidAttribute = {
        d10: -1,
        threshold: 0,
        pool: -1,
        statistics: -1,
        defense: 'not a number'
      };
      
      const result = validateAttribute(invalidAttribute as any);
      expect(result.success).toBe(false);
    });
  });
  
  describe('validateCharacterAttributes', () => {
    it('should validate valid character attributes', () => {
      const strength = combineTierAndModifier('Common', 3);
      const endurance = combineTierAndModifier('Poor', 2);
      const coordination = combineTierAndModifier('Exceptional', 0);
      const quickness = combineTierAndModifier('Common', 1);
      const willpower = combineTierAndModifier('Remarkable', 1);
      const intellect = combineTierAndModifier('Heroic', 0);
      const charisma = combineTierAndModifier('Deficit', 3);
      const sensitivity = combineTierAndModifier('Legendary', 0);
      
      if (strength && endurance && coordination && quickness && willpower && intellect && charisma && sensitivity) {
        const characterAttributes = createCharacterAttributes(
          strength, endurance, coordination, quickness, willpower, intellect, charisma, sensitivity
        );
        
        const result = validateCharacterAttributes(characterAttributes);
        expect(result.success).toBe(true);
      }
    });
    
    it('should reject invalid character attributes', () => {
      const invalidAttributes = {
        strength: { d10: -1, threshold: 0, pool: -1, statistics: -1, defense: 'not a number' },
        endurance: { d10: 5, threshold: 5, pool: 5, statistics: 5, defense: 5 },
        coordination: { d10: 5, threshold: 5, pool: 5, statistics: 5, defense: 5 },
        quickness: { d10: 5, threshold: 5, pool: 5, statistics: 5, defense: 5 },
        willpower: { d10: 5, threshold: 5, pool: 5, statistics: 5, defense: 5 },
        intellect: { d10: 5, threshold: 5, pool: 5, statistics: 5, defense: 5 },
        charisma: { d10: 5, threshold: 5, pool: 5, statistics: 5, defense: 5 },
        sensitivity: { d10: 5, threshold: 5, pool: 5, statistics: 5, defense: 5 }
      };
      
      const result = validateCharacterAttributes(invalidAttributes as any);
      expect(result.success).toBe(false);
    });
  });
});
