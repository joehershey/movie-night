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

    it("Find onPress events and simulate press", () => {
        const navigate = jest.fn()
        props = {
            navigation: {
                navigate
            }
        }
        const { getByTestId } = render(<ProfileSettingsScreen {...props}/>);
        fireEvent.press(getByTestId('ChangePasswordButton')) // calls onPress () => toggleShowPopup()
        fireEvent.press(getByTestId('NavigateButton')); // calls onPress props.navigation.navigate("Welcome")
        fireEvent.press(getByTestId('DeleteAccountButton')); // calls onPress () => toggleShowDelete()
        //console.log(getByTestId('MobileCurrentPassword').props).toEqual('JESTTestPassword');
        expect(navigate).toBeCalledTimes(1); // confirms navigate call
    });
});