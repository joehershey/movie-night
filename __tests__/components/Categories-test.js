import Categories from "../../app/components/Categories";
import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react-native';
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

    it("Renders movies", () => {
        const toggleShowPopup = jest.fn()
        props = {
        }
        // I think this doesn't work because there are no movies loading to start
        // We need a way to add movies like a user would
        const { getByTestId } = render(<Categories {...props}/>);
        fireEvent.press(getByTestId('LoadMoreButton'));
        // expect(getByTestId('MobileCurrentPassword').props.value).toEqual('JESTTestPassword');
    });
});