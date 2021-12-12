import GroupSettingsScreen from '../../app/screens/GroupSettingsScreen';
import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react-native';

describe('Test Group Settings Screen', () => {
    beforeEach( async () => {
        let props = {
            url: "https://sampleURL.com/", 
            user_id: 1
        }
        global.tree = renderer.create(<GroupSettingsScreen {...props} />).toJSON();
    });

    it("Group settings screen renders properly", async () => {
        console.error = jest.fn(); // fixme: mutes FetchError for testing purposes
        await expect(global.tree).toMatchSnapshot();
    });

    it("Does basic test", () => {
        // const toggleShowPopup = jest.fn()
        const isAdmin = true;
        props = {
            isAdmin
        }
        const { getByTestId } = render(<GroupSettingsScreen {...props}/>);
        console.log(getByTestId)
        fireEvent.press(getByTestId('NewCodeButton'));

        //fireEvent.changeText(getByTestId('EditGroupName'), 'JESTGroupName');
        //fireEvent.changeText(getByTestId('EditMaxMoviesPerUser'), '2');
        // fireEvent.press(getByTestId('ChangeGroupSettingsButton'));

        // expect(getByTestId('MobileCurrentPassword').props.value).toEqual('JESTTestPassword');
    });
});