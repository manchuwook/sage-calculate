import { Defenses } from '../types';

/**
 * Calculates defense values based on attribute defense values
 * 
 * @param defenseValues - Array of defense values from attributes
 * @returns A Defenses object with calculated values
 */
export const calculateDefenses = (defenseValues: number[]): Defenses => {
  // Ensure we have at least 8 values, filling with 0 if necessary
  const values = [...defenseValues, ...Array(8).fill(0)].slice(0, 8);
  
  // Calculate each defense from the appropriate attribute values
  // Strength (values[0]) and Endurance (values[1])
  const body = values[0] + values[1]; 
  const evasion = values[2] + values[3];
  const awareness = values[4];
  const grit = values[5];
  const spirit = values[6] + values[7];
  
  return {
    awareness,
    body,
    evasion,
    grit,
    spirit
  };
};
