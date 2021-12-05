import Categories from "../../app/components/Categories";
import React from 'react';
import renderer from 'react-test-renderer';

describe('Test Categories', () => {

    it("Categories renders properly", async () => {
        const tree = renderer.create(<Categories />);
        expect(tree).toMatchSnapshot();
    });
});