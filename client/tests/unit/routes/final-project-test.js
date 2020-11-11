import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | finalProject', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:final-project');
    assert.ok(route);
  });
});
