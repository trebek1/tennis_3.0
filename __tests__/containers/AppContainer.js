import React, { Component } from "react";
import { shallow, mount } from "enzyme";
import { createMockStore } from "redux-test-utils";

import AppContainer from "../../src/containers/AppContainer";

const shallowWithStore = (component, store) => {
  const context = {
    store
  };
  return shallow(component, { context });
};

const mountWithStore = (component, store) => {
  const context = {
    store
  };
  return mount(component, { context });
};

describe(`AppContainer component`, () => {
  let component;
  afterEach(() => {
    component.unmount();
  });

  test("It should render", () => {
    const testState = {};
    const store = createMockStore(testState);
    component = shallowWithStore(
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
