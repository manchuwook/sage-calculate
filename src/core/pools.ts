import { Pools } from '../types';

/**
 * Calculates pool values based on attribute pool values
 * 
 * @param poolValues - Array of pool values from attributes
 * @returns A Pools object with calculated values
 */
export const calculatePools = (poolValues: number[]): Pools => {
  // Ensure we have at least 8 values, filling with 0 if necessary
  const values = [...poolValues, ...Array(8).fill(0)].slice(0, 8);
  
  // Calculate lifePool from strength + endurance
  const lifePool = values[0] + values[1];
  
  // Calculate actionPool from coordination + quickness
  const actionPool = values[2] + values[3];
  
  // Calculate reservePool from willpower + intellect
  const reservePool = values[4] + values[5];
  
  // Calculate fatePool from charisma + sensitivity
  const fatePool = values[6] + values[7];
  
  return {
    actionPool,
    reservePool,
    lifePool,
    fatePool
  };
};
