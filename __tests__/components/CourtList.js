import React from 'react';
import { shallow, mount } from 'enzyme';

import CourtList from '../../src/components/CourtList';

import { oneCourt, twoCourts } from '../__fixtures__/CourtFixtures';

describe(`CourtList component`, () => {
  test('renders the courtList Component', () => {
    const component = shallow(<CourtList />);
    expect(component.exists()).toBe(true);
  });

  test('renders null if courts is null or empty', () => {
    const nullCourtsList = { courts: null };
    const emptyCourtsList = { courts: [] };
    const emptyCourts = shallow(<CourtList {...emptyCourtsList} />);
    const nullCourts = shallow(<CourtList {...nullCourtsList} />);
    expect(emptyCourts.instance()).toBe(null);
    expect(nullCourts.instance()).toBe(null);
  });
  test('renders the correct number of courts', () => {
    const component = shallow(<CourtList courts={twoCourts} />);
    expect(component.find('.courtListItem').length).toEqual(twoCourts.length);
  });
  test('renders one court and return button', () => {
    const component = shallow(<CourtList courts={oneCourt} />);
    expect(component.find('.courtListItem').length).toEqual(
      oneCourt.length + 1
    );
  });
  test('one court should render the return button', () => {
    const component = shallow(<CourtList courts={oneCourt} />);
    expect(component.find('.return').length).toEqual(1);
  });
  test('expect to be able to click selectPoint ', () => {
    const mockCallBack = jest.fn();
    const component = shallow(
      <CourtList courts={twoCourts} selectPoint={mockCallBack} />
    );
    const oneCourt = component.childAt(0);
    oneCourt.simulate('click');

    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
  test('expect to be able to click back  button ', () => {
    const mockCallBack = jest.fn();
    const component = shallow(
      <CourtList courts={oneCourt} sortPoints={mockCallBack} />
    );
    const backButton = component.childAt(1);
    backButton.simulate('click');

    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
