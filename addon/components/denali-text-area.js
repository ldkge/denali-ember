/**
 * Copyright 2020, Verizon Media
 * Licensed under the terms of the MIT license. See accompanying LICENSE.md file for terms.
 */
import Component from '@glimmer/component';
import { arg } from 'ember-arg-types';
import { oneOf, string } from 'prop-types';

const states = ['active', 'error'];

export default class DenaliTextAreaComponent extends Component {
  @arg(oneOf(states)) state;
  @arg(string) errorMsg;

  get activeClass() {
    return this.state === 'active' ? 'is-active' : undefined;
  }

  get errorClass() {
    return this.state === 'error' ? 'is-error' : undefined;
  }
}
