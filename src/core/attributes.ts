import { pipe } from 'effect/Function';
import { map } from 'effect/Array';
import { AttributeModifierData, AttributeTier, Attribute } from '../types';
import { attributeModifiers } from './attributeModifiers';

/**
 * Constant containing attribute tiers data
 */
export const attributeTiers: ReadonlyArray<AttributeTier> = [
  { name: 'Deficit', baseValue: 0 },
  { name: 'Poor', baseValue: 4 },
  { name: 'Common', baseValue: 8 },
  { name: 'Exceptional', baseValue: 12 },
  { name: 'Remarkable', baseValue: 16 },
  { name: 'Heroic', baseValue: 20 },
  { name: 'Legendary', baseValue: 24 }
] as const;

/**
 * Retrieves an attribute modifier by level
 * 
 * @param level - The attribute level to find
 * @returns The attribute modifier or undefined if not found
 */
export const getAttributeByLevel = (
  level: number
): AttributeModifierData | undefined =>
  attributeModifiers.find(attr => attr.attributeLevel === level);

/**
 * Finds an attribute tier by its name
 * 
 * @param tierName - The name of the tier to find
 * @returns The attribute tier or undefined if not found
 */
export const getAttributeTierByName = (
  tierName: string
): AttributeTier | undefined =>
  attributeTiers.find(tier => tier.name === tierName);

/**
 * Combines a tier and modifier to create an attribute
 * 
 * @param tierName - The name of the attribute tier
 * @param modifier - The modifier value to add to the tier's base value
 * @returns An Attribute object with the combined values or undefined if tier not found
 */
export const combineTierAndModifier = (
  tierName: string,
  modifier: number
): Attribute | undefined => {
  const tier = getAttributeTierByName(tierName);
  if (!tier) return undefined;

  const attributeLevel = tier.baseValue + modifier;
  const attributeData = getAttributeByLevel(attributeLevel);

  if (!attributeData) return undefined;

  return {
    d10: attributeData.d10,
    threshold: attributeData.threshold,
    pool: attributeData.pool,
    statistics: attributeData.statistics,
    defense: attributeData.defense
  };
};

/**
 * Combines two attributes together
 * 
 * @param a - First attribute
 * @param b - Second attribute
 * @returns A new attribute with combined values
 */
export const combineAttributes = (a: Attribute, b: Attribute): Attribute => ({
  d10: a.d10 + b.d10,
  threshold: Math.min(a.threshold, b.threshold),
  pool: a.pool + b.pool,
  statistics: a.statistics + b.statistics,
  defense: a.defense + b.defense
});

/**
 * Extracts all d10 values from an array of attributes
 * 
 * @param attributes - An array of attributes
 * @returns An array of d10 values
 */
export const extractD10Values = (attributes: Attribute[]): number[] =>
  pipe(
    attributes,
    map((attr: Attribute): number => attr.d10)
  );

/**
 * Extracts all threshold values from an array of attributes
 * 
 * @param attributes - An array of attributes
 * @returns An array of threshold values
 */
export const extractThresholds = (attributes: Attribute[]): number[] =>
  pipe(
    attributes,
    map((attr: Attribute): number => attr.threshold)
  );

/**
 * Extracts all pool values from an array of attributes
 * 
 * @param attributes - An array of attributes
 * @returns An array of pool values
 */
export const extractPoolValues = (attributes: Attribute[]): number[] =>
  pipe(
    attributes,
    map((attr: Attribute): number => attr.pool)
  );

/**
 * Extracts all statistics values from an array of attributes
 * 
 * @param attributes - An array of attributes
 * @returns An array of statistics values
 */
export const extractStatistics = (attributes: Attribute[]): number[] =>
  pipe(
    attributes,
    map((attr: Attribute): number => attr.statistics)
  );

/**
 * Extracts all defense values from an array of attributes
 * 
 * @param attributes - An array of attributes
 * @returns An array of defense values
 */
export const extractDefenseValues = (attributes: Attribute[]): number[] =>
  pipe(
    attributes,
    map((attr: Attribute): number => attr.defense)
  );
