import GroupSettingsScreen from '../../app/screens/GroupSettingsScreen';
import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react-native';

import { TouchableWithoutFeedback } from "react-native";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import GroupSettings from '../../app/components/GroupSettings';


configure({adapter: new Adapter()});

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

    it("Access group settings and simulate setting value functions", () => {
        props = {
            isAdmin: true
        }
        const container = shallow(<GroupSettingsScreen {...props} />);
        const groupSettings = container.find(GroupSettings); // finds group settings block
        console.log(container.debug())
        //simulate group settings
        groupSettings.props().setMaxMovies("5");
        groupSettings.props().setGroupName("test");
        groupSettings.props().changeGroupSettingsAPI();
        groupSettings.props().setCode();
    });

    it("Does basic test", () => {
        // const toggleShowPopup = jest.fn()
        const isAdmin = true;
        props = {
            isAdmin
        }
        const { getByTestId } = render(<GroupSettingsScreen {...props}/>);
        fireEvent.press(getByTestId('NewCodeButton'));

        //fireEvent.changeText(getByTestId('EditGroupName'), 'JESTGroupName');
        //fireEvent.changeText(getByTestId('EditMaxMoviesPerUser'), '2');
        // fireEvent.press(getByTestId('ChangeGroupSettingsButton'));

        // expect(getByTestId('MobileCurrentPassword').props.value).toEqual('JESTTestPassword');
    });
});