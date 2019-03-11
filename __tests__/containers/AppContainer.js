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

  it("should call getCourts during componentDidMount", () => {
    const testState = {};
    const mockFn = jest.fn();
    const store = createMockStore(testState);
    const componentDidMount = jest.spyOn(
      AppContainer.prototype,
      "componentDidMount"
    );
    const getCourts = jest.spyOn(
      AppContainer.WrappedComponent.propTypes,
      "getCourts"
    );
    component = mountWithStore(
      <AppContainer
        courts={{}}
        getCourts={mockFn}
        selectStyle={() => {}}
        sortedCourts={() => {}}
      />,
      store
    );
    expect(getCourts).toHaveBeenCalledTimes(1);
    expect(componentDidMount).toHaveBeenCalledTimes(1);
  });
  it("should default to the default state ", () => {
    const testState = {};
    const store = createMockStore(testState);

    component = shallowWithStore(<AppContainer />, store);
    expect(component.props().styles).toEqual("wimbledon");
    expect(component.props().sort).toEqual("all");
    expect(JSON.stringify(component.props().sortedCourts)).toEqual(
      JSON.stringify([])
    );
    expect(JSON.stringify(component.props().courts)).toEqual(
      JSON.stringify([])
    );
  });
});
