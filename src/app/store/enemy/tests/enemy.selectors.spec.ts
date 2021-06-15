import * as fromEnemy from '../enemy.reducer';
import { selectEnemyState } from '../enemy.selectors';

describe('Enemy Selectors', () => {
  it('should select the feature state', () => {
    const result = selectEnemyState({
      [fromEnemy.enemyFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
