import DeleteGroup from "../../app/components/DeleteGroup";
import React from 'react';
import renderer from 'react-test-renderer';

describe('Test Delete Group', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<DeleteGroup />);
    });

    it("Delete group renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });
});