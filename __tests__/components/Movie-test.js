import Movie from "../../app/components/Movie";
import React from 'react';
import renderer from 'react-test-renderer';

describe('Test Movie', () => {
    beforeEach( async () => {
        props = {
            movie: {
                poster_path: "defined"
            }
        }
        global.tree = renderer.create(<Movie {...props} />);
    });

    it("Movie renders properly", async () => {
        await expect(global.tree).toMatchSnapshot();
    });
});