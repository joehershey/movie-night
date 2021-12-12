import ScheduleScreen from '../../app/screens/ScheduleScreen';
import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react-native';

describe('Test Schedule Screen', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<ScheduleScreen />).toJSON();
    });

    it("Schedule screen renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });

    it("Does basic test", () => {
        // const toggleShowPopup = jest.fn()
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