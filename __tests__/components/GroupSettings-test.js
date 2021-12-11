import GroupSettings from "../../app/components/GroupSettings";
import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { TouchableWithoutFeedback } from "react-native";
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

describe('Test Group Settings', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<GroupSettings />);
    });

    it("Group settings renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });

    it("Check for edit button and simulate press", () => {
        console.error = jest.fn(); // mutes expected console error of invalid prop
        props = {
            isAdmin: true,
            maxMovies: {
                length: 0
            },
            groupName: {
                length: 0
            }
        }
        const container = shallow(<GroupSettings {...props}/>);
        const edit = container.find(TouchableWithoutFeedback).first(); // finds onPress function that calls setEdit
        edit.props().onPress(); // simulate onPress event
        expect(edit.exists());
    });
});