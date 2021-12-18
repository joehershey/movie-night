import FinishVoting from "../../app/components/FinishVoting";
import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { TouchableWithoutFeedback } from "react-native";
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

describe('Test Filters', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<FinishVoting />);
    });

    it("Finish Voting renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });

    it("Check for yes button and simulate press", () => {
        const toggleShowPopup = jest.fn();
        props = {
            toggleShowPopup
        }
        const container = shallow(<FinishVoting {...props} />);
        const yesBtn = container.find(TouchableWithoutFeedback).at(0); // finds onPress () => onConfirm()
        yesBtn.props().onPress(); // calls Filters() and opens the filters menu
        expect(yesBtn.exists());
        expect(toggleShowPopup).toBeCalledTimes(1);
    });

    it("Check for no button and simulate press", () => {
        const toggleShowPopup = jest.fn();
        props = {
            toggleShowPopup
        }
        const container = shallow(<FinishVoting {...props} />);
        const noBtn = container.find(TouchableWithoutFeedback).at(1); // finds onPress () => onConfirm()
        noBtn.props().onPress(); // calls Filters() and opens the filters menu
        expect(noBtn.exists());
        expect(toggleShowPopup).toBeCalledTimes(1);
    });
});