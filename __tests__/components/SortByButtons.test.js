import React from "react";
import { mount } from "enzyme";

import SortByButtons from "../../src/components/SortByButtons";
import CourtTypeConfig from "../../src/constants/courtTypeConfig";

describe(`SortByButtons component`, () => {
  test("it should render the title ", () => {
    const mockCallBack = jest.fn();
    const component = mount(<SortByButtons sortPoints={mockCallBack} />);
    const clubTile = component.find("div.key.club");
    clubTile.simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
