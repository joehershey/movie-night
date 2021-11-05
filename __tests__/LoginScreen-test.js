jest.useFakeTimers();
import LoginScreen from '../app/screens/LoginScreen';
import React from 'react';
import renderer from 'react-test-renderer';

describe('Test Login Screen', () => {
    const tree = renderer.create(<LoginScreen />).toJSON();

    it("Page renders properly", () => {
        expect(tree).toMatchSnapshot();
    });
});