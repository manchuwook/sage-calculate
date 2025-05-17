import { z } from 'zod';
import { attributeModifiers } from '../core/attributeModifiers';
import { attributeTiers } from '../core/attributes';
import { Attribute, CharacterAttributes } from '../types';

// Define the minimum and maximum attribute levels from the attributeModifiers data
const MIN_ATTRIBUTE_LEVEL = attributeModifiers[0].attributeLevel; // Should be 0
const MAX_ATTRIBUTE_LEVEL = attributeModifiers[attributeModifiers.length - 1].attributeLevel; // Should be 30

// Create an array of valid attribute level values
const validAttributeLevels = attributeModifiers.map(attr => attr.attributeLevel);

// Define the attribute tier names
export const TIER_NAMES = [
  'Deficit', 
  'Poor', 
  'Common', 
  'Exceptional', 
  'Remarkable', 
  'Heroic', 
  'Legendary'
] as const;

// Define the attribute schema
export const AttributeSchema = z.object({
  d10: z.number().int().positive(),
  threshold: z.number().int().positive(),
  pool: z.number().int().nonnegative(),
  statistics: z.number().int().nonnegative(),
  defense: z.number().int()
});

// Define tier schema with validation
export const AttributeTierSchema = z.object({
  name: z.enum(TIER_NAMES),
  baseValue: z.number().int().nonnegative()
});

// Schema for attribute level validation
export const AttributeLevelSchema = z.number()
  .int()
  .refine(
    level => level >= MIN_ATTRIBUTE_LEVEL && level <= MAX_ATTRIBUTE_LEVEL,
    {
      message: `Attribute level must be between ${MIN_ATTRIBUTE_LEVEL} and ${MAX_ATTRIBUTE_LEVEL}`
    }
  )
  .refine(
    level => validAttributeLevels.includes(level),
    {
      message: `Attribute level must be one of the predefined levels: ${validAttributeLevels.join(', ')}`
    }
  );

// Schema for validating tier and modifier combinations
export const TierModifierCombinationSchema = z.object({
  tierName: z.enum(TIER_NAMES),
  modifier: z.number().int()
})
.refine(
  data => {
    const tier = attributeTiers.find(t => t.name === data.tierName);
    if (!tier) return false;
    
    const attributeLevel = tier.baseValue + data.modifier;
    return attributeLevel >= MIN_ATTRIBUTE_LEVEL && attributeLevel <= MAX_ATTRIBUTE_LEVEL;
  },
  {
    message: 'The combination of tier and modifier results in an invalid attribute level',
    path: ['modifier']
  }
);

// Define the CharacterAttributes schema
export const CharacterAttributesSchema = z.object({
  strength: AttributeSchema,
  endurance: AttributeSchema,
  coordination: AttributeSchema,
  quickness: AttributeSchema,
  willpower: AttributeSchema,
  intellect: AttributeSchema,
  charisma: AttributeSchema,
  sensitivity: AttributeSchema
});

// Validation function for tier and modifier
export function validateTierModifier(tierName: string, modifier: number) {
  const result = TierModifierCombinationSchema.safeParse({ tierName, modifier });
  return result;
}

// Validation function to check if attribute level is valid
export function validateAttributeLevel(level: number) {
  const result = AttributeLevelSchema.safeParse(level);
  return result;
}

// Function to validate if an attribute level is valid for a specific tier
export function validateAttributeLevelForTier(tierName: string, level: number) {
  // First, check if the tier exists
  const tier = attributeTiers.find(t => t.name === tierName);
  if (!tier) {
    return {
      success: false,
      error: new z.ZodError([
        {
          code: 'custom',
          path: ['tierName'],
          message: `${tierName} is not a valid tier name. Valid tiers are: ${attributeTiers.map(t => t.name).join(', ')}`
        }
      ])
    };
  }

  // Check if the level is valid for this tier
  const minLevel = tier.baseValue;
  let maxLevel;
  
  // Find the next tier to get the max level for this tier
  const tierIndex = attributeTiers.findIndex(t => t.name === tierName);
  if (tierIndex < attributeTiers.length - 1) {
    // If not the last tier, max is before the next tier starts
    maxLevel = attributeTiers[tierIndex + 1].baseValue - 1;
  } else {
    // If the last tier, max is the max attribute level
    maxLevel = MAX_ATTRIBUTE_LEVEL;
  }

  if (level < minLevel || level > maxLevel) {
    return {
      success: false,
      error: new z.ZodError([
        {
          code: 'custom',
          path: ['level'],
          message: `Level ${level} is outside the valid range for tier ${tierName} (${minLevel}-${maxLevel})`
        }
      ])
    };
  }

  return { success: true, data: { tierName, level } };
}

/**
 * Validates a complete character attributes set
 * @param attributes The character attributes to validate
 * @returns The validation result
 */
export function validateCharacterAttributes(attributes: CharacterAttributes) {
  return CharacterAttributesSchema.safeParse(attributes);
}

/**
 * Validates an attribute and ensures it's within valid ranges
 * @param attribute The attribute to validate
 * @returns The validation result
 */
export function validateAttribute(attribute: Attribute) {
  return AttributeSchema.safeParse(attribute);
}

/**
 * Get the tier name for a specific attribute level
 * @param level The attribute level
 * @returns The tier name or undefined if the level is invalid
 */
export function getTierForAttributeLevel(level: number): string | undefined {
  // First validate the level
  const validation = validateAttributeLevel(level);
  if (!validation.success) return undefined;
  
  // Find the appropriate tier
  for (let i = attributeTiers.length - 1; i >= 0; i--) {
    const tier = attributeTiers[i];
    if (level >= tier.baseValue) {
      return tier.name;
    }
  }
  
  return undefined;
}
