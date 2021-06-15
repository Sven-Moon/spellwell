import * as fromEnemy from '../enemy.actions';

describe('loadEnemys', () => {
  it('should return an action', () => {
    expect(fromEnemy.loadEnemys().type).toBe('[Enemy] Load Enemys');
  });
});
