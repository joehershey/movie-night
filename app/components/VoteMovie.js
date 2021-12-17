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
import { Card } from "react-native-elements";

import { COLORS, STYLES } from "../assets/saved";
import { FontAwesome5 } from "@expo/vector-icons";

import fetch from "cross-fetch";

function VoteMovie(props) {
  var movie = props.movie;
  var poster = "https://image.tmdb.org/t/p/w500" + movie?.poster_path;
  const [userRating, setUserRating] = useState(props.user_rating); //int 1-3
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        marginBottom: 10,
        borderBottomWidth: 0.5,
        borderColor: "grey",
      }}
    >
      <View style={{ flex: 8, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            alignSelf: "center",
            flex: 3,
            shadowColor: "black",
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: "100%",
          }}
        >
          <Image
            style={{ width: 200 * 0.5, height: 300 * 0.5 }}
            source={{
              uri: poster,
              //uri:
              //  "https://image.tmdb.org/t/p/w500/1BIoJGKbXjdFDAqUEiA2VHqkK1Z.jpg",
            }}
          />
        </View>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: "grey",
            margin: 5,
          }}
        >
          {movie.title}
        </Text>
      </View>
      <View
        style={{ flex: 4, justifyContent: "center", alignItems: "flex-end" }}
      >
        <View
          style={{
            margin: 5,
            padding: 3,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: props.user_rating == 3 ? "grey" : COLORS.primary,
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              console.log("good");
              props.setRatingAPI(3, movie.id);
            }}
          >
            <FontAwesome5 name={"smile"} color="green" size={40} />
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            margin: 5,
            padding: 3,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: props.user_rating == 2 ? "lightgrey" : COLORS.primary,
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              console.log("meh");
              props.setRatingAPI(2, movie.id);
            }}
          >
            <FontAwesome5 name={"meh"} color="#ffd900" size={40} />
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            margin: 5,
            padding: 3,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: props.user_rating == 1 ? "grey" : COLORS.primary,
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              console.log("bad");
              props.setRatingAPI(1, movie.id);
            }}
          >
            <FontAwesome5 name={"frown"} color="#d13449" size={40} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
}

export default VoteMovie;
