import WelcomeScreen from "../app/screens/WelcomeScreen";
import React from 'react';
import renderer from 'react-test-renderer';

test("renders", () => {
    const tree = renderer.create(<WelcomeScreen />).toJSON();
    expect(tree).toMatchSnapshot();
})