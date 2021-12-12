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
        // FIXME: failing still, but does increase code coverage
        const showConfirm = false;
        const onConfirm = () => showConfirm();
        const props = {
        }
        const container = shallow(<DeleteAccount {...props}/>);
        const confirmButton = container.find(TouchableWithoutFeedback).first();
        confirmButton.props().onPress();
        expect(showConfirm).toBeCalledTimes(1); // checks if the mock 'onConfirm' function has been called
    });

    it("Toggle show popup button", () => {
        const toggleShowPopup = jest.fn();
        const props = {
            toggleShowPopup
        }
        const container = shallow(<DeleteAccount {...props}/>);
        const twf = container.find(TouchableWithoutFeedback); 
        //console.log(twf.debug());
        //const togglePopUpButton = container.find(TouchableWithoutFeedback).second();
        //togglePopUpButton.props().onPress();
        twf.at(1).props().onPress();
        expect(toggleShowPopup).toBeCalledTimes(1); // checks if the mock 'toggleShowPopUp' function has been called
    });
});