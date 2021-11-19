import ButtonPanel from "../../app/components/ButtonPanel";
import React from 'react';
import renderer from 'react-test-renderer';

describe('Test Button Panel', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<ButtonPanel />);
    });

    it("Button panel renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });
});