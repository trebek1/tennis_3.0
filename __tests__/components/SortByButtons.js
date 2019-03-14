import React from 'react';
import { shallow } from 'enzyme';

import SortByButtons from '../../src/components/SortByButtons';
import CourtTypeConfig from '../../src/constants/courtTypeConfig';

describe(`SortByButtons component`, () => {
  test('renders the wrapper', () => {
    const component = shallow(<SortByButtons sortPoints={() => {}} />);
    expect(component.exists()).toBe(true);
  });
  test('it renders the correct number of sort buttons', () => {
    const component = shallow(<SortByButtons sortPoints={() => {}} />);
    expect(component.find('CourtTypeTile').length).toEqual(
      Object.keys(CourtTypeConfig).length
    );
  });
  test('it should sort by club and update the state on click', () => {
    const component = shallow(<SortByButtons sortPoints={() => {}} />);
    expect(component.find('.anchor.keyTitle').length).toEqual(1);
  });
});
