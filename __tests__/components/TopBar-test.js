import TopBar from "../../app/components/TopBar";
import React from 'react';
import renderer from 'react-test-renderer';

describe('Test Top Bar', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<TopBar />);
    });

    it("Top bar renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });
});