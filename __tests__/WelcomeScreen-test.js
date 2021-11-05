import WelcomeScreen from '../app/screens/WelcomeScreen';
import React from 'react';
import renderer from 'react-test-renderer';
import {STYLES} from "../app/assets/saved.js";


describe('Test Welcome Screen', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        global.tree = renderer.create(<WelcomeScreen />).toJSON();
    });
    
    it("Screen renders properly", (done) => {
        expect(global.tree).toMatchSnapshot();
        done();
    });

    it ('Login button renders', () => {
        expect(global.tree.children[1]).toBeTruthy();
    });

    it('Login button matches style sheet', () => {
        expect(global.tree.children[1].props.style[1]).toMatchObject(STYLES.btn);
      });
});
