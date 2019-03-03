import React from "react";
import { shallow, mount } from "enzyme";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import fetchMock from "fetch-mock";

import { GET_COURTS, getCourts } from "../../src/actions/courtActions";
import * as axios from "axios";

import { twoCourts } from "../__fixtures__/CourtFixtures";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Court Action", () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it("Sets courts to store after fetching", async done => {
    const expectedResponse = { data: [{ sfcourts: twoCourts }] };
    const store = mockStore({});

    moxios.stubRequest("/courts", {
      status: 201,
      response: expectedResponse
    });

    await store.dispatch(getCourts()).then(() => {
      // store.getActions returns the stubbed response instead of
      // traversing the data layer that is done in the getCourts action
      expect(store.getActions()).toEqual([
        {
          type: GET_COURTS,
          payload: expectedResponse
        }
      ]);
    });
    done();
  });
});
