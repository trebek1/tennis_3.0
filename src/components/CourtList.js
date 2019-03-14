// @flow strict-local

import * as React from 'react';

import type { Court } from '../types';

type Props = {
  courts: Array<Court>,
  selectPoint: (index: number) => { type: string, payload: number },
  sort: string,
  sortPoints: (type: string) => { type: string, payload: string },
};

const CourtList = ({
  courts,
  selectPoint,
  sort,
  sortPoints,
}: Props): React.Node => {
  if (courts != null && courts.length > 0) {
    courts.sort((court, nextCourt) =>
      court.name.toUpperCase().localeCompare(nextCourt.name.toUpperCase())
    );
    return (
      <ul id="courtList">
        {courts.map((court, index) => (
          <li
            className="courtListItem"
            key={court.address}
            onClick={() => selectPoint(index)}
          >
            {court.name}
          </li>
        ))}
        {courts.length === 1 ? (
          <li
            className="courtListItem return"
            onClick={() => {
              sortPoints(sort);
            }}
          >
            {'Return to Previous Map'}
          </li>
        ) : null}
      </ul>
    );
  }
  return null;
};

export default CourtList;
