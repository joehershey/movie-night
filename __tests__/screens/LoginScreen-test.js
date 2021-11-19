import LoginScreen from '../../app/screens/LoginScreen';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Test Login Screen', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<LoginScreen />).toJSON();
    });

    it("Login screen renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });
});