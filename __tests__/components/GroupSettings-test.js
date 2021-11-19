import GroupSettings from "../../app/components/GroupSettings";
import React from 'react';
import renderer from 'react-test-renderer';

describe('Test Group Settings', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<GroupSettings />);
    });

    it("Group settings renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });
});