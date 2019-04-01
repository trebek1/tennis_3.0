// @flow strict-local

import React, { Component } from 'react';
import SortButton from './SortButton';
import SimpleMenu from './SimpleMenu';

import type { TennisEntity } from '../types';

import { isMobile } from '../utils';

type Props = {|
  config: Object,
  default: string,
  select: (type: string) => { type: string, payload: string },
  title: string,
|};

type State = {|
  selection: string,
|};

export default class ButtonList extends Component<Props, State> {
  state = {
    selection: this.props.default,
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
          title={this.state.selection}
        />
      ) : (
        <div>
          <div className="anchor keyTitle">{this.props.title}</div>

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
              <SortButton
                className={`${className} ${
                  this.state.selection === id ? 'active' : ''
                }`}
                id={id}
                imageNode={imageNode}
                key={id}
                handleClick={this.selectOption}
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
