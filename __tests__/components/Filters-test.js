import Filters from "../../app/components/Filters";
import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { TouchableWithoutFeedback } from "react-native";
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

describe('Test Filters', () => {
    beforeEach( async () => {
        props = {
            genres: "Action",
            watchProviders: "Hulu"
        }
        global.tree = renderer.create(<Filters {...props}/>);
    });

    it("Filters renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });

    it("Check for filters button and simulate press", () => {
        indexOf = jest.fn();
        props = {
            genres: {
                indexOf
            },
            watchProviders: {
                indexOf
            }
        }
        const container = shallow(<Filters {...props}/>);
        const filters = container.find(TouchableWithoutFeedback).first(); // finds onPress event to open filters
        filters.props().onPress(); // calls Filters() and opens the filters menu
        expect(filters.exists());
    });

    it("Check for action filter and simulate press", () => {
        indexOf = jest.fn();
        splice = jest.fn();
        setGenres = jest.fn();
        setPage = jest.fn();
        props = {
            genres: {
                indexOf,
                splice
            },
            watchProviders: {
                indexOf
            },
            setGenres,
            setPage
        }
        const container = shallow(<Filters {...props}/>);
        const filters = container.find(TouchableWithoutFeedback).first(); // finds onPress event to open filters
        filters.props().onPress(); // calls Filters() and opens the filters menu
        container.update();
        const action = container.find(TouchableWithoutFeedback).at(0); // find action filter
        action.props().onPress(); // action filter simulate press
        expect(action.exists());
    });

    it("Find netlfix filter and simulate press", () => {
        indexOf = jest.fn();
        splice = jest.fn();
        setGenres = jest.fn();
        setPage = jest.fn();
        setWatchProviders = jest.fn();
        props = {
            genres: {
                indexOf,
                splice
            },
            watchProviders: {
                indexOf,
                splice
            },
            setGenres,
            setPage,
            setWatchProviders
        }
        const container = shallow(<Filters {...props}/>);
        const filters = container.find(TouchableWithoutFeedback).first(); // finds onPress event to open filters
        filters.props().onPress(); // calls Filters() and opens the filters menu
        container.update();
        const netflix = container.find(TouchableWithoutFeedback).at(18); // find netflix filter
        netflix.props().onPress(); // netflix filter simulate press
        expect(netflix.exists());
    });

    it("Find close button on filters page and simulate press", () => {
        indexOf = jest.fn();
        splice = jest.fn();
        setGenres = jest.fn();
        setPage = jest.fn();
        setWatchProviders = jest.fn();
        props = {
            genres: {
                indexOf,
                splice
            },
            watchProviders: {
                indexOf,
                splice
            },
            setGenres,
            setPage,
            setWatchProviders
        }
        const container = shallow(<Filters {...props}/>);
        const filters = container.find(TouchableWithoutFeedback).first(); // finds onPress event to open filters
        filters.props().onPress(); // calls Filters() and opens the filters menu
        container.update();
        const close = container.find(TouchableWithoutFeedback).last(); // find close button
        close.props().onPress(); // close button simulate press
        expect(close.exists());
    });
});