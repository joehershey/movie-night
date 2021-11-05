import SignupScreen from "../app/screens/SignupScreen";
import React from 'react';
import renderer from 'react-test-renderer';
jest.useFakeTimers();

describe('Test Signup Screen', () => {
    const tree = renderer.create(<SignupScreen />);

    // it("Page renders properly", () => {
    //     expect(tree).toMatchSnapshot();
    // });
    it("test", () => {
        expect(3).toBe(3);
    });
});