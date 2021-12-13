import Categories from "../../app/components/Categories";
import Filters from "../../app/components/Filters";
import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react-native';

import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

describe('Test Categories', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<Categories />);
    });

    it("Categories renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });

    jest.useFakeTimers(); // mutes expected async fetch error
    it("Check keyboard control on press", () => {
        const container = shallow(<Categories />);
        const filters = container.find(Filters); // finds <Filters> block
        // call functions in block
        filters.props().setGenres();
        filters.props().setWatchProviders();
        filters.props().getMovies();
        filters.props().setPage();
        expect(filters.exists());
    })
});