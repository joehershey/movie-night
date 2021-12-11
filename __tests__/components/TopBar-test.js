import TopBar from "../../app/components/TopBar";
import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { TouchableWithoutFeedback } from "react-native";
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

describe('Test Top Bar', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<TopBar />);
    });

    it("Top bar renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });

    it("Check for onPress navigation function and simulate press", () => {
        navigate = jest.fn();
        props = {
            navigation: {
                navigate
            },
            screen: "test"
        }
        const container = shallow(<TopBar {...props} />);
        const onPress = container.find(TouchableWithoutFeedback).at(0); // finds onPress => props.navigation.navigate(props.screen)
        onPress.props().onPress(); // calls navigate(props.screen)
        expect(onPress.exists());
        expect(navigate.mock.calls[0][0]).toBe("test")
    });

    it("Check for user profile button from Welcome screen and simulate press", () => {
        navigate = jest.fn();
        props = {
            navigation: {
                navigate
            },
            screen: "Welcome"
        }
        const container = shallow(<TopBar {...props} />);
        const onPress = container.find(TouchableWithoutFeedback).at(1); // finds onPress => props.navigation.navigate("Profile")
        onPress.props().onPress(); // calls navigate("Profile")
        expect(onPress.exists());
        expect(navigate.mock.calls[0][0]).toBe("Profile");
    });
});