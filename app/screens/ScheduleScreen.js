import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
  Button,
  TextInput,
} from "react-native";

import { Card } from "react-native-elements";

import { COLORS, STYLES } from "../assets/saved";
import { FontAwesome5 } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import TabBar from "../components/TabBar";
import TopBar from "../components/TopBar";
import Filters from "../components/Filters";
import { useLinkProps } from "@react-navigation/native";

function ScheduleScreen(props) {
  const [eventsToRender, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [watchProviders, setWatchProviders] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoaded, toggleLoaded] = useState(false);

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

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  // date time test
  const [date, setDate] = useState(new Date());
  const [dateString, setDateString] = useState("");
  const [mode, setMode] = useState("datetime");
  const [show, setShow] = useState(false);

  function processDate(value) {
    if (value < 10) {
      return "0" + value;
    } else {
      return value;
    }
  }

  function processTime(hours, minutes) {
    let end = "AM";
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (hours == 12) {
      end = "PM";
    }
    if (hours == 0) {
      hours = 12;
    }
    if (hours > 12) {
      hours = hours % 12;
      end = "PM";
    }
    return hours + ":" + minutes + " " + end;
  }

  const onChangeTimeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    const month = currentDate.getMonth() + 1;

    const stringDate =
      currentDate.getFullYear() +
      "-" +
      processDate(month) +
      "-" +
      processDate(currentDate.getDate()) +
      "T" +
      processDate(currentDate.getHours()) +
      ":" +
      processDate(currentDate.getMinutes()) +
      ":" +
      processDate(currentDate.getSeconds()) +
      "." +
      processDate(currentDate.getMilliseconds());
    setDateString(stringDate);
    console.log(stringDate);
    console.log(dateString);
  };

  // date time test

  const onSubmit = () => {
    const currentTime = new Date();
    // create event w api
    if (name.trim() <= 0) {
      alert("Please enter a name.");
    } else if (location.trim() <= 0) {
      alert("Please enter a location.");
    } else if (date.getTime() > currentTime.getTime) {
      alert("Please enter a date in the future.");
    } else {
      createEventAPI();
      toggleLoaded(false);
      setDate(new Date());
      setName("");
      setLocation("");
      setGenres([]);
      setWatchProviders([]);
    }
  };

  const onClear = () => {
    setDate(new Date());
    setName("");
    setLocation("");
    setGenres([]);
    setWatchProviders([]);
  };

  if (!isLoaded) {
    // works, but no events can be added yet
    getEventsAPI();
    toggleLoaded(true);
  }

  function getEventsAPI() {
    fetch(props.url + "group/" + props.group_id + "/events", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log("a");
        console.log(responseJson);
        setEvents(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function createEventAPI() {
    fetch(props.url + "event/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "POST",
      body: JSON.stringify({
        group_id: props.group_id,
        start_time: dateString,
        location: location,
        genre: 18,
        tmdb_movie_id: 1,
        organized_by: props.user_id,
        voting_mode: 1,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
        alert(error);
      });
  }

  const eventsToRenderHTML = [];
  for (const [i, event] of eventsToRender.entries()) {
    const dateTime = new Date(event.start_time);
    const month = dateTime.getMonth() + 1;

    const date =
      month + "/" + dateTime.getDate() + "/" + dateTime.getFullYear();
    const time = processTime(dateTime.getHours(), dateTime.getMinutes());

    eventsToRenderHTML.push(
      <Card key={i}>
        <Card.Title>{"Movie Night " + date}</Card.Title>
        <Card.Divider />
        <Text>{"Start Time: " + time}</Text>
        <Text>{"Location: " + event.location}</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            props.setEvent(event.event_id);
            props.navigation.navigate("Event");
          }}
        >
          <View
            style={{
              margin: 10,
              padding: 5,
              backgroundColor: COLORS.primary,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                alignContent: "center",
              }}
            >
              View Event
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </Card>
    );
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
        <ScrollView
          style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <View style={{ width: "90%" }}>{eventsToRenderHTML}</View>

          <View>
            <View
              style={{
                backgroundColor: "lightgrey",
                padding: 5,
                alignItems: "stretch",
                marginTop: 20,
                width: 300,
              }}
            >
              <Text style={{ fontSize: 30 }}>New Movie Night</Text>

              <TextInput
                style={STYLES.formInput}
                placeholder="Name"
                onChangeText={setName}
                value={name}
              />
              <TextInput
                style={STYLES.formInput}
                placeholder={"Location (ex. 'Griffin's house')"}
                onChangeText={setLocation}
                value={location}
              />
              <View style={{}}>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChangeTimeDate}
                />
              </View>
              <Filters
                genres={genres}
                watchProviders={watchProviders}
                setGenres={() => setGenres}
                setWatchProviders={() => setWatchProviders}
                getMovies={null}
                setPage={(a) => setPage(1)}
                inSearch={false}
              ></Filters>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableWithoutFeedback onPress={onSubmit}>
                <View
                  style={{
                    borderRadius: 5,
                    margin: 10,
                    padding: 5,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: COLORS.secondary,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      alignContent: "center",
                    }}
                  >
                    Submit
                  </Text>
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={onClear}>
                <View
                  style={{
                    borderRadius: 5,
                    margin: 10,
                    padding: 5,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: COLORS.primary,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      alignContent: "center",
                    }}
                  >
                    Clear Form
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </ScrollView>
      </View>
      {/* Tabs */}
      <TabBar navigation={props.navigation} screen="schedule"></TabBar>
    </SafeAreaView>
  );
}

export default ScheduleScreen;
