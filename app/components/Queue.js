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

import fetch from "cross-fetch";

function Queue(props) {
  var movies = [];
  const [htmlMovies, setHtmlMovies] = useState([]);

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      movies = [];
      setHtmlMovies([]);
      getMovies();
    });

    return unsubscribe;
  }, [props.navigation]);

  function getMovies(loadMore = false) {
    fetch(props.url + "group/" + props.group_id + "/movies/" + props.user_id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + props.token,
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        movies = [];
        console.log(responseJson);
        for (const [i, movie] of responseJson.entries()) {
          movies.push(movie);
          console.log(movie);
          addMovieData(movie, i, i == responseJson.length - 1);
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
        if (!set) return;
        movies.sort((a, b) => (a.avg_user_rating < b.avg_user_rating ? 1 : -1));
        setHtmlMovies(movies);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function setRatingAPI(rating, id) {
    fetch(
      props.url + "user/" + props.user_id + "/" + props.group_id + "/rating",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + props.token,
        },
        method: "PATCH",
        body: JSON.stringify({
          tmdb_movie_id: id,
          user_rating: rating,
        }),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        console.log(`set ${id} to ${rating}`);
      })
      .catch((error) => {
        console.error(error);
      });

    console.log("*****" + rating + "*****");
  }

  function deleteMovieAPI(movieId) {
    fetch(props.url + "group/" + props.group_id + "/movie/" + movieId, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + props.token,
      },
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        console.log(`deleted ${movieId}`);
        getMovies();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const moviesToRender = [];
  for (const [i, movie] of htmlMovies.entries()) {
    console.log("*****");
    if (!movie.data || !movie) {
      getMovies();
      break;
    }
    moviesToRender.push(
      /* Collapsable card with member info/edit if admin */
      <Movie
        key={i}
        url={props.url}
        user_id={props.user_id}
        group_id={props.group_id}
        token={props.token}
        movie={movie.data}
        isAdmin={props.isAdmin}
        avg_user_rating={movie.avg_user_rating}
        added_by={movie.added_by}
        user_rating={movie.user_rating}
        setRatingAPI={(rtg, id) => setRatingAPI(rtg, id)}
        deleteMovieAPI={(id) => deleteMovieAPI(id)}
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
