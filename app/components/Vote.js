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

  const BASEURL = "https://api.themoviedb.org/3/";
  const APIKEY = "?api_key=3eb4bede8c2782fba9b6b7cd9c56b62c";

  /*  function getEventMovies() {
    fetch(props.url + "event/" + props.event_id + "/movies", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + props.token,
      },
      method: "PATCH",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        movies = [];
        console.log(responseJson);
        for (const [i, movie_id] of responseJson.entries()) {
          movies.push(movie_id);
          console.log(movie_id);
          addMovieData(movie_id, i, i == responseJson.length - 1);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function addMovieData(movie_id, idx, set = false) {
    let TEST = BASEURL + "movie/" + movie_id + APIKEY;
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
        event_id={props.event}
        user_id={props.user_id}
        group_id={props.group_id}
        token={props.token}
      ></VoteMovie>
    );
  } */

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
        <VoteMovie txt={"hello"}></VoteMovie>
      </ScrollView>
    </View>
  );
}

export default Vote;
