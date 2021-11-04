import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  SafeAreaView,
  TextInput,
} from "react-native";

import { COLORS, STYLES } from "../assets/saved";
import { FontAwesome5 } from "@expo/vector-icons";

import TabBar from "../components/TabBar";
import TopBar from "../components/TopBar";

function SearchMoviesScreen(props) {
  const [movieId, setMovieId] = useState("");
  const [movie, setMovie] = useState("");

  /* API call endpoint for getMovieByID */
  const BASEURL = "https://api.themoviedb.org/3/";
  const APIKEY = "?api_key=3eb4bede8c2782fba9b6b7cd9c56b62c";

  function getMovieByID(tmdb_movie_id) {
    let TEST = BASEURL + "movie/" + tmdb_movie_id + APIKEY;
    fetch(TEST, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setMovie(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <SafeAreaView style={STYLES.container}>
      {/* Top Bar */}
      <TopBar
        navigation={props.navigation}
        screen="Landing"
        message="Groups"
      ></TopBar>
      {/* Content */}
      <View style={STYLES.content}>
        <TextInput
          style={[STYLES.input, STYLES.settingsInput]}
          onChangeText={setMovieId}
          textAlign="center"
          value={movieId}
          placeholder="Movie id (Try 278)"
        />
        <TouchableWithoutFeedback onPress={() => getMovieByID(movieId)}>
          <View
            style={[
              STYLES.btn,
              {
                backgroundColor: COLORS.secondary,
                width: "50%",
                alignSelf: "center",
              },
            ]}
          >
            <Text>Get movie {movieId}</Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={{ alignItems: "flex-start", padding: 10 }}>
          <Text>Title: {movie.title}</Text>
        </View>
        <View style={{ alignItems: "flex-start", padding: 10 }}>
          <Text>Description: {movie.overview}</Text>
        </View>
      </View>
      {/* Tabs */}
      <TabBar navigation={props.navigation} screen="search"></TabBar>
    </SafeAreaView>
  );
}

export default SearchMoviesScreen;
