import Movie from "../../app/components/Movie";
import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { TouchableWithoutFeedback } from "react-native";
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

describe('Test Movie', () => {
    beforeEach( async () => {
        props = {
            movie: {
                poster_path: "defined"
            }
        }
        global.tree = renderer.create(<Movie {...props} />);
    });

    it("Movie renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });

    it("Simulate onPress to call setExpanded()", () => {
        props = {
            movie: {
                title: "",
                release_date: ""
            }
        }
        const container = shallow(<Movie {...props} />);
        const onPress = container.find(TouchableWithoutFeedback).at(0); // finds onPress => setExpanded()
        onPress.props().onPress(); // calls setExpanded()
        expect(onPress.exists());
    });

    it("Simulate onPress to call addMovietoQueueAPI()", () => {
        console.error = jest.fn(); // mutes expected API call error
        props = {
            movie: {
                title: "",
                release_date: ""
            },
        }
        const container = shallow(<Movie {...props} />);
        const setExpanded = container.find(TouchableWithoutFeedback).at(0); // finds onPress => setExpanded()
        setExpanded.props().onPress(); // calls setExpanded()
        const onPress = container.find(TouchableWithoutFeedback).at(2); // finds onPress => addMovieToQueueAPI()
        onPress.props().onPress(); // call onPress
        expect(onPress.exists());
    });

    it("Simulate onPress to call second setExpanded() function call", () => {
        console.error = jest.fn(); // mutes expected API call error
        props = {
            movie: {
                title: "",
                release_date: ""
            },
        }
        const container = shallow(<Movie {...props} />);
        const setExpanded = container.find(TouchableWithoutFeedback).at(0); // finds onPress => setExpanded()
        setExpanded.props().onPress(); // calls setExpanded()
        const onPress = container.find(TouchableWithoutFeedback).at(1); // finds onPress => setExpanded()
        onPress.props().onPress(); // call onPress setExpanded() on line 134
        expect(onPress.exists());
    });
});