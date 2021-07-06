import * as fromHit from '../hit.actions';

describe('loadHits', () => {
  it('should return an action', () => {
    expect(fromHit.loadHits().type).toBe('[Hit] Load Hits');
  });
});
