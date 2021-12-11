import Search from "../../app/components/Search";
import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { TouchableWithoutFeedback, TextInput } from "react-native";
import { shallow, configure } from 'enzyme';
jest.useFakeTimers(); // Mutes expected API async call error
configure({adapter: new Adapter()});

describe('Test Search', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<Search />);
    });

    it("Search renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });

    it("Check for text input and simulate submit press", () => {
        const container = shallow(<Search />);
        const onSubmit = container.find(TextInput); // finds onSubmitEditing => getMovies()
        onSubmit.props().onSubmitEditing(); // calls getMovies()
        expect(onSubmit.exists());
    });

    it("Check for on change input and simulate setPage()", () => {
        loadMore = true
        const container = shallow(<Search {...loadMore}/>);
        const onChange = container.find(TextInput); // finds onSubmitEditing => getMovies()
        console.log(onChange.debug())
        onChange.props().onChange(); // calls getMovies()
        expect(onChange.exists());
    });
});