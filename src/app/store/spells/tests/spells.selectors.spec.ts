import * as fromSpells from '../spells.reducer';
import { selectSpellsState } from '../spells.selectors';

describe('Spells Selectors', () => {
  it('should select the feature state', () => {
    const result = selectSpellsState({
      [fromSpells.spellsFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
