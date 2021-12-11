import CreateGroupPopup from "../../app/components/CreateGroupPopup";
import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { TouchableWithoutFeedback } from "react-native";
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

describe('Test Create Group Popup', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<CreateGroupPopup />);
    });

    it("Group popup renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });

    it("Check for iOS keyboardControl and simulate press", () => {
        const container = shallow(<CreateGroupPopup />);
        const keyboardControl = container.find(TouchableWithoutFeedback).at(0); // finds onPress => keyboardControl()
        keyboardControl.props().onPress(); // calls keyboardControl()
        expect(keyboardControl.exists());
    });

    it("Check for submit button and simulate press", () => {
        alert = jest.fn(); // mutes plese enter group name alert
        const container = shallow(<CreateGroupPopup />);
        const onSubmit = container.find(TouchableWithoutFeedback).at(1); // finds onPress => onSubmit()
        onSubmit.props().onPress(); // calls onPress()
        expect(onSubmit.exists());
    });

    it("Find and simulate onPress => onClose function", () => {
        const toggleShowPopup = jest.fn()
        props = {
            toggleShowPopup
        }
        const container = shallow(<CreateGroupPopup {...props}/>);
        const onClose = container.find(TouchableWithoutFeedback).at(2); // finds onPress => onClose()
        onClose.props().onPress(); // calls onClose() and simulates toggleShowPopup
        expect(onClose.exists());
        expect(toggleShowPopup.mock.calls[0][0]).toBe(false) // toggleShowPopup value is false in onClose
    });

    it("Find and simulate onPress => onConfirm function", () => {
        const setLoaded = jest.fn()
        props = {
            setLoaded
        }
        const container = shallow(<CreateGroupPopup {...props}/>);
        const onConfirm = container.find(TouchableWithoutFeedback).at(3); // finds onPress => onConfirm
        onConfirm.props().onPress(); // calls onConfirm()
        expect(onConfirm.exists());
    });
});