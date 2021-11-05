import GroupQueueScreen from '../app/screens/GroupQueueScreen';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Test Group Queue Screen', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<GroupQueueScreen />).toJSON();
    });

    it("Group queue screen renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });
});