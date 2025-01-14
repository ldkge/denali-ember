/**
 * Copyright 2020, Verizon Media
 * Licensed under the terms of the MIT license. See accompanying LICENSE.md file for terms.
 */
import { arg } from 'ember-arg-types';
import { oneOf } from 'prop-types';
import Component from '@glimmer/component';
import { COLORS, SHADES, SIZES } from './denali-chip-enums';

export default class DenaliChipComponent extends Component {
  @arg(oneOf(SIZES))
  size;

  @arg(oneOf(COLORS))
  backgroundColor;

  @arg(oneOf(COLORS))
  textColor;

  @arg(oneOf(SHADES))
  backgroundShade = '500';

  @arg(oneOf(SHADES))
  textShade = '500';

  get sizeClass() {
    return this.size ? `is-${this.size}` : undefined;
  }

  get backgroundColorClass() {
    if (this.backgroundColor) {
      return `has-bg-${this.backgroundColor}-${this.backgroundShade}`;
    }

    return undefined;
  }

  get textColorClass() {
    if (this.textColor) {
      return `is-${this.textColor}-${this.textShade}`;
    }

    return undefined;
  }
}
