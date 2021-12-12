import SearchMoviesScreen from '../../app/screens/SearchMoviesScreen';
import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react-native';

describe('Test Search Movies Screen', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<SearchMoviesScreen />).toJSON();
    });

    it("Search movies screen renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });

    it("Does basic test", () => {
        // const toggleShowPopup = jest.fn()
        props = {
        }
        const { getByTestId } = render(<SearchMoviesScreen {...props}/>);
        fireEvent.press(getByTestId('CategoriesButton'));
        fireEvent.press(getByTestId('SearchButton'));
        // expect(getByTestId('MobileCurrentPassword').props.value).toEqual('JESTTestPassword');
    });
});