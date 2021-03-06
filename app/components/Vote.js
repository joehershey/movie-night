import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";

import { COLORS, STYLES } from "../assets/saved";
import { FontAwesome5 } from "@expo/vector-icons";

import VoteMovie from "./VoteMovie";

import fetch from "cross-fetch";

function Vote(props) {
  const [htmlMovies, setHtmlMovies] = useState([]);
  const [isLoaded, toggleLoaded] = useState(false);
  var movies = [];

  const BASEURL = "https://api.themoviedb.org/3/";
  const APIKEY = "?api_key=3eb4bede8c2782fba9b6b7cd9c56b62c";

  if (!isLoaded) {
    getEventMovies();
    toggleLoaded(true);
  }

  function setRatingAPI(rtg, id) {
    fetch(props.url + "event/rating", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + props.token,
      },
      method: "PATCH",
      body: JSON.stringify({
        event_id: props.event_id,
        user_id: props.user_id,
        tmdb_movie_id: id,
        rating: rtg,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        console.log(`set ${id} to ${rtg}`);
        toggleLoaded(false);
      })
      .catch((error) => {
        console.error(error);
      });

    console.log("*****" + rtg + "*****");
  }

  function getEventMovies() {
    console.log("##$#");
    fetch(props.url + "event/" + props.event_id + "/movies/" + props.user_id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + props.token,
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("@@@");
        console.log(responseJson);
        movies = [];
        let test = [
          {
            tmdb_movie_id: 796499,
            rating: 2,
            event_id: props.event_id,
            user_id: props.user_id,
          },
          {
            tmdb_movie_id: 843241,
            rating: 2,
            event_id: props.event_id,
            user_id: props.user_id,
          },
          {
            tmdb_movie_id: 776821,
            rating: 2,
            event_id: props.event_id,
            user_id: props.user_id,
          },
        ];
        for (const [i, movie_id] of responseJson.entries()) {
          movies.push(movie_id);
          console.log(movie_id);
          addMovieData(movie_id, i, i == responseJson.length - 1);
        }
        /* for (const [i, movie] of test.entries()) {
          movies.push(movie);
          addMovieData(movie, i, i == test.length - 1);
        } */
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function addMovieData(movie, idx, set = false) {
    console.log("hi");
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
        if (!set) return;
        setHtmlMovies(movies);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const moviesToRender = [];
  for (const [i, movie] of htmlMovies.entries()) {
    if (!movie.data || !movie) {
      getEventMovies();
      break;
    }
    moviesToRender.push(
      <VoteMovie
        key={i}
        url={props.url}
        movie={movie.data}
        event_id={props.event_id}
        user_id={props.user_id}
        group_id={props.group_id}
        token={props.token}
        user_rating={movie.rating}
        setRatingAPI={(rtg, id) => setRatingAPI(rtg, id)}
      ></VoteMovie>
    );
  }

  return (
    <View style={{ flex: 11 }}>
      <ScrollView
        style={{
          flexDirection: "column",
        }}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        {moviesToRender}
      </ScrollView>
    </View>
  );
}

export default Vote;
