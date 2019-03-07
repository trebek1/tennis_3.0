import React from "react";
import { shallow } from "enzyme";
import { createMockStore } from "redux-test-utils";

import AppContainer from "../../src/containers/AppContainer";

const shallowWithStore = (component, store) => {
  const context = {
    store
  };
  return shallow(component, { context });
};

describe(`AppContainer component`, () => {
  test("It should render", () => {
    const testState = {};
    const store = createMockStore(testState);
    const component = shallowWithStore(
      <AppContainer
        courts={{}}
        selectStyle={() => {}}
        sortedCourts={() => {}}
      />,
      store
    );
    expect(component.exists()).toBe(true);
  });
});
