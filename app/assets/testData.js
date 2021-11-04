import React from "react";

export var TEST_DATA = {
  users: [
    {
      user_id: 1,
      username: "user1",
      email: "user1@gmail.com",
    },
    {
      user_id: 2,
      username: "user2",
      email: "user2@gmail.com",
    },
    {
      user_id: 3,
      username: "user3",
      email: "user3@gmail.com",
    },
    {
      user_id: 4,
      username: "user4",
      email: "user4@gmail.com",
    },
    {
      user_id: 5,
      username: "user5",
      email: "user5@gmail.com",
    },
  ],
  groups: [
    {
      group_id: 1,
      group_name: "group1",
      created_by: 1,
    },
    {
      group_id: 2,
      group_name: "group2",
      created_by: 2,
    },
  ],
  group_users: [
    {
      group_id: 1,
      user_id: 1,
      alias: "alias11",
      is_admin: 1,
    },
    {
      group_id: 1,
      user_id: 3,
      alias: "alias31",
      is_admin: 0,
    },
    {
      group_id: 1,
      user_id: 4,
      alias: "alias41",
      is_admin: 0,
    },
    {
      group_id: 1,
      user_id: 5,
      alias: "alias51",
      is_admin: 0,
    },
    {
      group_id: 2,
      user_id: 2,
      alias: "alias22",
      is_admin: 1,
    },
    {
      group_id: 2,
      user_id: 3,
      alias: "alias32",
      is_admin: 0,
    },
    {
      group_id: 2,
      user_id: 4,
      alias: "alias42",
      is_admin: 1,
    },
  ],
  group_movies: [
    {
      group_id: 1,
      tmdb_movie_id: 1000,
      added_by: 1,
    },
    {
      group_id: 1,
      tmdb_movie_id: 1001,
      added_by: 3,
    },
    {
      group_id: 1,
      tmdb_movie_id: 1002,
      added_by: 4,
    },
    {
      group_id: 1,
      tmdb_movie_id: 1005,
      added_by: 5,
    },
    {
      group_id: 2,
      tmdb_movie_id: 1000,
      added_by: 2,
    },
    {
      group_id: 2,
      tmdb_movie_id: 1003,
      added_by: 2,
    },
    {
      group_id: 2,
      tmdb_movie_id: 1004,
      added_by: 3,
    },
  ],
  group_movie_ratings: [
    {
      group_id: 1,
      user_id: 1,
      tmdb_movie_id: 1000,
      rating: 9,
    },
    {
      group_id: 1,
      user_id: 3,
      tmdb_movie_id: 1000,
      rating: 7,
    },
    {
      group_id: 1,
      user_id: 4,
      tmdb_movie_id: 1000,
      rating: 5,
    },
    {
      group_id: 1,
      user_id: 5,
      tmdb_movie_id: 1000,
      rating: 10,
    },

    {
      group_id: 1,
      user_id: 1,
      tmdb_movie_id: 1001,
      rating: 2,
    },
    {
      group_id: 1,
      user_id: 3,
      tmdb_movie_id: 1001,
      rating: 3,
    },
    {
      group_id: 1,
      user_id: 4,
      tmdb_movie_id: 1001,
      rating: 5,
    },
    {
      group_id: 1,
      user_id: 5,
      tmdb_movie_id: 1001,
      rating: 5,
    },

    {
      group_id: 1,
      user_id: 1,
      tmdb_movie_id: 1002,
      rating: 10,
    },
    {
      group_id: 1,
      user_id: 3,
      tmdb_movie_id: 1002,
      rating: 5,
    },
    {
      group_id: 1,
      user_id: 4,
      tmdb_movie_id: 1002,
      rating: 10,
    },
    {
      group_id: 1,
      user_id: 5,
      tmdb_movie_id: 1002,
      rating: 10,
    },

    {
      group_id: 1,
      user_id: 1,
      tmdb_movie_id: 1005,
      rating: 10,
    },
    {
      group_id: 1,
      user_id: 3,
      tmdb_movie_id: 1005,
      rating: 5,
    },
    {
      group_id: 1,
      user_id: 4,
      tmdb_movie_id: 1005,
      rating: 10,
    },
    {
      group_id: 1,
      user_id: 5,
      tmdb_movie_id: 1005,
      rating: 10,
    },

    {
      group_id: 2,
      user_id: 2,
      tmdb_movie_id: 1000,
      rating: 8,
    },
    {
      group_id: 1,
      user_id: 3,
      tmdb_movie_id: 1000,
      rating: 5,
    },
    {
      group_id: 1,
      user_id: 4,
      tmdb_movie_id: 1000,
      rating: 6,
    },

    {
      group_id: 2,
      user_id: 2,
      tmdb_movie_id: 1003,
      rating: 6,
    },
    {
      group_id: 1,
      user_id: 3,
      tmdb_movie_id: 1003,
      rating: 7,
    },
    {
      group_id: 1,
      user_id: 4,
      tmdb_movie_id: 1003,
      rating: 1,
    },

    {
      group_id: 2,
      user_id: 2,
      tmdb_movie_id: 1004,
      rating: 3,
    },
    {
      group_id: 1,
      user_id: 3,
      tmdb_movie_id: 1004,
      rating: 5,
    },
    {
      group_id: 1,
      user_id: 4,
      tmdb_movie_id: 1004,
      rating: 5,
    },
  ],
  events: [
    {
      event_id: 1,
      group_id: 1,
      start_time: 100, // change -> datetime
      location: "House 1",
      genre: 1,
      tmdb_movie_id: 1000,
      organized_by: 1,
      voting_mode: 1,
    },
    {
      event_id: 2,
      group_id: 1,
      start_time: 101, // change -> datetime
      location: "House 3",
      genre: 1,
      tmdb_movie_id: 0,
      organized_by: 3,
      voting_mode: 0,
    },
  ],
  rsvp: [
    {
      event_id: 1,
      user_id: 1,
      is_coming: 1,
    },
    {
      event_id: 1,
      user_id: 3,
      is_coming: 1,
    },
    {
      event_id: 1,
      user_id: 4,
      is_coming: 1,
    },
    {
      event_id: 1,
      user_id: 5,
      is_coming: 0,
    },

    {
      event_id: 2,
      user_id: 1,
      is_coming: 0,
    },
    {
      event_id: 2,
      user_id: 3,
      is_coming: 1,
    },
    {
      event_id: 2,
      user_id: 4,
      is_coming: 0,
    },
    {
      event_id: 2,
      user_id: 5,
      is_coming: 0,
    },
  ],
  event_movies: [
    {
      event_id: 1,
      tmdb_movie_id: 1000,
    },
  ],
  event_movie_ratings: [
    {
      event_id: 1,
      user_id: 1,
      tmdb_movie_id: 1000,
      rating: 2, // 0-2
    },
    {
      event_id: 1,
      user_id: 3,
      tmdb_movie_id: 1000,
      rating: 2, // 0-2
    },
    {
      event_id: 1,
      user_id: 4,
      tmdb_movie_id: 1000,
      rating: 1, // 0-2
    },
  ],

  group_data: {
    group_id: 1,
    group_name: "group1",
    members: [
      {
        user_id: 1,
        display_name: "alias11",
        is_admin: 1,
      },
      {
        user_id: 3,
        display_name: "alias31",
        is_admin: 0,
      },
      {
        user_id: 4,
        display_name: "alias41",
        is_admin: 0,
      },
      {
        user_id: 5,
        display_name: "alias51",
        is_admin: 0,
      },
    ],
    max_user_movies: 10,
  },
};
