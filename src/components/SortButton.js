// @flow strict-local

import React from 'react';

import type { TennisEntity } from '../types';

const SortButton = ({
  active,
  className,
  id,
  imageNode = null,
  handleClick,
  text = null,
  url,
}: TennisEntity) => (
  <div
    className={`${className} ${id === active ? 'active' : ''}`}
    id={id}
    onClick={() => handleClick(id)}
  >
    {url && (
      <span className="keyValue">
        <img alt={id} src={url} />
      </span>
    )}
    {imageNode}
    <span className="keyValue leftSpace">{text}</span>
  </div>
);

export default SortButton;
