import MemberInfo from "../../app/components/MemberInfo";
import React from 'react';
import renderer from 'react-test-renderer';

describe('Test Member Info', () => {
    beforeEach( async () => {
        props = {
            member: {
                display_name: "defined"
            }
        }
        global.tree = renderer.create(<MemberInfo />);
    });

    it("Member info renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });
});