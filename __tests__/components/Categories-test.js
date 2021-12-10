import Categories from "../../app/components/Categories";
import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { TouchableWithoutFeedback, Filters, View} from "react-native";
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

describe('Test Categories', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<Categories />);
    });

    it("Categories renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });
});