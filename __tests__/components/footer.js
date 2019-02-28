import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import Footer from "../../src/components/footer";

describe(`Footer component`, () => {
  test("renders the footer", () => {
    const component = shallow(<Footer />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
