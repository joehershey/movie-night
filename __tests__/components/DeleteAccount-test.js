import DeleteAccount from "../../app/components/DeleteAccount";
import React from 'react';
import renderer from 'react-test-renderer';

describe('Test Delete Account', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<DeleteAccount />);
    });

    it("Delete account renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });
});