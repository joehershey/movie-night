import DeleteAccount from "../../app/components/DeleteAccount";
import React from 'react';
import renderer from 'react-test-renderer';
import { TouchableWithoutFeedback } from "react-native";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';


configure({adapter: new Adapter()});

describe('Test Delete Account', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<DeleteAccount />);
    });

    it("Delete account renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });

    it("Confirm button", () => {
        const toggleShowConfirm = jest.fn();
        const navigate = jest.fn();
        const props = {
            navigation: {
                navigate
            }
        }
        const container = shallow(<DeleteAccount {...props} {...toggleShowConfirm}/>);
        const confirmButton = container.find(TouchableWithoutFeedback).first(); // finds onPress () => onConfirm()
        confirmButton.props().onPress(); // simulates press
        expect(navigate).toBeCalledTimes(1); // checks if the mock navigate function has been called
        expect(confirmButton.exists());
    });

    it("Toggle show popup button", () => {
        const toggleShowPopup = jest.fn();
        const navigate = jest.fn();
        const props = {
            toggleShowPopup,
            navigation: {
                navigate
            },
            showPopup: true
        }
        const container = shallow(<DeleteAccount {...props}/>);
        const closeButton = container.find(TouchableWithoutFeedback).at(1); 
        closeButton.props().onPress(); // Finds and calls onPress () => toggleShowPopup()
        expect(toggleShowPopup).toBeCalledTimes(1); // checks if the mock 'toggleShowPopUp' function has been called
        expect(closeButton.exists());
    });
});