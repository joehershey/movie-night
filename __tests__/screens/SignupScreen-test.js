import SignupScreen from "../../app/screens/SignupScreen";
import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { TouchableWithoutFeedback, TextInput } from "react-native";
import { shallow, configure } from 'enzyme';
import {render, fireEvent} from '@testing-library/react-native';

configure({adapter: new Adapter()});

describe('Test Signup Screen', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<SignupScreen />);
    });

    it("Signup screen renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });

    it("Does basic test", () => {
        const navigate = jest.fn()
        props = {
            navigation: {
                navigate
            }
        }
        const { getByTestId } = render(<SignupScreen {...props}/>);
        fireEvent.changeText(getByTestId('EnterEmail'), 'JESTEmail');
        fireEvent.changeText(getByTestId('EnterPassword'), 'JESTpassword');
        fireEvent.press(getByTestId('SignUpButton'));
        fireEvent.press(getByTestId('NavigateButton'));
        // expect(getByTestId('MobileCurrentPassword').props.value).toEqual('JESTTestPassword');
        expect(navigate).toBeCalledTimes(1); // confirms navigate call
    });

    it("Check keyboard control on press", () => {
        const container = shallow(<SignupScreen />);
        const keyboardControl = container.find(TouchableWithoutFeedback).at(0); // finds onPresss => keyboardControl()
        keyboardControl.props().onPress(); // calls keyboardControl()
        expect(keyboardControl.exists());
    })

    it("Simulate sign up button on press", () => {
        const container = shallow(<SignupScreen />);
        const signUp = container.find(TouchableWithoutFeedback).at(1); // finds onPress => Alert else testOrAPI()
        signUp.props().onPress(); // calls Alert b/c username, password, email are blank
        expect(signUp.exists());
    })

    it("Check welcome screen navigation on sign up press", () => {
        const navigate = jest.fn();
        const props = {
            navigation: {
                navigate
            }
        }
        const container = shallow(<SignupScreen {...props} />);
        const welcome = container.find(TouchableWithoutFeedback).last(); // finds onPress => props.navigation.navigate()
        welcome.props().onPress(); // calls props.navigation.navigate()
        expect(welcome.exists());
        expect(navigate.mock.calls[0][0]).toBe('Welcome'); // navigation navigates to the welcome screen
    })

});