import React from "react";

const CourtTypeTile = ({ className, id, imageNode, sortPoints, text, url }) => (
  <div onClick={() => sortPoints(id)} id={id} className={className}>
    {imageNode == null ? (
      <span className="keyValue">
        <img src={url} alt={id} />
      </span>
    ) : (
      imageNode
    )}
    <span className="keyValue leftSpace">{text}</span>
  </div>
);

export default CourtTypeTile;
