# Sage Calculate - UI Integration Guide

This document provides guidance for integrating the Sage Calculate library with UI frameworks like React or TanStack.

## Table of Contents

- [Core Concepts](#core-concepts)
- [API Reference for UI Integration](#api-reference-for-ui-integration)
- [React Integration Examples](#react-integration-examples)
- [TanStack Query Integration](#tanstack-query-integration) 
- [Form Validation](#form-validation)
- [Typeclass Integration](#typeclass-integration)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Core Concepts

### Attribute Tiers

Attributes in the system are organized into tiers, each with a base value:

| Tier Name   | Base Value |
|-------------|------------|
| Deficit     | 0          |
| Poor        | 4          |
| Common      | 8          |
| Exceptional | 12         |
| Remarkable  | 16         |
| Heroic      | 20         |
| Legendary   | 24         |

Each tier can receive modifiers that adjust the final attribute level. The system includes validations to ensure that combinations of tiers and modifiers result in valid attribute levels (between 0 and 30).

### Character Structure

A character consists of:
- Attributes (strength, endurance, etc.)
- Derived pools (action, reserve, life, fate)
- Statistics (body power, magic power, etc.)
- Defenses (awareness, body, evasion, etc.)
- Skills with training levels and focuses

## API Reference for UI Integration

### Key Types

#### `Attribute`

```typescript
interface Attribute {
  readonly d10: number;       // Die value
  readonly threshold: number; // Target number
  readonly pool: number;      // Resource pool contribution
  readonly statistics: number; // Statistics contribution
  readonly defense: number;   // Defense contribution
}
```

#### `CharacterAttributes`

```typescript
interface CharacterAttributes {
  readonly strength: Attribute;
  readonly endurance: Attribute;
  readonly coordination: Attribute;
  readonly quickness: Attribute;
  readonly willpower: Attribute;
  readonly intellect: Attribute;
  readonly charisma: Attribute;
  readonly sensitivity: Attribute;
}
```

#### `Character`

```typescript
interface Character {
  readonly attributes: CharacterAttributes;
  readonly pools: Pools;
  readonly statistics: Statistics;
  readonly defenses: Defenses;
  readonly skills: Skill[];
}
```

### Essential Functions

#### Creating Attributes

```typescript
// Create an attribute by combining a tier and modifier
const attribute = combineTierAndModifier('Common', 3);
```

#### Creating Character Attributes

```typescript
// From individual attribute objects
const characterAttributes = createCharacterAttributes(
  strength, endurance, coordination, quickness,
  willpower, intellect, charisma, sensitivity
);

// Or directly from tier names and modifiers
const characterAttributes = createCharacterAttributesFromTiers(
  'Common', 3,  // strength tier and modifier
  'Poor', 2,    // endurance tier and modifier
  // ...other attributes
);
```

#### Building a Character

```typescript
// Create a complete character
const character = createCharacter(characterAttributes);

// Or using the builder pattern
const character = characterBuilder(characterAttributes)
  .withSkillTrainings([
    { skillName: 'Agility', level: 'Skilled' },
    // ...other skill trainings
  ])
  .withFocusLevels([
    { skillName: 'Agility', focus: 'Acrobatics', level: 2 },
    // ...other focuses
  ])
  .build();
```

### Validation Functions

```typescript
// Validate a tier and modifier combination
const validation = validateTierModifier('Legendary', 6);
if (validation.success) {
  // Valid combination
}

// Check if an attribute level is valid for a specific tier
const tierValidation = validateAttributeLevelForTier('Common', 8);

// Get appropriate tier for a level
const tierName = getTierForAttributeLevel(15); // Returns 'Exceptional'

// Validate a complete character attributes object
const attributesValidation = validateCharacterAttributes(characterAttributes);
```

## React Integration Examples

### Attribute Selector Component

```tsx
import React, { useState } from 'react';
import { 
  combineTierAndModifier, 
  validateTierModifier, 
  TIER_NAMES 
} from 'sage-calculate';

const AttributeSelector = ({ name, onChange }) => {
  const [tier, setTier] = useState('Common');
  const [modifier, setModifier] = useState(0);
  const [error, setError] = useState('');
  
  const handleChange = (newTier, newModifier) => {
    const validation = validateTierModifier(newTier, newModifier);
    
    if (validation.success) {
      setError('');
      const attribute = combineTierAndModifier(newTier, newModifier);
      onChange(attribute);
    } else {
      setError('Invalid combination');
    }
  };
  
  return (
    <div className="attribute-selector">
      <label>{name}</label>
      <select 
        value={tier} 
        onChange={(e) => {
          setTier(e.target.value);
          handleChange(e.target.value, modifier);
        }}
      >
        {TIER_NAMES.map(t => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      
      <input 
        type="number"
        value={modifier}
        onChange={(e) => {
          const newMod = parseInt(e.target.value);
          setModifier(newMod);
          handleChange(tier, newMod);
        }}
      />
      
      {error && <div className="error">{error}</div>}
    </div>
  );
};
```

### Character Builder Component

```tsx
const CharacterBuilder = () => {
  const [attributes, setAttributes] = useState({
    strength: null,
    endurance: null,
    coordination: null,
    quickness: null,
    willpower: null,
    intellect: null,
    charisma: null,
    sensitivity: null
  });
  
  const [character, setCharacter] = useState(null);
  
  const updateAttribute = (name, value) => {
    setAttributes(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const buildCharacter = () => {
    // Check if all attributes are defined
    if (Object.values(attributes).every(attr => attr !== null)) {
      try {
        const charAttributes = createCharacterAttributes(
          attributes.strength,
          attributes.endurance,
          attributes.coordination,
          attributes.quickness,
          attributes.willpower,
          attributes.intellect,
          attributes.charisma,
          attributes.sensitivity
        );
        
        const char = createCharacter(charAttributes);
        setCharacter(char);
      } catch (error) {
        console.error("Character creation failed:", error);
      }
    }
  };
  
  return (
    <div>
      <h2>Character Builder</h2>
      
      <AttributeSelector 
        name="Strength" 
        onChange={(attr) => updateAttribute('strength', attr)} 
      />
      {/* Add other attributes similarly */}
      
      <button 
        onClick={buildCharacter}
        disabled={!Object.values(attributes).every(attr => attr !== null)}
      >
        Create Character
      </button>
      
      {character && (
        <CharacterSheet character={character} />
      )}
    </div>
  );
};
```

### Character Sheet Component

```tsx
const CharacterSheet = ({ character }) => {
  return (
    <div className="character-sheet">
      <h3>Character Stats</h3>
      
      <div className="attributes">
        <h4>Attributes</h4>
        <div>Strength: {character.attributes.strength.d10}</div>
        <div>Endurance: {character.attributes.endurance.d10}</div>
        {/* ...other attributes */}
      </div>
      
      <div className="pools">
        <h4>Pools</h4>
        <div>Action: {character.pools.actionPool}</div>
        <div>Reserve: {character.pools.reservePool}</div>
        <div>Life: {character.pools.lifePool}</div>
        <div>Fate: {character.pools.fatePool}</div>
      </div>
      
      <div className="defenses">
        <h4>Defenses</h4>
        <div>Body: {character.defenses.body}</div>
        <div>Evasion: {character.defenses.evasion}</div>
        <div>Awareness: {character.defenses.awareness}</div>
        <div>Grit: {character.defenses.grit}</div>
        <div>Spirit: {character.defenses.spirit}</div>
      </div>
      
      {/* Display skills */}
      <div className="skills">
        <h4>Skills</h4>
        {character.skills.map(skill => (
          <div key={skill.name} className="skill">
            <div>{skill.name} ({skill.skillTraining}): {skill.attributeValue}</div>
            {skill.focusOptions.length > 0 && (
              <div className="focuses">
                <h5>Focuses:</h5>
                {skill.focusOptions.map(focus => (
                  <div key={focus.focus}>
                    {focus.focus} ({focus.focusLevel}): {focus.d10}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
```

## TanStack Query Integration

```typescript
import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';
import { 
  createCharacter, 
  createCharacterAttributesFromTiers,
  validateCharacterAttributes
} from 'sage-calculate';

// Example API functions
const api = {
  fetchCharacter: async (id) => {
    const response = await fetch(`/api/characters/${id}`);
    return response.json();
  },
  saveCharacter: async (character) => {
    const response = await fetch('/api/characters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(character)
    });
    return response.json();
  }
};

// Custom hook to fetch a character
export function useCharacter(id) {
  return useQuery({
    queryKey: ['character', id],
    queryFn: () => api.fetchCharacter(id)
  });
}

// Custom hook to create and save a character
export function useCreateCharacter(queryClient) {
  return useMutation({
    mutationFn: (attributeData) => {
      // Create character attributes from tiers and modifiers
      const attributes = createCharacterAttributesFromTiers(
        attributeData.strengthTier,
        attributeData.strengthMod,
        // ...other attributes
      );
      
      // Validate the attributes
      const validation = validateCharacterAttributes(attributes);
      if (!validation.success) {
        throw new Error('Invalid character attributes');
      }
      
      // Create the character
      const character = createCharacter(attributes);
      
      // Save to API
      return api.saveCharacter(character);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['characters'] });
    }
  });
}
```

## Form Validation

### With React Hook Form and Zod

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  TierModifierCombinationSchema,
  createCharacterAttributesFromTiers 
} from 'sage-calculate';
import { z } from 'zod';

// Create a schema for the form
const characterFormSchema = z.object({
  strengthTier: z.string(),
  strengthMod: z.number(),
  enduranceTier: z.string(),
  enduranceMod: z.number(),
  // ...other attributes...
}).refine(data => {
  // Custom validation to check all tier/modifier combinations
  const tierModCombinations = [
    { tierName: data.strengthTier, modifier: data.strengthMod },
    { tierName: data.enduranceTier, modifier: data.enduranceMod },
    // ...other attributes...
  ];
  
  return tierModCombinations.every(combo => 
    TierModifierCombinationSchema.safeParse(combo).success
  );
}, {
  message: "One or more attribute combinations are invalid"
});

function CharacterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(characterFormSchema)
  });
  
  const onSubmit = (data) => {
    // Create character using form data
    const attributes = createCharacterAttributesFromTiers(
      data.strengthTier,
      data.strengthMod,
      data.enduranceTier,
      data.enduranceMod,
      // ...other attributes...
    );
    
    // Do something with the attributes
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

## Typeclass Integration

The library leverages Effect's typeclass system to provide composable operations on domain types. This is particularly useful when building UIs that need to handle complex data transformations.

### Character Modification Monoid

The library provides a monoid for character modifications that allows you to compose various changes to a character in a type-safe way.

```typescript
import { 
  characterModificationMonoid,
  CharacterModification 
} from 'sage-calculate';

// Create an empty modification
const emptyMod = characterModificationMonoid.empty;

// Add some skill trainings
const withSkills: CharacterModification = {
  skillTrainings: [
    { skillName: 'Agility', level: 'Skilled' },
    { skillName: 'Athletics', level: 'Adept' }
  ],
  focusLevels: []
};

// Add some focus levels
const withFocuses: CharacterModification = {
  skillTrainings: [],
  focusLevels: [
    { focusName: 'Acrobatics', level: 2 },
    { focusName: 'Prowess', level: 1 }
  ]
};

// Combine all modifications using the monoid
const allModifications = characterModificationMonoid.combine(
  characterModificationMonoid.combine(emptyMod, withSkills),
  withFocuses
);

// Now you can apply these modifications to a character
// This is what the characterBuilder does internally
```

### Using Typeclasses in React Components

```tsx
import React, { useState } from 'react';
import { 
  characterModificationMonoid,
  CharacterModification,
  createCharacter,
  applySkillTrainings,
  applyFocusLevels
} from 'sage-calculate';
import { pipe } from 'effect/Function';

function CharacterModifier({ character, onCharacterChange }) {
  const [modifications, setModifications] = useState<CharacterModification>(
    characterModificationMonoid.empty
  );
  
  const addSkillTraining = (skillName, level) => {
    const newMod = {
      skillTrainings: [{ skillName, level }],
      focusLevels: []
    };
    
    // Combine the new modification with existing ones
    const updatedMods = characterModificationMonoid.combine(
      modifications,
      newMod
    );
    
    setModifications(updatedMods);
    
    // Apply all modifications to the character
    const updatedCharacter = pipe(
      character,
      char => applySkillTrainings(char, updatedMods.skillTrainings),
      char => applyFocusLevels(char, updatedMods.focusLevels)
    );
    
    onCharacterChange(updatedCharacter);
  };
  
  const addFocusLevel = (focusName, level) => {
    const newMod = {
      skillTrainings: [],
      focusLevels: [{ focusName, level }]
    };
    
    const updatedMods = characterModificationMonoid.combine(
      modifications,
      newMod
    );
    
    setModifications(updatedMods);
    
    const updatedCharacter = pipe(
      character,
      char => applySkillTrainings(char, updatedMods.skillTrainings),
      char => applyFocusLevels(char, updatedMods.focusLevels)
    );
    
    onCharacterChange(updatedCharacter);
  };
  
  // Component rendering...
}
```

### Benefits of Typeclasses

1. **Composability**: Easily combine multiple modifications without side effects
2. **Type Safety**: Full TypeScript support ensures correct operations
3. **Predictability**: All operations follow mathematical laws ensuring consistent behavior
4. **Reusability**: The same patterns can be applied across different parts of your application

## Best Practices

1. **Validate Input Data**: Always validate tier and modifier combinations before creating attributes to prevent undefined results.

2. **Respect Immutability**: Never attempt to modify the objects returned by the library. Create new instances instead.

3. **Use Memoization**: When integrating with React, use `useMemo` for expensive calculations:
   ```tsx
   const character = useMemo(() => {
     if (!allAttributesValid) return null;
     return createCharacter(attributes);
   }, [attributes, allAttributesValid]);
   ```

4. **Separate UI State from Domain Logic**: Keep your React state separate from the character calculation logic to maintain a clear separation of concerns.

5. **Leverage Typeclasses**: Use the provided monoids and semigroups for composing operations, especially when building complex modifications to character data.

6. **Handle Edge Cases**: Gracefully handle undefined results that might occur when attribute combinations are invalid.

7. **Type Safety**: Leverage TypeScript types to catch errors at compile time rather than runtime.

## Troubleshooting

### Common Issues

1. **Undefined Attributes**
   - **Problem**: `combineTierAndModifier` returns undefined
   - **Solution**: Ensure the tier name is valid and the tier+modifier combination results in a level between 0-30

2. **Invalid Character Creation**
   - **Problem**: `createCharacter` fails or returns incorrect values
   - **Solution**: Verify all attributes are properly defined and valid

3. **React Re-rendering Issues**
   - **Problem**: Excessive re-rendering in React components
   - **Solution**: Use memoization (useMemo, useCallback) and ensure proper dependency arrays

4. **Form Validation Errors**
   - **Problem**: Validation passes but invalid characters are created
   - **Solution**: Add comprehensive validation using the Zod schemas provided by the library

### Debugging Tips

1. Use the validation functions before attempting to create objects:
   ```typescript
   const validation = validateTierModifier(tier, modifier);
   if (validation.success) {
     // Proceed with creation
   } else {
     console.error("Validation failed:", validation.error);
   }
   ```

2. Check tier ranges when values seem incorrect:
   ```typescript
   const tierForLevel = getTierForAttributeLevel(level);
   console.log(`Attribute level ${level} belongs to tier: ${tierForLevel}`);
   ```

3. Inspect the full character object structure in development tools to understand the calculated values.
