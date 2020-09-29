import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, setupOnerror, findAll, click, fillIn, triggerKeyEvent } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { set } from '@ember/object';

module('Integration | Component | denali-multi-select', function (hooks) {
  setupRenderingTest(hooks);

  test('it requires options', async function (assert) {
    assert.expect(1);

    setupOnerror(function ({ message }) {
      assert.equal(
        message,
        'Failed prop type: The prop `selectedOptions` is marked as required in `DenaliMultiSelectComponent`, but its value is `undefined`.',
        'If @args() contains a PropType validator, an error will be thrown if the value is incorrect'
      );
    });
    await render(hbs`<DenaliMultiSelect />`);
  });

  test('it renders placeholder string', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <DenaliMultiSelect @options={{array "Item 1"}} @selectedOptions={{array }} @onChange={{this.onChange}} as |option|>
        {{option}}
      </DenaliMultiSelect>
    `);

    assert.dom('ul.multi-select__selections.has-arrow').exists('DenaliMultiSelect renders an wrapper ul');

    assert.deepEqual(
      findAll('.multi-select__selections-item').map((selection) => selection.textContent),
      ['Select Items'],
      'DenaliMultiSelect renders placeholder element'
    );
  });

  test('it renders custom placeholder string', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <DenaliMultiSelect @placeholder="Custom placeholder" @options={{array "Item 1"}} @selectedOptions={{array }} @onChange={{this.onChange}} as |option|>
        {{option}}
      </DenaliMultiSelect>
    `);

    assert.dom('ul.multi-select__selections.has-arrow').exists('DenaliMultiSelect renders an wrapper ul');

    assert.deepEqual(
      findAll('.multi-select__selections-item').map((selection) => selection.textContent),
      ['Custom placeholder'],
      'DenaliMultiSelect renders a custom placeholder element'
    );
  });

  test('it renders an option string', async function (assert) {
    assert.expect(2);

    await render(hbs`
      <DenaliMultiSelect @options={{array "Item 1"}} @onChange={{this.onChange}} as |option|>
        {{option}}
      </DenaliMultiSelect>
    `);

    await click('.multi-select__selections');

    assert.dom('.multi-select__dropdown').exists('Dropdown pane is rendered');

    assert.deepEqual(
      findAll('.multi-select__dropdown-option').map((option) => option.labels[0].textContent.trim()),
      ['Item 1'],
      'DenaliMultiSelect renders a string option element'
    );
  });

  test('it renders an option object', async function (assert) {
    assert.expect(2);

    set(this, 'onChange', (option) => {
      if (this.selected.includes(option)) {
        const index = this.selected.indexOf(option);
        this.selected.splice(index, 1);
        this.selected = [...this.selected];
      } else {
        this.selected = [...this.selected, option];
      }
    });

    await render(hbs`
      <DenaliMultiSelect @options={{array (hash text="Item 1")}} @onChange={{this.onChange}} as |option|>
        {{option.text}}
      </DenaliMultiSelect>
    `);

    await click('.multi-select__selections');

    assert.dom('.multi-select__dropdown').exists('Dropdown pane is rendered');

    assert.deepEqual(
      findAll('.multi-select__dropdown-option').map((option) => option.labels[0].textContent.trim()),
      ['Item 1'],
      'DenaliMultiSelect renders a object option element'
    );
  });

  test('it renders a selection', async function (assert) {
    assert.expect(2);

    set(this, 'selected', []);
    set(this, 'onChange', (option) => {
      if (this.selected.includes(option)) {
        const index = this.selected.indexOf(option);
        this.selected.splice(index, 1);
        set(this, 'selected', [...this.selected]);
      } else {
        set(this, 'selected', [...this.selected, option]);
      }
    });

    await render(hbs`
      <DenaliMultiSelect @options={{array "Item 1"}} @selectedOptions={{this.selected}} @onChange={{this.onChange}} as |option|>
        {{option}}
      </DenaliMultiSelect>
    `);

    await click('.multi-select__selections');

    assert.dom('.multi-select__dropdown').exists('Dropdown pane is rendered');

    await click('.multi-select__dropdown-option');

    assert.deepEqual(
      findAll('.multi-select__selections-item').map((selection) => selection.textContent.trim()),
      ['Item 1'],
      'DenaliMultiSelect renders selected element'
    );
  });

  test('it supports small size', async function (assert) {
    assert.expect(1);

    this.set('isSmall', 'true');
    await render(hbs`
      <DenaliMultiSelect @options={{array "Item 1"}} @isSmall={{this.isSmall}} as |option|>
        {{option}}
      </DenaliMultiSelect>
    `);

    assert
      .dom('div.multi-select')
      .hasClass('is-small', 'DenaliMultiSelect has a small size when `@isSmall` arg is set to true');
  });

  test('it supports inverse colors', async function (assert) {
    assert.expect(1);

    this.set('isInverse', 'true');
    await render(hbs`
      <DenaliMultiSelect @options={{array "Item 1"}} @isInverse={{this.isInverse}} as |option|>
        {{option}}
      </DenaliMultiSelect>
    `);

    assert
      .dom('div.multi-select')
      .hasClass('is-inverse', 'DenaliMultiSelect has inverse colors when `@isInverse` arg is set to true');
  });

  test('it searches for an element', async function (assert) {
    assert.expect(2);

    this.set('options', [{ text: 'Item 1' }, { text: 'Item 2' }, { text: 'Item 3' }]);
    this.set('isSearchEnabled', true);
    this.set('onSearch', (value) => {
      if (value?.length) {
        const filtered = this.options.filter((option) => option.text.toLowerCase().includes(value.toLowerCase()));
        set(this, 'options', filtered);
      } else if (value === '') {
        set(this, 'options', this.options);
      }
    });
    await render(hbs`
      <DenaliMultiSelect @options={{this.options}} @selectedOptions={{array }} @onChange={{this.onChange}} @isSearchEnabled={{this.isSearchEnabled}} @onSearch={{this.onSearch}} as |option|>
        {{option.text}}
      </DenaliMultiSelect>
    `);

    await click('.multi-select__selections');

    assert.deepEqual(
      findAll('.multi-select__dropdown-option').map((option) => option.labels[0].textContent.trim()),
      ['Item 1', 'Item 2', 'Item 3'],
      'DenaliMultiSelect renders selected element'
    );

    await fillIn('.multi-select__dropdown-search', 'item 2');
    await triggerKeyEvent('.multi-select__dropdown-search', 'keyup', 13);

    assert.deepEqual(
      findAll('.multi-select__dropdown-option').map((option) => option.labels[0].textContent.trim()),
      ['Item 2'],
      'DenaliMultiSelect renders a filtered option element'
    );
  });
});
