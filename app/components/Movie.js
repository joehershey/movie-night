import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { Card } from "react-native-elements";

import { COLORS, STYLES } from "../assets/saved";
import { FontAwesome5 } from "@expo/vector-icons";

/* This component returns one Card representing a movie searched */
function Movie(props) {
  const [movieId, setMovieId] = useState("");
  const [movie, setMovie] = useState("");
  const [added, setAdded] = useState(false);
  const [expanded, setExpanded] = useState(false); //used when editing alias

  function addMovieToQueueAPI() {
    /* console.log(props.url);
    console.log(props.group_id);
    console.log(props.movie.id);
    console.log(props.user_id);
    fetch(props.url + "group/" + props.group_id + "/movie", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "POST",
      body: JSON.stringify({
        tmdb_movie_id: props.movie.id,
        added_by: props.user_id,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.group_id === undefined) {
          alert("Failed to add movie:" + responseJson.message);
        } else {
          console.log(responseJson);
          setAdded(true);
        }
      })
      .catch((error) => {
        console.error(error);
      }); */

    setAdded(true);
  }
  return (
    <View>
      <Card containerStyle={{ padding: 0, borderRadius: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              margin: 10,
              alignItems: "center",
            }}
          ></View>

          <View
            style={{
              flex: 10,
              padding: 15,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", textAlign: "center" }}>
              {props.movie.title}{" "}
              {props.movie.release_date
                ? "(" + props.movie.release_date.substring(0, 4) + ")"
                : ""}
            </Text>
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              setExpanded(!expanded);
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "white",
                margin: 10,
                alignItems: "center",
              }}
            >
              <FontAwesome5
                name={expanded ? "compress" : "edit"}
                color="grey"
                size={20}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        {expanded && <Card.Divider />}

        {expanded && (
          <View>
            <View style={{ padding: 15 }}>
              <Text>{props.movie.overview}</Text>
            </View>
            <View style={{ flexDirection: "row", margin: 0 }}>
              <TouchableWithoutFeedback onPress={() => addMovieToQueueAPI()}>
                <View
                  style={{
                    margin: 10,
                    marginTop: 0,
                    height: 50,
                    borderRadius: 5,
                    flex: 1,
                    padding: 5,
                    backgroundColor: added ? "#77a2c9" : COLORS.secondary,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {added ? (
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 14,
                          alignContent: "center",
                          margin: 5,
                        }}
                      >
                        Added
                      </Text>
                      <FontAwesome5 color="white" size={20} name="check" />
                    </View>
                  ) : (
                    <Text
                      style={{
                        color: "white",
                        fontSize: 14,
                        alignContent: "center",
                      }}
                    >
                      Add
                    </Text>
                  )}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        )}
      </Card>
    </View>
  );
}

export default Movie;
