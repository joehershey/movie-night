import JoinGroupPopup from "../../app/components/JoinGroupPopup";
import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { TouchableWithoutFeedback } from "react-native";
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

describe('Test Join Group Popup', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<JoinGroupPopup />);
    });

    it("Join group popup renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });

    it("Check for iOS keyboardControl and simulate press", () => {
        const container = shallow(<JoinGroupPopup />);
        const keyboardControl = container.find(TouchableWithoutFeedback).at(0); // finds onPress => keyboardControl()
        keyboardControl.props().onPress(); // calls keyboardControl()
        expect(keyboardControl.exists());
    });

    it("Check for submit button and simulate press", () => {
        alert = jest.fn() // simulates alert functions that onPress calls
        const container = shallow(<JoinGroupPopup {...alert} />);
        const onSubmit = container.find(TouchableWithoutFeedback).at(1); // finds onPress => onSubmit
        onSubmit.props().onPress(); // simulate onSubmit function
        expect(onSubmit.exists());
    });

    it("Check for close button and simulate press", () => {
        const toggleShowPopup = jest.fn();
        props = {
            toggleShowPopup
        }
        const container = shallow(<JoinGroupPopup {...props} />);
        const onClose = container.find(TouchableWithoutFeedback).at(2); // finds onPress => onClose
        onClose.props().onPress(); // calls the function
        expect(onClose.exists());
    });
});