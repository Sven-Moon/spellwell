import * as fromHero from '../hero.reducer';
import { selectHeroState } from '../hero.selectors';

describe('Hero Selectors', () => {
  it('should select the feature state', () => {
    const result = selectHeroState({
      [fromHero.heroFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
