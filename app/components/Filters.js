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
function Filters(props) {
  const [loaded, setLoaded] = useState(false);
  const [watchProviders, setWatchProviders] = useState(props.watchProviders);
  const [genres, setGenres] = useState(props.genres);
  const [expanded, setExpanded] = useState(true); //used when editing alias
  const genresKeys = [
    { name: "Action", id: 28 },
    { name: "Adventure", id: 12 },
    { name: "Animation", id: 16 },
    { name: "Comedy", id: 35 },
    { name: "Crime", id: 80 },
    { name: "Documentary", id: 99 },
    { name: "Drama", id: 18 },
    { name: "Family", id: 10751 },
    { name: "Fantasy", id: 14 },
    { name: "History", id: 36 },
    { name: "Horror", id: 27 },
    { name: "Music", id: 10402 },
    { name: "Mystery", id: 9648 },
    { name: "Romance", id: 10749 },
    { name: "Sci Fi", id: 878 },
    { name: "Thriller", id: 53 },
    { name: "War", id: 10752 },
    { name: "Western", id: 37 },
  ];

  const servicesKeys = [
    { name: "Netflix", id: 8 },
    { name: "Hulu", id: 15 },
    { name: "Disney +", id: 337 },
    { name: "Peacock", id: 386 },
    { name: "Paramount +", id: 531 },
    { name: "Prime Video", id: 199 },
    { name: "HBO Max", id: 384 },
  ];

  if (!loaded) {
    setLoaded(true);
  }

  function removeGenre(genre) {
    let newGenres = genres;
    let idx = newGenres.indexOf(genre);
    idx != -1 ? newGenres.splice(idx, 1) : console.log("error in splice?");
    props.setGenres(newGenres);
    props.setPage(1);
    setLoaded(false);
  }
  function addGenre(genre) {
    props.setGenres(genres.push(genre));
    props.setPage(1);
    setLoaded(false);
  }
  function removeService(service) {
    let newServices = watchProviders;
    let idx = newServices.indexOf(service);
    idx != -1 ? newServices.splice(idx, 1) : console.log("error in splice?");
    props.setWatchProviders(newServices);
    props.setPage(1);
    setLoaded(false);
  }
  function addService(service) {
    props.setWatchProviders(watchProviders.push(service));
    props.setPage(1);
    setLoaded(false);
  }

  const renderGenres = [];
  for (const [i, genre] of genresKeys.entries()) {
    renderGenres.push(
      <TouchableWithoutFeedback
        onPress={() => {
          if (genres.indexOf(genre.id) != -1) {
            removeGenre(genre.id, i);
          } else {
            addGenre(genre.id, i);
          }
        }}
      >
        <Text
          style={[
            styles.selectButton,
            genres.indexOf(genre.id) != -1
              ? styles.selected
              : styles.unselected,
          ]}
        >
          {genre.name}
        </Text>
      </TouchableWithoutFeedback>
    );
  }

  const renderServices = [];
  for (const [i, service] of servicesKeys.entries()) {
    renderServices.push(
      <TouchableWithoutFeedback
        onPress={() => {
          if (watchProviders.indexOf(service.id) != -1) {
            removeService(service.id);
          } else {
            addService(service.id);
          }
        }}
      >
        <Text
          style={[
            styles.selectButton,
            watchProviders.indexOf(service.id) != -1
              ? styles.selected
              : styles.unselected,
          ]}
        >
          {service.name}
        </Text>
      </TouchableWithoutFeedback>
    );
  }
  return (
    <View style={{ margin: 10, marginTop: 0, alignItems: "center" }}>
      {expanded ? (
        <View
          style={{
            padding: 10,
            borderColor: "white",
            backgroundColor: COLORS.secondary,
            borderWidth: 3,
            borderRadius: 10,
            width: "90%",
          }}
        >
          <Text
            style={{
              color: "white",
              alignSelf: "center",
              margin: 15,
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Genres
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {renderGenres}
          </View>
          <Text
            style={{
              color: "white",
              alignSelf: "center",
              margin: 15,
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Streaming Services
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {renderServices}
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              props.getMovies();
              setExpanded(!expanded);
            }}
          >
            <View
              style={[
                STYLES.btn,
                {
                  backgroundColor: "dodgerblue",
                  borderColor: "white",
                  borderWidth: 2,
                  alignSelf: "center",
                  padding: 10,
                  marginTop: 15,
                  borderRadius: 5,
                },
              ]}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Search</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      ) : (
        <TouchableWithoutFeedback
          onPress={() => {
            setExpanded(!expanded);
          }}
        >
          <View
            style={[
              STYLES.btn,
              {
                backgroundColor: COLORS.secondary,
                alignSelf: "center",
                padding: 15,
                borderRadius: 2,
              },
            ]}
          >
            <Text style={{ color: "white", fontSize: 15 }}>Show Filters</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  selectButton: {
    color: "white",
    margin: 5,
    padding: 5,
  },
  selected: {
    borderColor: "white",
    borderWidth: 1,
  },
  unselected: {},
});
export default Filters;
