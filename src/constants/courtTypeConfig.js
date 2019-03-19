// @flow strict-local

import React from 'react';

import Pins from './pins';

import type { TennisEntity } from '../types';

export default ({
  all: {
    className: 'key all',
    id: 'all',
    imageNode: (
      <span className="keyValue">
        <img src={Pins.redPin} alt="all" />
        <img src={Pins.bluePin} alt="all" />
        <img src={Pins.greenPin} alt="all" />
        <img src={Pins.yellowPin} alt="all" />
      </span>
    ),
    text: 'All Locations',
    url: null,
  },
  club: {
    className: 'key club',
    id: 'club',
    imageNode: null,
    text: 'Tennis Club',
    url: Pins.yellowPin,
  },
  court: {
    className: 'key court',
    id: 'court',
    imageNode: null,
    text: 'Public Tennis Court',
    url: Pins.greenPin,
  },
  other: {
    className: 'key other',
    id: 'other',
    imageNode: null,
    text: 'Other Facility',
    url: Pins.bluePin,
  },
  shop: {
    className: 'key shop',
    id: 'shop',
    imageNode: null,
    text: 'Tennis Shop',
    url: Pins.redPin,
  },
}: {
  [string]: TennisEntity,
});
