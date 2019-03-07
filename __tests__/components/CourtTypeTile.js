import React from "react";
import { shallow } from "enzyme";

import CourtTypeTile from "../../src/components/CourtTypeTile";

import courtTypes from "../../src/constants/courtTypeConfig";

describe(`CourtTypeTile component`, () => {
  test("renders the courtTypeTile", () => {
    const component = shallow(<CourtTypeTile />);
    expect(component.exists()).toBe(true);
  });
  test("renders an more than one image if an imageNode is passed in", () => {
    const component = shallow(
      <CourtTypeTile imageNode={courtTypes.all.imageNode} />
    );
    expect(component.find("span.keyValue img").length > 1).toBe(true);
  });
  test("renders one image node by default with no imageNode", () => {
    const component = shallow(<CourtTypeTile />);
    expect(component.find("span.keyValue img").length).toEqual(1);
  });
  test("expect to be able to sort points on click ", () => {
    const mockCallBack = jest.fn();
    const component = shallow(<CourtTypeTile sortPoints={mockCallBack} />);
    component.simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
