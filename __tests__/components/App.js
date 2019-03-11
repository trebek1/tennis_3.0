import React from "react";
import { shallow } from "enzyme";

import App from "../../src/components/App";

describe(`App component`, () => {
  test("renders the App", () => {
    const component = shallow(<App />);
    expect(component.exists()).toBe(true);
  });
});
