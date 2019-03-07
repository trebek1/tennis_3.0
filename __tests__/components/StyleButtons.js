import React from "react";
import { shallow } from "enzyme";

import StyleButtons from "../../src/components/StyleButtons";
import ButtonPannelConfig from "../../src/constants/buttonPannelConfig";

describe(`StyleButtons component`, () => {
  test("renders the StyleButtons compoenent", () => {
    const component = shallow(<StyleButtons selectStyle={() => {}} />);
    expect(component.exists()).toBe(true);
  });
  test("it renders the correct number of buttons", () => {
    const component = shallow(<StyleButtons selectStyle={() => {}} />);
    expect(component.find("StyleButton").length).toEqual(
      Object.keys(ButtonPannelConfig).length
    );
  });
});
