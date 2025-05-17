/**
 * Interface representing an attribute
 */
export interface Attribute {
  readonly d10: number;
  readonly threshold: number;
  readonly pool: number;
  readonly statistics: number;
  readonly defense: number;
}

/**
 * Interface representing character attributes
 */
export interface CharacterAttributes {
  readonly strength: Attribute;
  readonly endurance: Attribute;
  readonly coordination: Attribute;
  readonly quickness: Attribute;
  readonly willpower: Attribute;
  readonly intellect: Attribute;
  readonly charisma: Attribute;
  readonly sensitivity: Attribute;
}

/**
 * Interface representing character pools
 */
export interface Pools {
  readonly actionPool: number;
  readonly reservePool: number;
  readonly lifePool: number;
  readonly fatePool: number;
}

/**
 * Interface representing body statistics
 */
export interface BodyStats {
  readonly hB: number; // half body
  readonly B: number;  // body
  readonly xB: number; // extra body
  readonly DB: number; // double body
}

/**
 * Interface representing magic statistics
 */
export interface MagicStats {
  readonly hM: number; // half magic
  readonly M: number;  // magic
  readonly xM: number; // extra magic
  readonly DM: number; // double magic
}

/**
 * Interface representing movement
 */
export interface MovementStats {
  readonly advance: number;
  readonly hustle: number;
  readonly dash: number;
  readonly sprint: number;
}

/**
 * Interface representing character statistics
 */
export interface Statistics {
  readonly bodyPower: number;
  readonly bodyStatistics: BodyStats;
  readonly magicPower: number;
  readonly magicStatistics: MagicStats;
  readonly reflexes: number;
  readonly speed: number;
  readonly movement: MovementStats;
  readonly stability: number;
}

/**
 * Interface representing defenses
 */
export interface Defenses {
  readonly awareness: number;
  readonly body: number;
  readonly evasion: number;
  readonly grit: number;
  readonly spirit: number;
}

/**
 * Available training levels for skills
 */
export enum TrainingLevel {
  Untrained = 'Untrained',
  Cursory = 'Cursory',
  Skilled = 'Skilled',
  Adept = 'Adept',
  Expert = 'Expert'
}

/**
 * Interface for skill training metadata
 */
export interface SkillTrainingData {
  readonly level: TrainingLevel;
  readonly bonusD10: number;
  readonly maxFocusLevel: number;
}

/**
 * Interface for focus option
 */
export interface FocusOption {
  readonly focus: string;
  readonly d10: number;
  readonly threshold: number;
  readonly focusLevel: number;
}

/**
 * Interface representing a skill
 */
export interface Skill {
  readonly name: string;
  readonly attribute: string;
  readonly type: string;
  readonly attributeValue: number;
  readonly attributeThreshold: number;
  readonly skillTraining: TrainingLevel;
  readonly focusOptions: FocusOption[];
  readonly baseAttributeValue: number;
}

/**
 * Interface representing a character
 */
export interface Character {
  readonly attributes: CharacterAttributes;
  readonly pools: Pools;
  readonly statistics: Statistics;
  readonly defenses: Defenses;
  readonly skills: Skill[];
}

/**
 * Interface representing an attribute tier
 */
export interface AttributeTier {
  readonly name: string;
  readonly baseValue: number;
}

/**
 * Interface representing attribute modifier data
 */
export interface AttributeModifierData {
  readonly attributeLevel: number;
  readonly d10: number;
  readonly defense: number;
  readonly pool: number;
  readonly statistics: number;
  readonly threshold: number;
}
