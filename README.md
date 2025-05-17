# sage-calculate

A pure functional TypeScript library for saga system calculations.

## Overview

This library extracts the calculation logic from saga-calculations into a separate, reusable module built with functional programming principles. It provides immutable data structures and pure functions for working with attributes, skills, defenses, pools, and statistics.

## Documentation

- [UI Integration Guide](./UI-INTEGRATION.md) - Guide for integrating with React, TanStack, and other UI frameworks

## Design Philosophy

- **Functional Programming**: Uses pure functions that don't rely on external state
- **Immutability**: All operations return new objects rather than modifying existing ones
- **Composability**: Functions can be combined using pipes and flows to create complex transformations
- **Type Safety**: Comprehensive TypeScript type definitions for better developer experience
- **Separation of Concerns**: Clear distinction between data and operations

## Installation

```bash
npm install sage-calculate
# or
yarn add sage-calculate
# or
pnpm add sage-calculate
```

## Basic Usage

```typescript
import { 
  combineTierAndModifier, 
  createCharacterAttributes, 
  characterBuilder 
} from 'sage-calculate';

// Create attributes from tiers and modifiers
const strength = combineTierAndModifier('Common', 3);
const endurance = combineTierAndModifier('Deficit', 4);
// ... create other attributes

// Build character attributes
const attributes = createCharacterAttributes(
  strength,
  endurance,
  // ... other attributes
);

// Build a character with attributes and specified skills
const character = characterBuilder(attributes)
  .withSkillTrainings([
    { skillName: 'Agility', level: 'Skilled' },
    { skillName: 'Athletics', level: 'Adept' }
  ])
  .withFocusLevels([
    { focusName: 'Acrobatics', level: 2 },
    { focusName: 'Prowess', level: 1 }
  ])
  .build();

// Access character properties
console.log(character.pools.actionPool);
console.log(character.defenses.body);
console.log(character.statistics.bodyStatistics.B);
```

## Functional Approach

The library supports functional patterns for data transformation:

```typescript
import { pipe } from 'sage-calculate/functional';
import { 
  createCharacter, 
  applySkillTrainings, 
  applyFocusLevels 
} from 'sage-calculate';

// Create a character by chaining operations
const character = pipe(
  attributes,
  createCharacter,
  char => applySkillTrainings(char, [
    { skillName: 'Stealth', level: 'Skilled' }
  ]),
  char => applyFocusLevels(char, [
    { focusName: 'Hide', level: 2 }
  ])
);
```

## Working with Generators

The library supports working with iterators and generators for data processing:

```typescript
import { calculateSkills, updateSkillTrainingInList } from 'sage-calculate';

// Create an array of skills
const skills = calculateSkills(attributeD10Values, attributeThresholdValues);

// Use generator to process skills
function* processSkills(skills) {
  for (const skill of skills) {
    if (skill.type === 'Magic') {
      yield skill;
    }
  }
}

// Create a generator of magic skills
const magicSkills = processSkills(skills);

// Iterate over the generator
for (const skill of magicSkills) {
  console.log(skill.name);
}
```

## Advanced Usage: Chaining

You can chain operations to perform complex transformations:

```typescript
import { flow } from 'sage-calculate/functional';
import { 
  updateSkillTraining, 
  updateFocusLevel 
} from 'sage-calculate';

// Create a transformation function
const enhanceAthleticsSkill = flow(
  (skill) => updateSkillTraining(skill, 'Adept'),
  (skill) => updateFocusLevel(skill, 'Prowess', 3)
);

// Apply the transformation to a skill
const enhancedSkill = enhanceAthleticsSkill(athleticsSkill);
```

## License

ISC
