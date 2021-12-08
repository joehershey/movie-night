import Queue from "../../app/components/Queue";
import React from 'react';
import renderer from 'react-test-renderer';

describe('Test Queue', () => {
    beforeEach( async () => {
        const addListener = jest.fn();
        props = {
            navigation: {
                addListener
            }
        }
        global.tree = renderer.create(<Queue {...props} />);
    });

    it("Queue renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });
});