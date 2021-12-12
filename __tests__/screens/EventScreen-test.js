import EventScreen from '../../app/screens/EventScreen';
import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react-native';

describe('Test Event Screen', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<EventScreen />).toJSON();
    });

    it("Event screen renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });

    it("Does basic test", () => {
        //const toggleShowPopup = jest.fn()
        props = {
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