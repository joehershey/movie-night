import SearchMoviesScreen from '../app/screens/SearchMoviesScreen';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Test Search Movies Screen', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<SearchMoviesScreen />).toJSON();
    });

    it("Search movies screen renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });
});