import GroupQueueScreen from '../../app/screens/GroupQueueScreen';
import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { TouchableWithoutFeedback } from "react-native";
import { shallow, configure } from 'enzyme';
import Queue from "../../app/components/Queue";


configure({adapter: new Adapter()});

describe('Test Group Queue Screen', () => {
    beforeEach( async () => {
        addListener = jest.fn();
        props = {
            navigation: {
                addListener
            }
        }
        global.tree = renderer.create(<GroupQueueScreen {...props}/>).toJSON();
    });

    it("Group queue screen renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });
});