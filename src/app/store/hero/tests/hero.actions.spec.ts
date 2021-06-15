import * as fromHero from '../hero.actions';

describe('loadHeros', () => {
  it('should return an action', () => {
    expect(fromHero.loadHeros().type).toBe('[Hero] Load Heros');
  });
});
