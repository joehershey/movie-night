import ChangePassword from "../../app/components/ChangePassword";
import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react-native';
import Adapter from 'enzyme-adapter-react-16';
import { TouchableWithoutFeedback } from "react-native";
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

describe('Test Change Password', () => {
    beforeEach( async () => {
        global.tree = renderer.create(<ChangePassword />);
    })

    it("Change password renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });

    it("Check for iOS keyboardControl and simulate press", () => {
        const container = shallow(<ChangePassword />);
        const keyboardControl = container.find(TouchableWithoutFeedback).at(0); // finds onPress => keyboardControl()
        keyboardControl.props().onPress(); // calls keyboardControl()
        expect(keyboardControl.exists());
    });

    it("Check for submit button and simulate press with no password input", () => {
        alert = jest.fn() // simulates alert functions that onPress calls
        const container = shallow(<ChangePassword {...alert} />);
        const onSubmit = container.find(TouchableWithoutFeedback).at(1); // finds onPress => onSubmit
        onSubmit.props().onPress(); // simulate onSubmit function, does not run else statement b/c password values aren't set
        expect(onSubmit.exists());
    });
    
    it("Changes password with all three entries the same", () => {
        alert = jest.fn() // simulates alert functions that onPress calls
        const toggleShowPopup = jest.fn()
        props = {
            toggleShowPopup
        }
        const { getByTestId } = render(<ChangePassword {...props}/>);
        fireEvent.changeText(getByTestId('MobileCurrentPassword'), 'JESTTestPassword');
        fireEvent.changeText(getByTestId('MobileNewPassword'), 'NEWJESTTestPassword');
        fireEvent.changeText(getByTestId('MobileConfirmNewPassword'), 'NEWJESTTestPassword');
        fireEvent.press(getByTestId('MobileSubmitButton'));
        fireEvent.press(getByTestId('MobileConfirmButton'));
        // expect(getByTestId('MobileCurrentPassword').props.value).toEqual('JESTTestPassword');
    });

    it("Changes password with newPassword != confirmPassword", () => {
        alert = jest.fn() // simulates alert functions that onPress calls
        const toggleShowPopup = jest.fn()
        props = {
            toggleShowPopup
        }
        const { getByTestId } = render(<ChangePassword {...props}/>);
        fireEvent.changeText(getByTestId('MobileCurrentPassword'), 'JESTTestPassword');
        fireEvent.changeText(getByTestId('MobileNewPassword'), 'NEWJESTTestPassword');
        fireEvent.changeText(getByTestId('MobileConfirmNewPassword'), 'NOTNEWJESTTestPassword');
        fireEvent.press(getByTestId('MobileSubmitButton'));
        fireEvent.press(getByTestId('MobileConfirmButton'));

        // expect(getByTestId('MobileSubmitButton').exists());
        // expect(getByTestId('MobileCurrentPassword').props.value).toEqual('JESTTestPassword');
    });

    it("Find and simulate onPress => onClose function", () => {
        const toggleShowPopup = jest.fn()
        props = {
            toggleShowPopup
        }
        const container = shallow(<ChangePassword {...props}/>);
        const onClose = container.find(TouchableWithoutFeedback).at(2); // finds onPress => onClose
        onClose.props().onPress(); // simulates onClose function, toggleShowPopup is run as a dummy function
        expect(onClose.exists());
        expect(toggleShowPopup.mock.calls[0][0]).toBe(false) // toggleShowPopup value is false in onClose
    });

    it("Check for close button and simulate press", () => {
        const container = shallow(<ChangePassword />);
        const toggleShowConfirm = container.find(TouchableWithoutFeedback).at(3); // finds onPress => toggleShowConfirm() on line 312
        toggleShowConfirm.props().onPress() // calls the function
        expect(toggleShowConfirm.exists())
    });

});
