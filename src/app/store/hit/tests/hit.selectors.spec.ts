import * as fromHit from '../hit.reducer';
import { selectHitState } from '../hit.selectors';

describe('Hit Selectors', () => {
  it('should select the feature state', () => {
    const result = selectHitState({
      [fromHit.hitFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
