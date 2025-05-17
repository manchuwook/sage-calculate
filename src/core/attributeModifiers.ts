import { AttributeModifierData } from '../types';
import { z } from 'zod';

/**
 * Constant containing attribute modifiers data
 */

export const attributeModifiers: ReadonlyArray<AttributeModifierData> = [
  { attributeLevel: 0, d10: 1, defense: -1, pool: 0, statistics: 0, threshold: 10 },
  { attributeLevel: 1, d10: 2, defense: 0, pool: 0, statistics: 1, threshold: 9 },
  { attributeLevel: 2, d10: 2, defense: 0, pool: 1, statistics: 1, threshold: 8 },
  { attributeLevel: 3, d10: 3, defense: 1, pool: 1, statistics: 2, threshold: 7 },
  { attributeLevel: 4, d10: 4, defense: 2, pool: 2, statistics: 2, threshold: 6 },
  { attributeLevel: 5, d10: 4, defense: 2, pool: 3, statistics: 3, threshold: 6 },
  { attributeLevel: 6, d10: 5, defense: 3, pool: 3, statistics: 4, threshold: 6 },
  { attributeLevel: 7, d10: 5, defense: 3, pool: 4, statistics: 4, threshold: 6 },
  { attributeLevel: 8, d10: 5, defense: 3, pool: 4, statistics: 5, threshold: 5 },
  { attributeLevel: 9, d10: 6, defense: 4, pool: 4, statistics: 5, threshold: 5 },
  { attributeLevel: 10, d10: 6, defense: 4, pool: 5, statistics: 5, threshold: 5 },
  { attributeLevel: 11, d10: 7, defense: 5, pool: 5, statistics: 6, threshold: 5 },
  { attributeLevel: 12, d10: 7, defense: 5, pool: 6, statistics: 6, threshold: 4 },
  { attributeLevel: 13, d10: 8, defense: 6, pool: 6, statistics: 7, threshold: 4 },
  { attributeLevel: 14, d10: 8, defense: 6, pool: 7, statistics: 7, threshold: 4 },
  { attributeLevel: 15, d10: 9, defense: 7, pool: 7, statistics: 7, threshold: 4 },
  { attributeLevel: 16, d10: 9, defense: 7, pool: 8, statistics: 8, threshold: 4 },
  { attributeLevel: 17, d10: 10, defense: 8, pool: 8, statistics: 8, threshold: 3 },
  { attributeLevel: 18, d10: 10, defense: 8, pool: 9, statistics: 9, threshold: 3 },
  { attributeLevel: 19, d10: 11, defense: 9, pool: 9, statistics: 9, threshold: 3 },
  { attributeLevel: 20, d10: 11, defense: 9, pool: 10, statistics: 10, threshold: 3 },
  { attributeLevel: 21, d10: 12, defense: 10, pool: 10, statistics: 11, threshold: 3 },
  { attributeLevel: 22, d10: 12, defense: 10, pool: 11, statistics: 11, threshold: 3 },
  { attributeLevel: 23, d10: 13, defense: 11, pool: 11, statistics: 12, threshold: 2 },
  { attributeLevel: 24, d10: 13, defense: 11, pool: 12, statistics: 12, threshold: 2 },
  { attributeLevel: 25, d10: 14, defense: 12, pool: 12, statistics: 13, threshold: 2 },
  { attributeLevel: 26, d10: 14, defense: 12, pool: 13, statistics: 13, threshold: 2 },
  { attributeLevel: 27, d10: 15, defense: 13, pool: 13, statistics: 14, threshold: 2 },
  { attributeLevel: 28, d10: 15, defense: 13, pool: 14, statistics: 14, threshold: 2 },
  { attributeLevel: 29, d10: 16, defense: 14, pool: 14, statistics: 15, threshold: 2 },
  { attributeLevel: 30, d10: 16, defense: 14, pool: 15, statistics: 15, threshold: 2 },
] as const;

// Schema for a single attribute modifier entry
export const attributeModifierSchema = z.object({
  attributeLevel: z.number().int().nonnegative(),
  d10: z.number().int().positive(),
  defense: z.number().int(),
  pool: z.number().int().nonnegative(),
  statistics: z.number().int().nonnegative(),
  threshold: z.number().int().positive().lte(10)
});

// Schema for the entire array
export const attributeModifiersSchema = z.array(attributeModifierSchema).readonly();

// Type inference from the schema
export type AttributeModifierDataSchema = z.infer<typeof attributeModifierSchema>;
export type AttributeModifiersSchema = z.infer<typeof attributeModifiersSchema>;

// Validate that the const array matches the schema
attributeModifiersSchema.parse(attributeModifiers);
