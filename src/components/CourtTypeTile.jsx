import React from "react";

const CourtTypeTile = ({
  className,
  id,
  imageNode,
  sortPoints,
  text,
  textClassName,
  url
}) => (
  <div onClick={() => sortPoints(id)} id={id} className={className}>
    {imageNode == null ? (
      <span className="keyValue">
        <img src={url} alt={id} />
      </span>
    ) : (
      imageNode
    )}
    <span className={textClassName}>{text}</span>
  </div>
);

export default CourtTypeTile;
