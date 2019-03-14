import React, { Component } from 'react';
import { func } from 'prop-types';
import CourtTypeTile from './CourtTypeTile';
import CourtTypeConfig from '../constants/courtTypeConfig';

const DEFAULT_SORT = 'all';

export default class SortByButtons extends Component {
  state = {
    sort: DEFAULT_SORT,
  };

  sortPoints = sort => {
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
        } = CourtTypeConfig[court];
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

SortByButtons.propTypes = {
  sortPoints: func.isRequired,
};
