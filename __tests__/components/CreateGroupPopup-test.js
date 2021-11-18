import CreateGroupPopup from "../../app/components/CreateGroupPopup";
import React from 'react';
import renderer from 'react-test-renderer';

describe('Test Create Group Popup', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<CreateGroupPopup />);
    });

    it("Group popup renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });
});