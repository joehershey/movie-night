import ProfileSettingsScreen from '../app/screens/ProfileSettingsScreen';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Test Profile Settings Screen', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<ProfileSettingsScreen />).toJSON();
    });

    it("Profile settings screen renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });
});