import EventScreen from '../../app/screens/EventScreen';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Test Event Screen', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<EventScreen />).toJSON();
    });

    it("Event screen renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });
});