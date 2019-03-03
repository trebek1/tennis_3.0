import React from "react";
import { shallow, mount } from "enzyme";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import fetchMock from "fetch-mock";
import courtStyles from "../../src/constants/courtStyles";

import {
  GET_COURTS,
  SELECT_POINT,
  SELECT_STYLE,
  SORT_POINTS,
  UPDATE_SORT,
  getCourts,
  selectStyle,
  sortPoints,
  selectPoint,
  updateSort
} from "../../src/actions/courtActions";
import * as axios from "axios";

import { twoCourts } from "../__fixtures__/CourtFixtures";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Async court Action", () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it("Sets courts to store after fetching", async done => {
    const expectedResponse = { data: [{ sfcourts: twoCourts }] };
    const store = mockStore({});

    moxios.stubRequest("/courts", {
      response: expectedResponse,
      status: 201
    });

    await store.dispatch(getCourts()).then(() => {
      // store.getActions returns the stubbed response instead of
      // traversing the data layer that is done in the getCourts action
      expect(store.getActions()).toEqual([
        {
          payload: expectedResponse,
          type: GET_COURTS
        }
      ]);
    });
    done();
  });
});

describe("non async actions ", () => {
  describe("selectStyle", () => {
    it("should create an action to change the map style", () => {
      const { australia } = courtStyles;
      const expectedAction = {
        payload: australia,
        type: SELECT_STYLE
      };
      expect(selectStyle(australia)).toEqual(expectedAction);
    });
  });
  describe("sortPoints", () => {
    it("should create an action to sort the points to show on the map", () => {
      const sort = "all";
      const expectedAction = {
        payload: sort,
        type: SORT_POINTS
      };
      expect(sortPoints(sort)).toEqual(expectedAction);
    });
  });
  describe("selectPoint", () => {
    it("should create an action to select a point for the map", () => {
      const index = 10;
      const expectedAction = {
        payload: index,
        type: SELECT_POINT
      };
      expect(selectPoint(index)).toEqual(expectedAction);
    });
  });
  describe("updateSort", () => {
    it("should create an action to update the sort of points on the map", () => {
      const sort = "all";
      const expectedAction = {
        payload: sort,
        type: UPDATE_SORT
      };
      expect(updateSort(sort)).toEqual(expectedAction);
    });
  });
});
