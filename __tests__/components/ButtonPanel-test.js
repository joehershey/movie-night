import ButtonPanel from "../../app/components/ButtonPanel";
import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { TouchableWithoutFeedback } from "react-native";
import { shallow, configure } from 'enzyme';
//import nodeModulePackage from 'nodeModulePackage';

configure({adapter: new Adapter()});
describe('Test Button Panel', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<ButtonPanel />);
    });

    it("Button panel renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });

    it("Create group button exists", () => {
        const container = shallow(<ButtonPanel/>);
        //console.log(container.debug());
        const createButton = container.find(TouchableWithoutFeedback).first();
        createButton.props().onPress();
        expect(createButton.exists());
    });

    it("Join group button exists", () => {
        const onp = jest.fn();
        onp.mockReturnValue('Link on press invoked');
        const container = shallow(<ButtonPanel onClick={onp}/>);
        //container.dive().instance().toggleShowCreateGroup = jest.fn();
        //console.log(container.debug());
        container.update();
        const joinButton = container.find(TouchableWithoutFeedback).last();
        joinButton.props().onPress();
        expect(joinButton.exists());
    });
});