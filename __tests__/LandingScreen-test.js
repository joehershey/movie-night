import LandingScreen from '../app/screens/LandingScreen';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Test Landing Screen', () => {
    beforeEach( async () => {
        let props = {
            url: "https://sampleURL.com/", 
            user_id: 1
        }
        global.tree = renderer.create(<LandingScreen {...props} />).toJSON();
    });

    it("Landing screen renders properly", async () => {
        console.error = jest.fn(); // fixme: mutes FetchError for testing purposes
        await expect(global.tree).toMatchSnapshot();
    });

});