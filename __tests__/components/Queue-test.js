import Queue from "../../app/components/Queue";
import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { TouchableWithoutFeedback } from "react-native";
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

describe('Test Queue', () => {
    beforeEach( async () => {
        const addListener = jest.fn();
        props = {
            navigation: {
                addListener
            }
        }
        global.tree = renderer.create(<Queue {...props} />);
    });

    it("Queue renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });

});