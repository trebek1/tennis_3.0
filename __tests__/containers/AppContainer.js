import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';

import { AppContainer } from '../../src/containers/AppContainer';

describe(`AppContainer component`, () => {
  let spy;
  afterEach(() => {
    if (spy) spy.mockClear();
  });
  test('renders the AppContainer', () => {
    const component = shallow(
      <AppContainer
        getCourts={() => {}}
        selectStyle={() => {}}
        sort="all"
        sortedCourts={[]}
        styles="usa"
      />
    );
    expect(component.exists()).toBe(true);
    expect(component.find('Map').length).toEqual(1);
    expect(component.find('CourtList').length).toEqual(1);
    expect(component.find('SortByButtons').length).toEqual(1);
    expect(component.find('StyleButtons').length).toEqual(1);
  });
  test('componentDidMount works', () => {
    spy = jest.spyOn(AppContainer.prototype, 'componentDidMount');
    const spyForGetCourts = jest.fn();
    const component = mount(
      <AppContainer
        getCourts={spyForGetCourts}
        selectStyle={() => {}}
        sort="all"
        sortedCourts={[]}
        styles="usa"
      />
    );
    expect(spy).toHaveBeenCalled();
    expect(spyForGetCourts).toHaveBeenCalled();
  });
});
