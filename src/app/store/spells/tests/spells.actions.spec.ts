import * as fromSpells from '../spells.actions';

describe('loadSpellss', () => {
  it('should return an action', () => {
    expect(fromSpells.loadSpellss().type).toBe('[Spells] Load Spellss');
  });
});
