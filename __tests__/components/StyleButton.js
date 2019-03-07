import React from "react";
import { shallow } from "enzyme";

import StyleButton from "../../src/components/StyleButton";

describe(`StyleButton component`, () => {
  test("renders the stylebutton", () => {
    const component = shallow(<StyleButton />);
    expect(component.exists()).toBe(true);
  });
  test("it should fire the handleclick on click", () => {
    const mockCallBack = jest.fn();
    const component = shallow(<StyleButton handleClick={mockCallBack} />);
    component.simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
