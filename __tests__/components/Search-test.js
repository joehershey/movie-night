import Search from "../../app/components/Search";
import React from 'react';
import renderer from 'react-test-renderer';

describe('Test Search', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<Search />);
    });

    it("Search renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });
});