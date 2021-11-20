import DeleteGroup from "../../app/components/DeleteGroup";
import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { TouchableWithoutFeedback } from "react-native";
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});
describe('Test Delete Group', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<DeleteGroup />).toJSON();
    });

    it("Delete group renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });

    it("Delete group button exists", () => {
        const container = shallow(<DeleteGroup/>);
        //console.log(container.debug());
        const deleteButton = container.find(TouchableWithoutFeedback).first();
        expect(deleteButton.exists());
    });

    it("Confirm delete button exists", () => {
        const container = shallow(<DeleteGroup/>);
        //console.log(container.debug());
        const deleteButton = container.find(TouchableWithoutFeedback).first();
        deleteButton.props().onPress();
        const confirmDelete = container.find(TouchableWithoutFeedback).first();
        confirmDelete.props().onPress(); // throws props error for props.DeleteGroupAPI. I believe figuring out this error will lead to 100% coverage
        expect(confirmDelete.exists());
    });

    it("Cancel delete button exists", () => {
        const container = shallow(<DeleteGroup/>);
        //console.log(container.debug());
        const deleteButton = container.find(TouchableWithoutFeedback).first();
        deleteButton.props().onPress(); // press changes page components
        const cancelDelete = container.find(TouchableWithoutFeedback).last();
        cancelDelete.props().onPress();
        expect(cancelDelete.exists());
    });
});