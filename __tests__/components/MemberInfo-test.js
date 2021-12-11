import MemberInfo from "../../app/components/MemberInfo";
import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { TouchableWithoutFeedback } from "react-native";
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

describe('Test Member Info', () => {
    beforeEach( async () => {
        props = {
            member: {
                display_name: "defined"
            }
        }
        global.tree = renderer.create(<MemberInfo {...props}/>);
    });

    it("Member info renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });

    it("Simulate show admin privelages", () => {
        props = {
            member: {
                display_name: "defined"
            },
            isAdmin: true
        }
        const container = shallow(<MemberInfo {...props}/>);
        const admin = container.find(TouchableWithoutFeedback).at(0); // finds onPress => setExpanded() to show admin privelages
        admin.props().onPress(); // calls setExpanded()
        expect(admin.exists());
    });

    it("Show admin privelages and simulate promote to admin", () => {
        setAdminStatusAPI = jest.fn()
        props = {
            member: {
                display_name: "defined"
            },
            isAdmin: true,
            setAdminStatusAPI
        }
        const container = shallow(<MemberInfo {...props}/>);
        const admin = container.find(TouchableWithoutFeedback).at(0); // finds onPress => setExpanded() to show admin privelages
        admin.props().onPress(); // calls setExpanded()
        const onPress = container.find(TouchableWithoutFeedback).at(1); // finds promote to admin button
        onPress.props().onPress();
        expect(onPress.exists());
        expect(setAdminStatusAPI).toBeCalledTimes(1);
    });

    it("Show admin privelages and simulate promote to admin", () => {
        removeFromGroupAPI = jest.fn()
        props = {
            member: {
                display_name: "defined"
            },
            isAdmin: true,
            removeFromGroupAPI
        }
        const container = shallow(<MemberInfo {...props}/>);
        const admin = container.find(TouchableWithoutFeedback).at(0); // finds onPress => setExpanded() to show admin privelages
        admin.props().onPress(); // calls setExpanded()
        const onPress = container.find(TouchableWithoutFeedback).at(2); // finds kick from group button
        onPress.props().onPress(); // simulates remove from group function
        expect(onPress.exists());
        expect(removeFromGroupAPI).toBeCalledTimes(1);
    });

    it("Simulate member privelages and press leave group", () => {
        leaveGroup = jest.fn();
        props = {
            member: {
                display_name: "defined"
            },
            isAdmin: false,
            isUser: true,
            leaveGroup
        }
        const container = shallow(<MemberInfo {...props}/>);
        const user = container.find(TouchableWithoutFeedback).at(0); // finds onPress => setExpanded() to show user privelages
        user.props().onPress(); // calls setExpanded()
        const onPress = container.find(TouchableWithoutFeedback).last(); // finds onPress function
        onPress.props().onPress(); // simulates onPress event calling leaveGroup
        expect(onPress.exists());
        expect(leaveGroup).toBeCalledTimes(1);
    });

    it("Simulate member privelages and attempt to edit alias API", () => {
        leaveGroup = jest.fn();
        props = {
            member: {
                display_name: "defined"
            },
            isAdmin: false,
            isUser: true,
        }
        const container = shallow(<MemberInfo {...props}/>);
        const user = container.find(TouchableWithoutFeedback).at(0); // finds onPress => setExpanded() to show user privelages
        user.props().onPress(); // calls setExpanded()
        const onPress = container.find(TouchableWithoutFeedback).at(0); // finds onPress event to set alias, does not run b/c alias.length is undefined
        onPress.props().onPress(); // calls onpress, does not pass conditional
        expect(onPress.exists());
    });

    it("Simulate member privelages and set edit alias to false", () => {
        leaveGroup = jest.fn();
        props = {
            member: {
                display_name: "defined"
            },
            isAdmin: false,
            isUser: true,
        }
        const container = shallow(<MemberInfo {...props}/>);
        const user = container.find(TouchableWithoutFeedback).at(0); // finds onPress => setExpanded() to show user privelages
        user.props().onPress(); // calls setExpanded()
        const onPress = container.find(TouchableWithoutFeedback).at(1); // finds onPress event to call setEditAlias(false)
        onPress.props().onPress(); // calls setEditAlias(false)
        expect(onPress.exists());
    });
});
