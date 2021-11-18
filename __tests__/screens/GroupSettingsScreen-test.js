import GroupSettingsScreen from '../../app/screens/GroupSettingsScreen';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Test Group Settings Screen', () => {
    beforeEach( async () => {
        let props = {
            url: "https://sampleURL.com/", 
            user_id: 1
        }
        global.tree = renderer.create(<GroupSettingsScreen {...props} />).toJSON();
    });

    it("Group settings screen renders properly", async () => {
        console.error = jest.fn(); // fixme: mutes FetchError for testing purposes
        await expect(global.tree).toMatchSnapshot();
    });
});