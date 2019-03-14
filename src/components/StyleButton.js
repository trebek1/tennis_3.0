// @flow strict-local

import * as React from 'react';

type Props = {|
  active: string,
  className: string,
  clickText: string,
  handleClick: (active: string) => void,
  text: string,
|};

const StyleButton = ({
  active,
  className,
  clickText,
  handleClick,
  text,
}: Props): React.Node => (
  <span
    className={`${className} ${clickText === active ? 'active' : ''}`}
    key={text}
    onClick={() => handleClick(clickText)}
  >
    {text}
  </span>
);

export default StyleButton;
