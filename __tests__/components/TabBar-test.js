import TabBar from "../../app/components/TabBar";
import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { TouchableWithoutFeedback } from "react-native";
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

describe('Test Tab Bar', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<TabBar />);
    });

    it("Tab bar renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });

    it("Check for schedule button and simulate press", () => {
        navigate = jest.fn();
        props = {
            navigation: {
                navigate
            },
            screen: "schedule"
        }
        const container = shallow(<TabBar {...props} />);
        const onPress = container.find(TouchableWithoutFeedback).at(0); // finds onPress => props.navigation.navigate("Schedule")
        onPress.props().onPress(); // calls navigate("Schedule")
        expect(onPress.exists());
        expect(navigate.mock.calls[0][0]).toBe("Schedule")
    });

    it("Check for queue button and simulate press", () => {
        navigate = jest.fn();
        props = {
            navigation: {
                navigate
            },
            screen: "queue"
        }
        const container = shallow(<TabBar {...props} />);
        const onPress = container.find(TouchableWithoutFeedback).at(1); // finds onPress => props.navigation.navigate("GroupQueue")
        onPress.props().onPress(); // calls navigate("GroupQueue")
        expect(onPress.exists());
        expect(navigate.mock.calls[0][0]).toBe("GroupQueue")
    });

    it("Check for search button and simulate press", () => {
        navigate = jest.fn();
        props = {
            navigation: {
                navigate
            },
            screen: "search"
        }
        const container = shallow(<TabBar  {...props} />);
        const onPress = container.find(TouchableWithoutFeedback).at(2); // finds onPress => props.navigation.navigate("SearchMovies")
        onPress.props().onPress(); // calls navigate("SearchMovies")
        expect(onPress.exists());
        expect(navigate.mock.calls[0][0]).toBe("SearchMovies")
    });

    it("Check for settings button and simulate press", () => {
        navigate = jest.fn();
        props = {
            navigation: {
                navigate
            },
            screen: "settings"
        }
        const container = shallow(<TabBar  {...props} />);
        const onPress = container.find(TouchableWithoutFeedback).at(3); // finds onPress => props.navigation.navigate("GroupSettings")
        onPress.props().onPress(); // calls navigate("GroupSettings")
        expect(onPress.exists());
        expect(navigate.mock.calls[0][0]).toBe("GroupSettings")
    });
});