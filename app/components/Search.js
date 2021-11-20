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

import Movie from "./Movie";

import fetch from "cross-fetch";

function SearchMovie(props) {
  const [page, setPage] = useState(0);
  const [noMore, setNoMore] = useState(false);

  const [query, setQuery] = useState("");
  const [queried, setQueried] = useState("");

  const [movies, setMovies] = useState([]);

  /* API call endpoint for getMovieByID */
  const BASEURL = "https://api.themoviedb.org/3/search/movie";
  const APIKEY = "?api_key=3eb4bede8c2782fba9b6b7cd9c56b62c";
  const RULES1 = "&language=en-US";
  const RULES2 = "&include_adult=false";

  function getMovies(loadMore = false) {
    setQueried(query);
    console.log(page);
    let searchQuery = "&query=" + query;
    let pageQuery;
    if (loadMore) {
      pageQuery = "&page=" + page;
    } else {
      setPage(1);
      pageQuery = "&page=" + 1;
    }
    let TEST = BASEURL + APIKEY + RULES1 + searchQuery + pageQuery + RULES2;
    console.log(TEST);
    fetch(TEST, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (
          responseJson.results?.length < 1 ||
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
        movie={movie}
        url={props.url}
        user_id={props.user_id}
        group_id={props.group_id}
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextInput
            style={[
              STYLES.input,
              {
                flex: 10,
                margin: 15,
                borderColor: COLORS.secondary,
                borderWidth: 2,
              },
            ]}
            onChangeText={setQuery}
            value={query}
            onSubmitEditing={() => getMovies()}
            onChange={() => setPage(1)}
            textAlign="center"
            placeholder="Search..."
          />
          <FontAwesome5
            name="search"
            style={{ margin: 10, flex: 1 }}
            color="lightgrey"
            size={30}
          />
        </View>

        {movies.length == 0 ? (
          <View>
            {queried.length > 0 && (
              <Text style={{ color: "white", alignSelf: "center", margin: 20 }}>
                No matches for "{queried}"
              </Text>
            )}
          </View>
        ) : (
          <View>
            {moviesToRender}

            {!noMore && (
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
          </View>
        )}
        <View style={{ height: 50 }}></View>
      </ScrollView>
    </View>
  );
}

export default SearchMovie;
