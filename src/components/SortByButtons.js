// @flow

import React, { Component } from 'react';
import { func } from 'prop-types';
import CourtTypeTile from './CourtTypeTile';
import CourtTypeConfig from '../constants/courtTypeConfig';

import type { TennisEntity } from '../types';

const DEFAULT_SORT = 'all';

type Props = {|
  sortPoints: (type: string) => { type: string, payload: string },
|};

type State = {|
  sort: string,
|};

export default class SortByButtons extends Component<Props, State> {
  state = {
    sort: DEFAULT_SORT,
  };

  sortPoints = (sort: string): void => {
    const { sortPoints } = this.props;
    sortPoints(sort);
    this.setState({
      sort,
    });
  };

  render = () => (
    <div>
      <span className="anchor keyTitle">Sort By Type:</span>

      {Object.keys(CourtTypeConfig).map(court => {
        const {
          className,
          id,
          imageNode,
          text,
          textClassName,
          url,
        }: TennisEntity = CourtTypeConfig[court];
        return (
          <CourtTypeTile
            className={`${className} ${
              this.state.sort === id ? 'activeSort' : ''
            }`}
            id={id}
            imageNode={imageNode}
            key={id}
            sortPoints={this.sortPoints}
            text={text}
            textClassName={textClassName}
            url={url}
          />
        );
      })}
    </div>
  );
}
