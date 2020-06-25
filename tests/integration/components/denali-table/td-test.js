import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | denali-table/td', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<DenaliTable::Td />`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      <DenaliTable::Td>
        template block text
      </DenaliTable::Td>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });

  test('alignment', async function (assert) {
    assert.expect(4);

    await render(hbs`
        <DenaliTable::Td>
          template block text
        </DenaliTable::Td>
    `);

    assert.dom('.td').doesNotHaveClass('is-left', 'The td does not have the `is-left` class by default');
    assert.dom('.td').doesNotHaveClass('is-right', 'The td does not have the `is-right` class by default');

    this.set('alignContent', 'left');
    assert.dom('.td').hasClass('is-left', 'The td has the `is-left` class when alignContent is set to left');
    this.set('alignContent', 'right');
    assert.dom('.td').hasClass('is-right', 'The menu has the `is-right` class when alignContent is set to right');
  });
});
