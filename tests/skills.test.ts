import { describe, it, expect } from 'vitest';
import { 
  buildCompleteSkillList,
  getAllSkillNames,
  getAllFocusNames,
  getSkillToFocusMapping,
  getSkillsByType,
  TrainingLevel
} from '../src';
import { 
  getSkillTemplate,
  getSkillTemplatesByType,
  getSkillTemplatesByAttribute
} from '../src/core/skillTemplates';

describe('Skills System', () => {
  describe('buildCompleteSkillList', () => {
    it('should build a complete list of skills with default values', () => {
      const defaultSkills = buildCompleteSkillList();
      expect(defaultSkills).toBeDefined();
      expect(defaultSkills.length).toBeGreaterThan(0);
      
      // Check first skill has expected default values
      const firstSkill = defaultSkills[0];
      expect(firstSkill.attributeValue).toBe(0);
      expect(firstSkill.attributeThreshold).toBe(0);
      expect(firstSkill.baseAttributeValue).toBe(0);
      expect(firstSkill.skillTraining).toBe(TrainingLevel.Untrained);
    });

    it('should build skills with custom attribute values', () => {
      const customSkills = buildCompleteSkillList(2, 6);
      expect(customSkills).toBeDefined();
      
      // Check custom values are properly applied
      const firstSkill = customSkills[0];
      expect(firstSkill.attributeValue).toBe(2);
      expect(firstSkill.attributeThreshold).toBe(6);
      expect(firstSkill.baseAttributeValue).toBe(2);
      expect(firstSkill.focusOptions[0].d10).toBe(2); // Should have d10 = attribute value
      expect(firstSkill.focusOptions[0].threshold).toBe(6); // Should match threshold
    });
  });

  describe('getAllSkillNames', () => {
    it('should return a list of all skill names', () => {
      const skillNames = getAllSkillNames();
      expect(skillNames).toBeDefined();
      expect(Array.isArray(skillNames)).toBe(true);
      expect(skillNames.length).toBeGreaterThan(0);
      
      // Some expected skills should be in the list
      expect(skillNames).toContain('Swords');
      expect(skillNames).toContain('Axiomatic Magic');
      expect(skillNames).toContain('Blood Magic');
    });
  });

  describe('getAllFocusNames', () => {
    it('should return a list of all focus names', () => {
      const focusNames = getAllFocusNames();
      expect(focusNames).toBeDefined();
      expect(Array.isArray(focusNames)).toBe(true);
      expect(focusNames.length).toBeGreaterThan(0);
      
      // Should include some expected focus names
      expect(focusNames).toContain('Cut'); // From Swords
      expect(focusNames).toContain('Thrust'); // From Swords
      expect(focusNames).toContain('Formulae'); // From Axiomatic Magic
    });
  });

  describe('getSkillToFocusMapping', () => {
    it('should return a mapping of skills to their focus options', () => {
      const skillToFocusMap = getSkillToFocusMapping();
      expect(skillToFocusMap).toBeDefined();
      
      // Check specific skill mappings
      expect(skillToFocusMap['Swords']).toEqual(['Cut', 'Thrust']);
      expect(skillToFocusMap['Blood Magic']).toEqual(['Inherited', 'Morphic']);
    });
  });

  describe('getSkillsByType', () => {
    it('should return skills organized by type', () => {
      const skillsByType = getSkillsByType();
      expect(skillsByType).toBeDefined();
      
      // Check specific skill type categories
      expect(skillsByType['Melee']).toBeDefined();
      expect(skillsByType['Magic']).toBeDefined();
      expect(skillsByType['Field']).toBeDefined();
      expect(skillsByType['Ranged']).toBeDefined();
      
      // Check contents of specific skill types
      expect(skillsByType['Melee']).toContain('Swords');
      expect(skillsByType['Magic']).toContain('Axiomatic Magic');
      expect(skillsByType['Magic']).toContain('Blood Magic');
      expect(skillsByType['Magic']).toContain('Focus Magic');
    });
  });

  describe('getSkillTemplate', () => {
    it('should return a specific skill template by name', () => {
      const swordsTemplate = getSkillTemplate('Swords');
      expect(swordsTemplate).toBeDefined();
      expect(swordsTemplate?.name).toBe('Swords');
      expect(swordsTemplate?.attribute).toBe('Coordination');
      expect(swordsTemplate?.type).toBe('Melee');
      expect(swordsTemplate?.focusOptions).toHaveLength(2);
      expect(swordsTemplate?.focusOptions[0].focus).toBe('Cut');
      expect(swordsTemplate?.focusOptions[1].focus).toBe('Thrust');
    });

    it('should return undefined for a non-existent skill template', () => {
      const nonExistentTemplate = getSkillTemplate('NonExistentSkill');
      expect(nonExistentTemplate).toBeUndefined();
    });
  });

  describe('getSkillTemplatesByType', () => {
    it('should return skill templates filtered by type', () => {
      const meleeTemplates = getSkillTemplatesByType('Melee');
      expect(meleeTemplates).toBeDefined();
      expect(meleeTemplates.length).toBeGreaterThan(0);
      
      // All returned templates should be of type Melee
      meleeTemplates.forEach(template => {
        expect(template.type).toBe('Melee');
      });

      // Check for expected Melee skills
      const meleeSkillNames = meleeTemplates.map(t => t.name);
      expect(meleeSkillNames).toContain('Swords');
    });
  });

  describe('getSkillTemplatesByAttribute', () => {
    it('should return skill templates filtered by attribute', () => {
      const charismaTemplates = getSkillTemplatesByAttribute('Charisma');
      expect(charismaTemplates).toBeDefined();
      expect(charismaTemplates.length).toBeGreaterThan(0);
      
      // All returned templates should use Charisma attribute
      charismaTemplates.forEach(template => {
        expect(template.attribute).toBe('Charisma');
      });

      // Check one of the skill names
      const charismaSkillNames = charismaTemplates.map(t => t.name);
      expect(charismaSkillNames).toContain('Command');
    });
  });
});
