import React from 'react';
import { shallow } from 'enzyme';
import Header from 'App';

describe('<App />', () => {
    it('App render', () => {
        const wrapper = shallow(<Header navigation={() => {}}/>);
        console.log('wrapper', wrapper);
        expect(wrapper).toHaveLength(1);
    });
})
