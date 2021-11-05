import LoginScreen from '../app/screens/LoginScreen';
import React from 'react';
import renderer from 'react-test-renderer';
//jest.useFakeTimers();

describe('Test Login Screen', () => {
    beforeEach( async () => {
        global.tree = await renderer.create(<LoginScreen />).toJSON();
    });

    it("Page renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });
});