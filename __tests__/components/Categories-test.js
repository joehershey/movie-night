import Categories from "../../app/components/Categories";
import React from 'react';
import renderer from 'react-test-renderer';

describe('Test Categories', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<Categories />);
    });

    it("Categories renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });
});