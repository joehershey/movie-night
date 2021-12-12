import EventScreen from '../../app/screens/EventScreen';
import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react-native';

import Adapter from 'enzyme-adapter-react-16';
import { TouchableWithoutFeedback } from "react-native";
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

describe('Test Event Screen', () => {
    it("Does basic test", () => {
        //const toggleShowPopup = jest.fn()
        console.error = jest.fn();
        props = {
            url: "https://sample.com/",
            is_admin: true
        }
        const { getByTestId } = render(<EventScreen {...props}/>);
        // FIXME: need to set state somehow to use these
        //fireEvent.press(getByTestId('StartVoteButton'));
        //fireEvent.press(getByTestId('VoteButton'));
        fireEvent.press(getByTestId('GoingButton'));
        fireEvent.press(getByTestId('NotGoingButton'));

        // expect(getByTestId('MobileCurrentPassword').props.value).toEqual('JESTTestPassword');
    });
    
});