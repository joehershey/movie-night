import ChangePassword from "../../app/components/ChangePassword";
import React from 'react';
import renderer from 'react-test-renderer';
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

    it("test buttons", () => {
        const container = shallow(<ChangePassword />);
        console.log(container.debug())
        console.log(container.props())
    });
});
