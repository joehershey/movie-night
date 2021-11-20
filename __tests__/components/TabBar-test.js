import TabBar from "../../app/components/TabBar";
import React from 'react';
import renderer from 'react-test-renderer';

describe('Test Tab Bar', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<TabBar />);
    });

    it("Tab bar renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });
});