import React from 'react';
import { mount } from 'enzyme';

import StyleButtons from '../../src/components/StyleButtons';
import ButtonPannelConfig from '../../src/constants/buttonPannelConfig';

describe(`ButtonPannel component`, () => {
  test('it should render the title ', () => {
    const mockCallBack = jest.fn();
    const component = mount(<StyleButtons selectStyle={mockCallBack} />);
    const clubTile = component.find('span.tab.french');
    clubTile.simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
