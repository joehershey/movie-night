import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";

import { COLORS, STYLES } from "../assets/saved";
import { FontAwesome5 } from "@expo/vector-icons";

import Movie from "../components/Movie";
import Filters from "../components/Filters";

function Queue(props) {
  const [page, setPage] = useState(1);
  const [watchProviders, setWatchProviders] = useState([]);
  const [genres, setGenres] = useState([]);
  var movies = [];
  const [htmlMovies, setHtmlMovies] = useState([]);

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      getMovies();
    });

    return unsubscribe;
  }, [props.navigation]);

  function getMovies(loadMore = false) {
    fetch(props.url + "group/" + props.group_id + "/movies/" + props.user_id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        movies = [];
        console.log(responseJson);
        let test = [
          { tmdb_movie_id: 566525, group_rating: 4.7, user_rating: 5 },
          { tmdb_movie_id: 438631, group_rating: 9.2, user_rating: 5 },
          { tmdb_movie_id: 580489, group_rating: 7.3, user_rating: 5 },
          { tmdb_movie_id: 574060, group_rating: 1.3, user_rating: 5 },
          { tmdb_movie_id: 630004, group_rating: 3.3, user_rating: 5 },
        ];
        for (const [i, movie] of test.entries()) {
          movies.push(movie);
          console.log(movie);
          addMovieData(movie, i, i == test.length - 1);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const BASEURL = "https://api.themoviedb.org/3/";
  const APIKEY = "?api_key=3eb4bede8c2782fba9b6b7cd9c56b62c";

  function addMovieData(movie, idx, set = false) {
    let TEST = BASEURL + "movie/" + movie.tmdb_movie_id + APIKEY;
    //let TEST = BASEURL + "movie/" + 72 + APIKEY;
    fetch(TEST, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        movies[idx].data = responseJson;
        console.log(movies[idx]);
        if (!set) return;
        movies.sort((a, b) => (a.group_rating < b.group_rating ? 1 : -1));
        setHtmlMovies(movies);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function setRatingAPI(rating) {
    console.log("*****" + rating + "*****");
  }

  const moviesToRender = [];
  for (const [i, movie] of htmlMovies.entries()) {
    console.log(movie.data);
    moviesToRender.push(
      /* Collapsable card with member info/edit if admin */
      <Movie
        key={i}
        url={props.url}
        user_id={props.user_id}
        group_id={props.group_id}
        movie={movie.data}
        group_rating={movie.group_rating}
        user_rating={movie.user_rating}
        setRatingAPI={(rtg) => setRatingAPI(rtg)}
      ></Movie>
    );
  }

  return (
    <View style={{ flex: 11 }}>
      <ScrollView
        style={{
          flexDirection: "column",
        }}
        contentContainerStyle={{
          justifyContent: "flex-start",
          alignItems: "stretch",
        }}
      >
        {/* <Filters
          genres={genres}
          watchProviders={watchProviders}
          setGenres={() => setGenres}
          setWatchProviders={() => setWatchProviders}
          getMovies={() => getMovies()}
          setPage={(a) => console.log("N/A")}
        ></Filters> */}

        {moviesToRender}

        <View style={{ height: 50 }}></View>
      </ScrollView>
    </View>
  );
}

export default Queue;
