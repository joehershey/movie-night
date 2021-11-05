import LandingScreen from '../app/screens/LandingScreen';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Test Landing Screen', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<LandingScreen />).toJSON();
    });

    it("Landing screen renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });
});