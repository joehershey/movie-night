import Filters from "../../app/components/Filters";
import React from 'react';
import renderer from 'react-test-renderer';

describe('Test Filters', () => {
    beforeEach( async () => {
        props = {
            genres: "Action",
            watchProviders: "Hulu"
        }
        global.tree = renderer.create(<Filters {...props}/>);
    });

    it("Filters renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });
});