import GroupSettingsScreen from '../app/screens/GroupSettingsScreen';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Test Group Settings Screen', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<GroupSettingsScreen />).toJSON();
    });

    it("Group settings screen renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });
});