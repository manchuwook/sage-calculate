import { BodyStats, MagicStats, MovementStats, Statistics } from '../types';

/**
 * Calculates body statistics based on a body power value
 * 
 * @param bodyPower - The body power value
 * @returns A BodyStats object with calculated values
 */
export const calculateBodyStats = (bodyPower: number): BodyStats => ({
  hB: Math.floor(bodyPower / 2),       // half body
  B: bodyPower,                         // body
  xB: Math.floor(bodyPower * 1.5),      // extra body
  DB: bodyPower * 2                     // double body
});

/**
 * Calculates magic statistics based on a magic power value
 * 
 * @param magicPower - The magic power value
 * @returns A MagicStats object with calculated values
 */
export const calculateMagicStats = (magicPower: number): MagicStats => ({
  hM: Math.floor(magicPower / 2),       // half magic
  M: magicPower,                         // magic
  xM: Math.floor(magicPower * 1.5),      // extra magic
  DM: magicPower * 2                     // double magic
});

/**
 * Calculates movement statistics based on a speed value
 * 
 * @param speed - The speed value
 * @returns A MovementStats object with calculated values
 */
export const calculateMovementStats = (speed: number): MovementStats => ({
  advance: speed + 1,
  hustle: (speed + 1) * 2,
  dash: (speed + 1) * 3,
  sprint: (speed + 1) * 4
});

/**
 * Calculates all statistics based on attribute statistics values
 * 
 * @param statisticsValues - Array of statistics values from attributes
 * @returns A Statistics object with all calculated values
 */
export const calculateStatistics = (statisticsValues: number[]): Statistics => {
  // Ensure we have at least 8 values, filling with 0 if necessary
  const values = [...statisticsValues, ...Array(8).fill(0)].slice(0, 8);
  
  // Calculate bodyPower from strength + endurance
  const bodyPower = values[0] + values[1];
  
  // Calculate reflexes from coordination + quickness
  const reflexes = values[2] + values[3];
  
  // Calculate speed from coordination + quickness
  const speed = Math.floor(reflexes / 2);
  
  // Calculate magicPower from willpower + intellect
  const magicPower = values[4] + values[5];
  
  // Calculate stability from endurance + willpower
  const stability = values[1] + values[4];
  
  return {
    bodyPower,
    bodyStatistics: calculateBodyStats(bodyPower),
    magicPower,
    magicStatistics: calculateMagicStats(magicPower),
    reflexes,
    speed,
    movement: calculateMovementStats(speed),
    stability
  };
};
