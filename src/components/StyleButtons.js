// @flow strict-local

import React, { Component } from 'react';
import ButtonPannelConfig from '../constants/buttonPannelConfig';
import StyleButton from './StyleButton';
import SimpleMenu from './SimpleMenu';

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

  isMobile = (): boolean =>
    window.innerWidth <= 800 && window.innerHeight <= 800;

  render() {
    const { active } = this.state;
    return (
      <div>
        {this.isMobile() ? (
          <SimpleMenu
            config={ButtonPannelConfig}
            sortPoints={this.handleClick}
            title="Style"
          />
        ) : (
          <div id="styleContainer">
            <span className="anchor">Styles:</span>
            {Object.keys(ButtonPannelConfig).map(button => {
              const { className, clickText, text } = ButtonPannelConfig[button];
              return (
                <StyleButton
                  active={active}
                  className={className}
                  clickText={clickText}
                  handleClick={this.handleClick}
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
