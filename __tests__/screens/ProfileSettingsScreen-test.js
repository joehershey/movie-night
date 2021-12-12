import ProfileSettingsScreen from '../../app/screens/ProfileSettingsScreen';
import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react-native';

describe('Test Profile Settings Screen', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<ProfileSettingsScreen />).toJSON();
    });

    it("Profile settings screen renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });

    it("Does basic test", () => {
        // const toggleShowPopup = jest.fn()
        props = {
        }
        const { getByTestId } = render(<ProfileSettingsScreen {...props}/>);
        fireEvent.press(getByTestId('ChangePasswordButton'));
        fireEvent.press(getByTestId('NavigateButton'));  // Fails because cannot read navigate of undefined
        fireEvent.press(getByTestId('DeleteAccountButton'));
        // expect(getByTestId('MobileCurrentPassword').props.value).toEqual('JESTTestPassword');
    });
});