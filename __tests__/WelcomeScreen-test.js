import WelcomeScreen from '../app/screens/WelcomeScreen';
import React from 'react';
import renderer from 'react-test-renderer';
import {STYLES} from "../app/assets/saved.js";

describe('Test Welcome Screen', () => {
    const tree = renderer.create(<WelcomeScreen />).toJSON();
    it("Screen renders properly", () => {
        expect(tree).toMatchSnapshot();
    });

    it ('Login button renders', () => {
        expect(tree.children[1]).toBeTruthy();
    });

    it('Login button matches style sheet', () => {
        expect(tree.children[1].props.style[1]).toMatchObject(STYLES.btn);
      });
});
