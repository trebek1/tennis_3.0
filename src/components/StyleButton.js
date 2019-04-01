// @flow strict-local

import * as React from 'react';

type Props = {|
  active: string,
  className: string,
  id: string,
  handleClick: (active: string) => void,
  text: string,
|};

const StyleButton = ({
  active,
  className,
  handleClick,
  id,
  text,
}: Props): React.Node => (
  <span
    className={`${className} ${id === active ? 'active' : ''}`}
    key={text}
    onClick={() => handleClick(id)}
  >
    {text}
  </span>
);

export default StyleButton;
