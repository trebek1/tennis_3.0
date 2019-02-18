import React from "react";

const CourtTypeTile = ({
  className,
  id,
  sortPoints,
  text,
  textClassName,
  url
}) => (
  <div onClick={() => sortPoints(id)} id={id} className={className}>
    <span className="keyValue">
      <img src={url} alt={id} />
    </span>
    <span className={textClassName}>{text}</span>
  </div>
);

export default CourtTypeTile;
