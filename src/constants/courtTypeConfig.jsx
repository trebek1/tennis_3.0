import React from "react";

export default {
  club: {
    className: "key club",
    id: "club",
    imageNode: null,
    text: "Tennis Club",
    url:
      "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|F8EC3B"
  },
  court: {
    className: "key court",
    id: "court",
    imageNode: null,
    text: "Public Tennis Court",
    url:
      "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|3BF83E"
  },
  shop: {
    className: "key shop",
    id: "shop",
    imageNode: null,
    text: "Tennis Shop",
    url:
      "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569"
  },
  other: {
    className: "key other",
    id: "other",
    imageNode: null,
    text: "Other Facility",
    url:
      "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|00ccff"
  },
  all: {
    className: "key all",
    id: "all",
    imageNode: (
      <span className="keyValue">
        <img
          src="http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|F8EC3B"
          alt="all"
        />
        <img
          src="http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|3BF83E"
          alt="all"
        />
        <img
          src="http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FE7569"
          alt="all"
        />
        <img
          src="http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|00ccff"
          alt="all"
        />
      </span>
    ),
    text: "All Locations",
    url: null
  }
};
