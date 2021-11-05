import SignupScreen from "../app/screens/SignupScreen";
import React from 'react';
import renderer from 'react-test-renderer';

describe('Test Signup Screen', () => {
    beforeEach( async () => {
        global.tree = await renderer.create(<SignupScreen />);
    });

    it("Page renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });
});