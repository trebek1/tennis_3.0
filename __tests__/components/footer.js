import React from "react";
import { shallow } from "enzyme";

import Footer from "../../src/components/Footer";

describe(`Footer component`, () => {
  test("renders the footer", () => {
    const component = shallow(<Footer />);
    expect(component.exists()).toBe(true);
  });
});
