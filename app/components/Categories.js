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

import Movie from "../components/Movie";
import Filters from "../components/Filters";

import fetch from "cross-fetch";

function Categories(props) {
  const [page, setPage] = useState(1);
  const [noMore, setNoMore] = useState(false);

  const [watchProviders, setWatchProviders] = useState([]);
  const [genres, setGenres] = useState([]);

  const [movies, setMovies] = useState([]);

  /* API call endpoint for getMovieByID */
  const BASEURL = "https://api.themoviedb.org/3/";
  const APIKEY = "?api_key=3eb4bede8c2782fba9b6b7cd9c56b62c";
  const RULES =
    "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false";
  const REGION = "&watch_region=US";

  /* function getMovieByID(tmdb_movie_id) {
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
        setMovie(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  } */

  function getMovies(loadMore = false) {
    console.log(page);
    let pageQuery;
    if (loadMore) {
      pageQuery = "&page=" + page;
    } else {
      setPage(1);
      pageQuery = "&page=" + 1;
    }
    let watchProvidersQuery =
      "&with_watch_providers=" + watchProviders.join("%7C");
    let genresQuery = "&with_genres=" + genres.join("%7C");
    //https://api.themoviedb.org/3/discover/movie?api_key=3eb4bede8c2782fba9b6b7cd9c
    //56b62c
    //&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false //rules
    //&page=1&with_genres=35%2C10751&with_watch_providers=8&watch_region=US
    let TEST =
      BASEURL +
      "discover/movie" +
      APIKEY +
      RULES +
      pageQuery +
      genresQuery +
      watchProvidersQuery +
      REGION;
    fetch(TEST, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.results);
        if (
          responseJson.results.length < 1 ||
          responseJson.results === undefined
        ) {
          console.log("No results");
          setMovies([]);
        } else {
          if (loadMore) {
            let currMovies = movies;
            setMovies(currMovies.concat(responseJson.results));
            setPage(page + 1);
          } else {
            setMovies(responseJson.results);
            setPage(page + 1);
          }
          if (page + 1 >= responseJson.total_pages) {
            setNoMore(true);
          } else {
            setNoMore(false);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const moviesToRender = [];
  for (const [i, movie] of movies.entries()) {
    moviesToRender.push(
      /* Collapsable card with member info/edit if admin */
      <Movie
        key={i}
        url={props.url}
        user_id={props.user_id}
        group_id={props.group_id}
        movie={movie}
        token={props.token}
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
        <Filters
          genres={genres}
          watchProviders={watchProviders}
          setGenres={() => setGenres}
          setWatchProviders={() => setWatchProviders}
          getMovies={() => getMovies()}
          setPage={(a) => setPage(1)}
          inSearch={true}
        ></Filters>

        {moviesToRender}
        {!noMore && movies.length != 0 && (
          <TouchableWithoutFeedback
            onPress={() => {
              getMovies(true);
            }}
          >
            <View
              style={[
                STYLES.btn,
                {
                  backgroundColor: COLORS.secondary,
                  alignSelf: "center",
                  padding: 15,
                  marginTop: 15,
                  borderRadius: 5,
                },
              ]}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Load More
              </Text>
            </View>
          </TouchableWithoutFeedback>
        )}
        <View style={{ height: 50 }}></View>
      </ScrollView>
    </View>
  );
}

export default Categories;
