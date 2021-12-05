import ButtonPanel from "../../app/components/ButtonPanel";
import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { TouchableWithoutFeedback } from "react-native";
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

describe('Test Button Panel', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<ButtonPanel />);
    })

    it("Button panel renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });

    it("Create group button on click", () => {
        const toggleShowCreateGroup = jest.fn();
        const toggleShowJoinGroup = jest.fn();
        const props = {
                toggleShowCreateGroup,
                toggleShowJoinGroup
        }
        const container = shallow(<ButtonPanel {...props}/>);
        const createButton = container.find(TouchableWithoutFeedback).first();
        createButton.props().onPress();
        expect(toggleShowCreateGroup).toBeCalledTimes(1); // checks if the mock 'toggleShowCreateGroup' function has been called
    });

    it("Join group button on click", () => {
        const toggleShowCreateGroup = jest.fn();
        const toggleShowJoinGroup = jest.fn();
        const props = {
                toggleShowCreateGroup,
                toggleShowJoinGroup
        }
        const container = shallow(<ButtonPanel {...props}/>);
        const joinButton = container.find(TouchableWithoutFeedback).last();
        joinButton.props().onPress();
        expect(toggleShowJoinGroup).toBeCalledTimes(1); // checks if the mock 'toggleShowJoinGroup' function has been called
    });
});