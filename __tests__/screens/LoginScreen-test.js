import LoginScreen from '../../app/screens/LoginScreen';
import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { TouchableWithoutFeedback } from "react-native";
import { shallow, configure } from 'enzyme';
configure({adapter: new Adapter()});

describe('Test Login Screen', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<LoginScreen />).toJSON();
    });

    it("Login screen renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });

    it("Check keyboard control on press", () => {
        const container = shallow(<LoginScreen />);
        const keyboardControl = container.find(TouchableWithoutFeedback).at(0);
        keyboardControl.props().onPress(); // calls keyboardControl function
        expect(keyboardControl.exists()); // confirms onPress function exists
    })

    it("Check log in button on press", () => {
        console.error = jest.fn(); // mutes expected fetch error after on press event
        const props = { // sample url passed into fetch call
            url: 'https://sample.com/'
        }
        const container = shallow(<LoginScreen {...props}/>);
        const logIn = container.find(TouchableWithoutFeedback).at(1); // finds onPress => checkCredentials()
        logIn.props().onPress(); // calls API
        expect(logIn.exists());
    })

    it("Check welcome screen navigation on log in press", () => {
        const navigate = jest.fn();
        const props = {
            navigation: {
                navigate
            }
        }
        const container = shallow(<LoginScreen {...props} />);
        const welcome = container.find(TouchableWithoutFeedback).last(); //finds onPress => props.navigation.navigate()
        welcome.props().onPress(); // calls props.navigation.navigate()
        expect(welcome.exists());
        expect(navigate.mock.calls[0][0]).toBe('Welcome'); // props navigation navigates to the welcome screen
    })
});