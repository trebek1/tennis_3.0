import React from "react";
import { shallow } from "enzyme";

import Wrapper from "../../src/components/Wrapper";

describe(`Wrapper component`, () => {
  test("renders the wrapper", () => {
    const component = shallow(<Wrapper children={<div />} />);
    expect(component.exists()).toBe(true);
  });
});
