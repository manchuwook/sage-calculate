const {
  buildCompleteSkillList,
  getAllSkillNames,
  getAllFocusNames,
  getSkillToFocusMapping,
  getSkillsByType,
  getSkillTemplate,
  getSkillTemplatesByType,
  getSkillTemplatesByAttribute
} = require('../');

// Get a complete list of skills with default attribute values (d10=0, threshold=0)
const defaultSkills = buildCompleteSkillList();
console.log('Complete skill list count:', defaultSkills.length);
console.log('First skill example:', defaultSkills[0]);

// Get a complete list of skills with custom attribute values
const customSkills = buildCompleteSkillList(2, 6);
console.log('\nCustom skill example with d10=2, threshold=6:');
console.log(customSkills[0]);

// Get all skill names
const skillNames = getAllSkillNames();
console.log('\nAll skill names:', skillNames);

// Get all focus names
const focusNames = getAllFocusNames();
console.log('\nAll focus names count:', focusNames.length);
console.log('First 5 focus names:', focusNames.slice(0, 5));

// Get mapping of skills to their focus options
const skillToFocusMap = getSkillToFocusMapping();
console.log('\nFocus options for Swords:', skillToFocusMap['Swords']);

// Get skills by type
const skillsByType = getSkillsByType();
console.log('\nMelee skills:', skillsByType['Melee']);
console.log('Magic skills:', skillsByType['Magic']);

// Get a specific skill template
const swordsTemplate = getSkillTemplate('Swords');
console.log('\nSwords template:', swordsTemplate);

// Get skill templates by type
const meleeTemplates = getSkillTemplatesByType('Melee');
console.log('\nMelee templates count:', meleeTemplates.length);

// Get skill templates by attribute
const charismaTemplates = getSkillTemplatesByAttribute('Charisma');
console.log('\nSkills using Charisma:', charismaTemplates.map(t => t.name));
