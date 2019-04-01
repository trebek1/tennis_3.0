// @flow strict-local

import React, { Component } from 'react';
import ButtonPannelConfig from '../constants/buttonPannelConfig';
import CourtTypeTile from './CourtTypeTile';
import SimpleMenu from './SimpleMenu';

import { isMobile } from '../utils';

const DEFAULT_ACTIVE = 'wimbledon';

type Props = {|
  selectStyle: (style: string) => { type: string, payload: string },
|};

type State = {
  active: string,
};

export default class StyleButtons extends Component<Props, State> {
  state: State = {
    active: DEFAULT_ACTIVE,
  };

  handleClick = (active: string): void => {
    this.props.selectStyle(active);
    this.setState({
      active,
    });
  };

  render() {
    const { active } = this.state;

    return (
      <div>
        {isMobile() ? (
          <SimpleMenu
            config={ButtonPannelConfig}
            sortPoints={this.handleClick}
            title={active || 'Style'}
          />
        ) : (
          <div id="styleContainer">
            <span className="anchor">Styles:</span>
            {Object.keys(ButtonPannelConfig).map(button => {
              const { className, id, text } = ButtonPannelConfig[button];
              return (
                <CourtTypeTile
                  active={active}
                  className={className}
                  handleClick={this.handleClick}
                  id={id}
                  key={text}
                  text={text}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
