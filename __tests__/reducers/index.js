import React, { Component } from "react";

import rootReducer from "../../src/reducers";
import { initialState as CourtState } from "../../src/reducers/courts";
import { initialState as StyleState } from "../../src/reducers/styles";
import { createStore } from "redux";

import { GET_COURTS } from "../../src/actions/courtActions";

import { oneCourt, twoCourts } from "../__fixtures__/CourtFixtures";

import {
  selectStyle,
  sortPoints,
  selectPoint
} from "../../src/actions/courtActions";

describe("the combined reducer ", () => {
  let store;
  beforeEach(() => {
    store = createStore(rootReducer);
  });
  it("populates the initial state of the stores ", () => {
    expect(store.getState().styles).toEqual(StyleState);
    expect(store.getState().courts).toBe(CourtState);
  });
  it("changes the style appropriately when a new style is passed ", () => {
    const NIGHT = "night";
    store.dispatch(selectStyle(NIGHT));
    expect(store.getState().styles).toEqual(NIGHT);
  });
  it("changes the style appropriately when a court is passed ", () => {
    const COURT_INDEX = 0;
    store.dispatch({ type: GET_COURTS, payload: [{ sfcourts: twoCourts }] });
    store.dispatch(selectPoint(COURT_INDEX));
    expect(store.getState().courts.sortedCourts[0]).toBe(twoCourts[0]);
  });
  it("changes sorts the points ", () => {
    const CLUB = "club";
    store.dispatch({ type: GET_COURTS, payload: [{ sfcourts: twoCourts }] });
    store.dispatch(sortPoints(CLUB));
    expect(store.getState().courts.sortedCourts.length).toBe(1);
  });
  it("sorts to the courts if an invalid court is passed ", () => {
    const NA = "null";
    store.dispatch({ type: GET_COURTS, payload: [{ sfcourts: twoCourts }] });
    store.dispatch(sortPoints(NA));
    expect(store.getState().courts.sortedCourts.length).toBe(2);
  });
});
