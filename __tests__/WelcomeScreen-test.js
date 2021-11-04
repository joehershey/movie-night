import WelcomeScreen from '../app/screens/WelcomeScreen';
import React from 'react';
import renderer from 'react-test-renderer';
import {STYLES} from "../app/assets/saved.js";

describe('Test entire page render', () => {
    it("renders", () => {
        const tree = renderer.create(<WelcomeScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe('Testing login button', () => {
    const wrapper = renderer.create(<WelcomeScreen title="Test LoginButton" />);
    //console.log(wrapper.toJSON().children); // looking at button elements
  
    it('Login button should render', () => {
        expect(wrapper.toJSON().children[1]).toBeTruthy();
    });

    it('Login button should match style sheet', () => {
      const sty = wrapper.toJSON().children[1].props.style[1];
      expect(sty).toMatchObject(STYLES.btn);
    });
  });
