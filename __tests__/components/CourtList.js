import React from "react";
import { shallow, mount } from "enzyme";

import CourtList from "../../src/components/CourtList.jsx";

import courts from "../__fixtures__/CourtFixtures";

//console.log("is the compoentn found ", CourtList);

describe(`CourtList component`, () => {
  test("renders the courtList Component", () => {
    const component = shallow(<CourtList />);
    expect(component.exists()).toBe(true);
  });

  test("renders null if courts is null or empty", () => {
    const nullCourtsList = { courts: null };
    const emptyCourtsList = { courts: [] };
    const emptyCourts = shallow(<CourtList {...emptyCourtsList} />);
    const nullCourts = shallow(<CourtList {...nullCourtsList} />);
    expect(emptyCourts.instance()).toBe(null);
    expect(nullCourts.instance()).toBe(null);
  });
  test("renders the correct number of courts", () => {
    const component = shallow(<CourtList courts={courts} />);
    expect(component.find(".courtListItem").length).toEqual(courts.length);
  });
});
