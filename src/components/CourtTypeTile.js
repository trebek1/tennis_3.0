// @flow

import React from 'react';

import type { TennisEntity } from '../types';

const CourtTypeTile = ({
  className,
  id,
  imageNode,
  sortPoints,
  text,
  url,
}: TennisEntity) => (
  <div className={className} id={id} onClick={() => sortPoints(id)}>
    {imageNode == null ? (
      <span className="keyValue">
        <img alt={id} src={url} />
      </span>
    ) : (
      imageNode
    )}
    <span className="keyValue leftSpace">{text}</span>
  </div>
);

export default CourtTypeTile;
