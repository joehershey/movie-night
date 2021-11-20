import Queue from "../../app/components/Queue";
import React from 'react';
import renderer from 'react-test-renderer';

describe('Test Queue', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<Queue />);
    });

    it("Queue renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });
});