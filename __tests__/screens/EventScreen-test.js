import EventScreen from '../../app/screens/EventScreen';
import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react-native';

import Adapter from 'enzyme-adapter-react-16';
import { TouchableWithoutFeedback } from "react-native";
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

describe('Test Event Screen', () => {
    
    it("Check for onPress isGoing() function and simulate press", () => {
        console.error = jest.fn(); // mutes expect API call error
        const container = shallow(<EventScreen />);
        const onPress = container.find(TouchableWithoutFeedback).at(0); // finds onPress => isGoing()
        console.log(onPress.debug())
        onPress.props().onPress(); // calls isGoing()
        expect(onPress.exists());
    });

    it("Check for onPress isNotGoing() function and simulate press", () => {
        console.error = jest.fn(); // mutes expect API call error
        const container = shallow(<EventScreen />);
        const onPress = container.find(TouchableWithoutFeedback).at(1); // finds onPress => isNotGoing()
        console.log(onPress.debug())
        onPress.props().onPress(); // calls isNotGoing()
        expect(onPress.exists());
    });    
});