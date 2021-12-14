import React, { useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { STYLES } from "../assets/saved";
import TopBar from "../components/TopBar";
import { Col, Row, Grid } from "react-native-easy-grid";

import fetch from "cross-fetch";

function EventScreen(props) {
  const [currentEvent, setEvent] = useState([]);
  const [currentGenres, setGenres] = useState([]);
  const [currentPlatforms, setPlatforms] = useState([]);
  const [dateTime, setDateTime] = useState(new Date());
  const [userList, setUserList] = useState([]);
  const [rsvpList, setRSVPList] = useState([]);
  const [isLoaded, toggleLoaded] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isVoting, setIsVoting] = useState(0);

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

  if (!isLoaded) {
    getEventInfoAPI();
    toggleLoaded(true);
  }

  //added by joe, hitting vote locks in top 3 movies
  const [htmlMovies, setHtmlMovies] = useState([]);

  function getEventInfoAPI() {
    fetch(props.url + "event/" + props.event_id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + props.token,
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setEvent(responseJson);
        setDateTime(new Date(responseJson.start_time));
        getGenres(responseJson.genres);
        getPlatforms(responseJson.services);
        setIsVoting(responseJson.voting_mode);
        getUsersAPI();
        getRSVPListAPI();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function RSVPAPI(going) {
    if (!RSVPcontains(props.user_id)) {
      fetch(props.url + "event/rsvp", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + props.token,
        },
        method: "POST",
        body: JSON.stringify({
          event_id: props.event_id,
          user_id: props.user_id,
          is_coming: going,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {})
        .catch((error) => {
          console.error(error);
        });
    } else {
      fetch(props.url + "event/" + props.event_id + "/rsvp/" + props.user_id, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + props.token,
        },
        method: "PATCH",
        body: JSON.stringify({
          is_coming: going,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {})
        .catch((error) => {
          console.error(error);
        });
    }
  }

  function getUsersAPI() {
    fetch(props.url + "group/" + props.group_id + "/users", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + props.token,
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setUserList(responseJson);
        checkAdminStatus(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getRSVPListAPI() {
    fetch(props.url + "event/" + props.event_id + "/rsvp", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + props.token,
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log("a");
        setRSVPList(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getDate(dateTime) {
    const month = dateTime.getMonth() + 1;
    return month + "/" + dateTime.getDate() + "/" + dateTime.getFullYear();
  }

  function getTime(dateTime) {
    let end = "AM";
    let hours = dateTime.getHours();
    let minutes = dateTime.getMinutes();
    if (hours > 12) {
      hours = hours % 12;
      end = "PM";
    } else if (hours == 12) {
      end = "PM";
    }
    if (hours == 0) {
      hours = 12;
      end = "AM";
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return hours + ":" + minutes + " " + end;
  }

  /*
    Called by getEventInfoAPI. Retrieves the genre info for the current event
    and processes the data to be displayed.
  */
  function getGenres(genreList) {
    if (genreList == undefined) {
      return [];
    }

    // if no genres are chosen, we choose any
    if (genreList.length == 0) {
      setGenres(["Any"]);
    }

    // fix for duplication error - check if genres have been loaded already
    if (currentGenres.length == genreList.length) {
      return currentGenres;
    }

    for (const [i, genreNum] of genreList.entries()) {
      for (const [j, genre] of genresKeys.entries()) {
        if (genreNum === genre.id) {
          const newGenres = currentGenres;
          newGenres.push("\n\t" + genre.name);
          setGenres(newGenres);
        }
      }
    }
    return currentGenres;
  }

  /*
    Called by getEventInfoAPI. Retrieves the platform info for the current event
    and processes the data to be displayed.
  */
  function getPlatforms(platformList) {
    if (platformList == undefined) {
      return [];
    }

    // if no platforms are selected, we assume all are chosen
    if (platformList.length == 0) {
      setPlatforms(["Any"]);
    }

    // fix for duplication error - check if platforms have been loaded already
    if (platformList.length == currentPlatforms.length) {
      return currentPlatforms;
    }
    for (const [i, platformNum] of platformList.entries()) {
      for (const [j, platform] of servicesKeys.entries()) {
        if (platformNum === platform.id) {
          const newPlatforms = currentPlatforms;
          newPlatforms.push("\n\t" + platform.name);
          setPlatforms(newPlatforms);
        }
      }
    }
    return currentPlatforms;
  }

  function RSVPcontains(user_id) {
    for (const [j, rsvp] of rsvpList.entries()) {
      if (user_id == rsvp.user_id) {
        return true;
      }
    }
    return false;
  }

  function checkAdminStatus(members) {
    for (let i = 0; i < members.length; i++) {
      if (members[i].user_id == props.user_id) {
        setIsAdmin(members[i].is_admin ? true : false); //member isAdmin set true if active user is_admin
        break;
      }
    }
  }

  // process of sorting users into RSVP groups
  const usersGoing = [];
  const usersNotGoing = [];
  const usersNoResponse = [];
  for (const [i, user] of userList.entries()) {
    let status = false;
    for (const [j, rsvp] of rsvpList.entries()) {
      if (user.user_id == rsvp.user_id) {
        status = true;

        if (rsvp.is_coming) {
          usersGoing.push(
            <Text key={i} style={{ padding: 5 }}>
              {user.display_name}
            </Text>
          );
        } else {
          usersNotGoing.push(
            <Text key={i} style={{ padding: 5 }}>
              {user.display_name}
            </Text>
          );
        }
        break;
      }
    }
    if (!status) {
      usersNoResponse.push(
        <Text key={i} style={{ padding: 5 }}>
          {user.display_name}
        </Text>
      );
    }
  }

  function isGoing() {
    RSVPAPI(true);
    toggleLoaded(false);
  }

  function isNotGoing() {
    RSVPAPI(false);
    toggleLoaded(false);
  }

  //added by joe, getting top 3 movies
  var movies = [];
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
        if (!set) return;
        movies.sort((a, b) => (a.avg_user_rating < b.avg_user_rating ? 1 : -1));
        const top3 = [];
        var count = 0;
        for (const [i, movie] of movies.entries()) {
          console.log("*****");
          if (count == 3) {
            break;
          }
          count = count + 1;
          top3.push(movie.tmdb_movie_id);
        }
        console.log("&&&");
        console.log(top3);
        setEventMoviesAPI(top3);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function setEventMoviesAPI(movies) {
    //call post to set the 3 movies locked in for this event
    console.log(movies);
    console.log("^^");
    /* fetch(props.url + "event/" + props.event_id + "/movies", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + props.token,
      },
      method: "POST",
      body: JSON.stringify({
        tmdb_movie_id: movies, // need to figure this out
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        toggleLoaded(false);
      })
      .catch((error) => {
        console.error(error);
      }); */
  }

  //changes voting mode on database
  function setVoting(mode) {
    setIsVoting(mode);
    fetch(props.url + "event/" + props.event_id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + props.token,
      },
      method: "PATCH",
      body: JSON.stringify({
        voting_mode: mode,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        toggleLoaded(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // function for starting voting
  function startVoting() {
    setVoting(1);
    getMovies();
    // must not work if others are voting
  }

  // function for finishing votings
  function finishVoting() {
    setVoting(0);
    // set the group's movie to selected one
  }

  // function for cancelling voting
  function cancelVoting() {
    setVoting(0);
    // do not set group's movie, voting is unsuccessful
  }

  return (
    <SafeAreaView style={STYLES.container}>
      {/* Top Bar */}
      <TopBar
        navigation={props.navigation}
        screen="Schedule"
        message="Schedule"
      ></TopBar>
      {/* Content */}
      <View style={[STYLES.content]}>
        <ScrollView
          style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <View style={{ width: "100%", alignItems: "center" }}>
            {isAdmin && isVoting == 0 && (
              <TouchableWithoutFeedback
                testID="StartVoteButton"
                onPress={startVoting}
              >
                <View style={[STYLES.lgButton, STYLES.btn, { padding: 10 }]}>
                  <Text style={[{ color: "white", fontSize: 30 }]}>
                    Start vote!
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )}
            {isVoting == 1 && (
              <TouchableWithoutFeedback
                testID="VoteButton"
                onPress={() => {
                  getMovies();
                  props.navigation.navigate("Voting");
                }}
              >
                <View style={[STYLES.lgButton, STYLES.btn, { padding: 10 }]}>
                  <Text style={[{ color: "white", fontSize: 30 }]}>Vote!</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>

          {isVoting == 1 && isAdmin && (
            <View
              style={{ flexDirection: "row", marginBottom: 30, marginTop: 30 }}
            >
              <TouchableWithoutFeedback
                testID="FinishVotingButton"
                onPress={finishVoting}
              >
                <View style={[STYLES.cancelVotingButton, STYLES.btn]}>
                  <Text style={[{ color: "white", fontSize: 20 }]}>
                    Finish Voting
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                testID="CancelVotingButton"
                onPress={cancelVoting}
              >
                <View style={[STYLES.cancelVotingButton, STYLES.btn]}>
                  <Text style={[{ color: "white", fontSize: 20 }]}>
                    Cancel Voting
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          )}

          <View style={{ width: "80%" }}>
            <Text
              style={{
                fontSize: 25,
                marginTop: 30,
                textAlign: "left",
              }}
            >
              {"Date: " + getDate(dateTime)}
            </Text>
            <Text
              style={{
                fontSize: 25,
              }}
            >
              {"Time: " + getTime(dateTime)}
            </Text>
            <Text
              style={{
                fontSize: 25,
              }}
            >
              {"Location: " + currentEvent.location}
            </Text>
            <Text
              style={{
                fontSize: 25,
              }}
            >
              {
                "Movie: undecided" //TODO: fill in movie when decided
              }
            </Text>
            <Text
              style={{
                fontSize: 25,
              }}
            >
              {"Genres: " + currentGenres}
            </Text>

            <Text
              style={{
                fontSize: 25,
              }}
            >
              {"Streaming Platforms: " + currentPlatforms}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 30 }}>
            <TouchableWithoutFeedback testID="GoingButton" onPress={isGoing}>
              <View style={[STYLES.goingButton, STYLES.btn]}>
                <Text style={[{ color: "white", fontSize: 20 }]}>Going</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              testID="NotGoingButton"
              onPress={isNotGoing}
            >
              <View style={[STYLES.notGoingButton, STYLES.btn]}>
                <Text style={[{ color: "white", fontSize: 20 }]}>
                  Not Going
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          {/* RSVP list table */}
          <Grid style={{ width: "90%", alignSelf: "center" }}>
            <Row
              style={{ height: 40, borderColor: "black", alignSelf: "center" }}
            >
              <Text style={{ fontSize: 30 }}>RSVP List</Text>
            </Row>
            <Row
              style={{
                height: 30,
                borderColor: "black",
                borderWidth: 1,
                alignSelf: "center",
              }}
            >
              <Col
                style={{
                  height: 30,
                  borderColor: "black",
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{ textAlign: "center", marginTop: 1, fontSize: 20 }}
                >
                  Going
                </Text>
              </Col>
              <Col
                style={{
                  height: 30,
                  borderColor: "black",
                  borderWidth: 1,
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{ textAlign: "center", marginTop: 1, fontSize: 20 }}
                >
                  Not Going
                </Text>
              </Col>
              <Col
                style={{
                  height: 30,
                  borderColor: "black",
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{ textAlign: "center", marginTop: 3, fontSize: 17 }}
                >
                  No Response
                </Text>
              </Col>
            </Row>
            <Row style={{ minHeight: 200, borderColor: "black" }}>
              <Col
                style={{
                  minHeight: 200,
                  borderColor: "black",
                  borderWidth: 1,
                  borderRightWidth: 0,
                  alignSelf: "center",
                }}
              >
                <View>{usersGoing}</View>
              </Col>
              <Col
                style={{
                  minHeight: 200,
                  borderColor: "black",
                  borderWidth: 1,
                  alignSelf: "center",
                }}
              >
                <View>{usersNotGoing}</View>
              </Col>
              <Col
                style={{
                  minHeight: 200,
                  borderColor: "black",
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  alignSelf: "center",
                }}
              >
                <View>{usersNoResponse}</View>
              </Col>
            </Row>
          </Grid>
        </ScrollView>
      </View>
      {/* Tabs */}
    </SafeAreaView>
  );
}

export default EventScreen;
