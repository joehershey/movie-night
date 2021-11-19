import JoinGroupPopup from "../../app/components/JoinGroupPopup";
import React from 'react';
import renderer from 'react-test-renderer';

describe('Test Join Group Popup', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<JoinGroupPopup />);
    });

    it("Join group popup renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });
});