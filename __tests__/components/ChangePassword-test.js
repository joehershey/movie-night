import ChangePassword from "../../app/components/ChangePassword";
import React from 'react';
import renderer from 'react-test-renderer';

describe('Test Change Password', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<ChangePassword />);
    });

    it("Change password renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });
});