import React from "react";

const CourtList = ({ courts, selectPoint, sort, sortPoints }) => {
  if (courts != null && courts.length > 0) {
    courts.sort((court, nextCourt) =>
      court.name.toUpperCase().localeCompare(nextCourt.name.toUpperCase())
    );
    return (
      <ul id="courtList">
        {courts.map((court, index) => (
          <li
            className="courtListItem"
            key={index}
            onClick={() => selectPoint(index)}
          >
            {court.name}
          </li>
        ))}
        {courts.length === 1 ? (
          <li
            className="courtListItem"
            onClick={() => {
              sortPoints(sort);
            }}
          >
            {"Return to Previous Map"}
          </li>
        ) : null}
      </ul>
    );
  }
  return null;
};

export default CourtList;
