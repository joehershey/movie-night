import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Picker,
  TextInput,
} from "react-native";
import { Card } from "react-native-elements";

import { COLORS, STYLES } from "../assets/saved";
import { FontAwesome5 } from "@expo/vector-icons";

/* This component returns one Card representing a movie searched */
function Movie(props) {
  const [movieId, setMovieId] = useState("");
  const [movie, setMovie] = useState("");
  const [edit, setEdit] = useState(false);
  const [added, setAdded] = useState(false);
  const [userRating, setUserRating] = useState(props.user_rating + "");
  const [expanded, setExpanded] = useState(false); //used when editing alias

  const [groupRatingColor, setColor] = useState(getColor());
  var poster = "https://image.tmdb.org/t/p/w500" + props.movie?.poster_path;
  console.log(poster);

  function getColor() {
    console.log("abc:" + props.avg_user_rating);
    if (props.avg_user_rating == null) return "white";
    if (props.avg_user_rating <= 2.0) return "#d13449";
    if (props.avg_user_rating <= 4.0) return "orange";
    if (props.avg_user_rating <= 6.0) return "#ffd900";
    if (props.avg_user_rating <= 8.0) return "green";
    return "#2ce014";
  }

  console.log(groupRatingColor);

  function addMovieToQueueAPI() {
    fetch(props.url + "group/" + props.group_id + "/movie", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + props.token,
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
      });

    setAdded(true);
  }
  return (
    <View>
      <Card containerStyle={{ padding: 0, borderRadius: 10 }}>
        <TouchableWithoutFeedback onPress={() => setExpanded(!expanded)}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ alignSelf: "center", flex: 3 }}>
              <Image
                style={{ width: 200 * 0.3, height: 300 * 0.3, margin: 10 }}
                source={{
                  uri: poster,
                  //uri:
                  //  "https://image.tmdb.org/t/p/w500/1BIoJGKbXjdFDAqUEiA2VHqkK1Z.jpg",
                }}
              />
            </View>

            <View
              style={{
                flex: 8,
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
            {props.avg_user_rating != undefined ? (
              <View
                style={{
                  flex: 2,
                  backgroundColor: groupRatingColor,
                  margin: 10,
                  width: 50,
                  height: 50,
                  borderRadius: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  {props.avg_user_rating}
                </Text>
              </View>
            ) : (
              <TouchableWithoutFeedback
                onPress={() => {
                  setExpanded(!expanded);
                }}
              >
                <View
                  style={{
                    flex: 2,
                    backgroundColor: "white",
                    margin: 10,
                    alignItems: "center",
                  }}
                >
                  <FontAwesome5
                    name={expanded ? "compress" : "info"}
                    color="grey"
                    size={20}
                  />
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>
        </TouchableWithoutFeedback>
        {expanded && <Card.Divider />}

        {expanded && (
          <View>
            <View style={{ padding: 15, paddingTop: 0 }}>
              <Text style={{ fontStyle: "italic" }}>
                {props.movie.overview}
              </Text>
            </View>
            {props.avg_user_rating == undefined && (
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
            )}
            {props.avg_user_rating != undefined && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  margin: 15,
                }}
              >
                <Text
                  style={{
                    flex: 4,
                    textAlign: "left",
                    fontSize: 15,
                    textAlignVertical: "center",
                  }}
                >
                  Your Rating:
                </Text>
                <View style={{ flex: 4, alignSelf: "center" }}>
                  {edit ? (
                    <TextInput
                      style={[
                        STYLES.input,
                        STYLES.settingsInput,

                        {
                          borderColor:
                            userRating.length < 1 ||
                            userRating.length > 2 ||
                            parseInt(userRating) > 10
                              ? COLORS.danger
                              : "lightgrey",
                          width: "100%",
                          fontWeight: "bold",
                          fontSize: 20,
                        },
                      ]}
                      onChangeText={setUserRating}
                      value={userRating}
                      textAlign="center"
                      keyboardType="number-pad"
                      placeholder="#1-10"
                    />
                  ) : (
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: 20,
                        textAlignVertical: "center",
                      }}
                    >
                      {userRating}
                    </Text>
                  )}
                </View>
                <View
                  style={{
                    flex: 4,
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <TouchableWithoutFeedback
                    onPress={() => {
                      if (edit) {
                        setEdit(!edit);
                        props.setRatingAPI(userRating, props.movie.id);
                      } else {
                        setEdit(!edit);
                      }
                    }}
                  >
                    <View
                      style={{
                        alignItems: "center",
                        alignSelf: "center",
                        justifyContent: "center",
                        backgroundColor:
                          userRating.length < 1 ||
                          userRating.length > 2 ||
                          parseInt(userRating) > 10
                            ? "lightgrey"
                            : COLORS.secondary,
                        borderRadius: 10,
                        width: "50%",
                      }}
                    >
                      <Text style={{ color: "white", margin: 5, fontSize: 15 }}>
                        {!edit ? "Edit" : "Save"}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            )}
          </View>
        )}
      </Card>
    </View>
  );
}

export default Movie;
