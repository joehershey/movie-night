import WelcomeScreen from '../../app/screens/WelcomeScreen';
import React from 'react';
import renderer from 'react-test-renderer';
import {STYLES} from "../../app/assets/saved.js";
import Adapter from 'enzyme-adapter-react-16';
import { TouchableWithoutFeedback } from "react-native";
import { shallow, configure } from 'enzyme';
import { NavigationHelpersContext } from '@react-navigation/core';


configure({adapter: new Adapter()});
describe('Test Welcome Screen', () => {
    beforeEach(() => {
        global.tree = renderer.create(<WelcomeScreen />).toJSON();
    });
    
    it("Welcome screen renders properly", () => {
        expect(global.tree).toMatchSnapshot();
    });

    it ('Login button renders', () => {
        expect(global.tree.children[1]).toBeTruthy();
    });

    it('Login button matches style sheet', () => {
        expect(global.tree.children[1].props.style[1]).toMatchObject(STYLES.btn);
    });

    it("Login button exists", () => {
        const navigate = jest.fn();
        props = {
            navigation: {
                navigate
            }
        }
        const container = shallow(<WelcomeScreen {...props} />);
        //console.log(container.debug());
        const loginButton = container.find(TouchableWithoutFeedback).first();
        loginButton.props().onPress();
        expect(loginButton.exists());
    });

    it("Signup button exists", () => {
        const navigate = jest.fn();
        props = {
            navigation: {
                navigate
            }
        }
        const container = shallow(<WelcomeScreen {...props}/>);
        //console.log(container.debug());
        const signupButton = container.find(TouchableWithoutFeedback).last();
        signupButton.props().onPress();
        expect(signupButton.exists());
    });

});
