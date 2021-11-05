import ScheduleScreen from '../app/screens/ScheduleScreen';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Test Schedule Screen', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<ScheduleScreen />).toJSON();
    });

    it("Schedule screen renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });
});