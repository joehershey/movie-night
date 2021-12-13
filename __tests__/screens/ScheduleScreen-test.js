import ScheduleScreen from '../../app/screens/ScheduleScreen';
import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react-native';

describe('Test Schedule Screen', () => {
    it("Does basic test", () => {
        // const toggleShowPopup = jest.fn()
        console.error = jest.fn();
        props = {
        }
        const { getByTestId } = render(<ScheduleScreen {...props}/>);
        fireEvent.changeText(getByTestId('MovieNightName'), 'JESTMovieNight');
        fireEvent.changeText(getByTestId('MovieNightLocation'), 'JESTLocation');
        //fireEvent.chanage(getByTestId('DateTimePick'));
        fireEvent.press(getByTestId('SubmitButton'));
        fireEvent.press(getByTestId('ClearButton'));
        // expect(getByTestId('MobileCurrentPassword').props.value).toEqual('JESTTestPassword');
    });
});