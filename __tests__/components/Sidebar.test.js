import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { SidebarComponent } from '../../app/components/sidebar/index';

describe('<Sidebar />', () => {
  describe('render()', () => {
    test('should render correctly', () => {
      const wrapper = shallow(<SidebarComponent />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
