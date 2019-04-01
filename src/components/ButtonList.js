// @flow strict-local

import React, { Component } from 'react';
import CourtTypeTile from './CourtTypeTile';
import CourtTypeConfig from '../constants/courtTypeConfig';
import SimpleMenu from './SimpleMenu';

import type { TennisEntity } from '../types';

import { isMobile } from '../utils';

const DEFAULT_SORT = 'all';

type Props = {|
  config: Object,
  select: (type: string) => { type: string, payload: string },
  title: string,
|};

type State = {|
  selection: string,
|};

export default class ButtonList extends Component<Props, State> {
  state = {
    selection: DEFAULT_SORT,
  };

  selectOption = (selection: string): void => {
    const { select } = this.props;
    select(selection);
    this.setState({
      selection,
    });
  };

  render = () => (
    <div>
      {isMobile() ? (
        <SimpleMenu
          config={this.props.config}
          sortPoints={this.selectOption}
          title={this.props.title}
        />
      ) : (
        <div>
          <span className="anchor keyTitle">Sort By Type:</span>

          {Object.keys(this.props.config).map(court => {
            const {
              className,
              id,
              imageNode,
              text,
              textClassName,
              url,
            }: TennisEntity = this.props.config[court];
            return (
              <CourtTypeTile
                className={`${className} ${
                  this.state.selection === id ? 'active' : ''
                }`}
                id={id}
                imageNode={imageNode}
                key={id}
                sortPoints={this.selectOption}
                text={text}
                textClassName={textClassName}
                url={url}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
