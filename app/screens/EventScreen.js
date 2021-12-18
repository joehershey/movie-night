import React, { useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { STYLES, COLORS } from "../assets/saved";
import TopBar from "../components/TopBar";
import { Col, Row, Grid } from "react-native-easy-grid";
import FinishVoting from "../components/FinishVoting";

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
  const [showPopup, toggleShowPopup] = useState(false);
  const [movie, setMovie] = useState({ title: "", poster_path: "" });

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
        console.log("in getEventInfoAPI() &^");
        console.log(responseJson);
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
          newGenres.push(" " + genre.name);
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
          newPlatforms.push(" " + platform.name);
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
            <Text key={i} style={{ padding: 5, color: "white" }}>
              {user.display_name}
            </Text>
          );
        } else {
          usersNotGoing.push(
            <Text key={i} style={{ padding: 5, color: "white" }}>
              {user.display_name}
            </Text>
          );
        }
        break;
      }
    }
    if (!status) {
      usersNoResponse.push(
        <Text key={i} style={{ padding: 5, color: "white" }}>
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
          console.log("in get movies");
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
          if (count == 3) {
            break;
          }
          count = count + 1;
          top3.push(movie.tmdb_movie_id);
        }
        console.log("The movies in Event Screen**");
        console.log(top3);
        setEventMoviesAPI(top3);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function setEventMoviesAPI(t3) {
    //call post to set the 3 movies locked in for this event
    console.log(t3 + " before post call %%%" + props.event_id);
    fetch(props.url + "event/" + props.event_id + "/movies", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + props.token,
      },
      method: "POST",
      body: JSON.stringify({
        tmdb_movie_ids: t3, //array of movie ids
      }),
    })
      .then((response) => response.json()) // i believe the response is null
      .then((responseJson) => {
        console.log("$$$set events api returns:");
        console.log(responseJson);
        toggleLoaded(false);
        //toggleLoaded(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getMovieRatingsAPI() {
    //call post to set the 3 movies locked in for this event
    console.log("acquiring ratings");
    fetch(props.url + "event/" + props.event_id + "/rating", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + props.token,
      },
      method: "GET",
    })
      .then((response) => response.json()) // i believe the response is null
      .then((responseJson) => {
        let ranked = [];
        if (responseJson?.length <= 0) {
          setVoting(0);
          return;
        }
        for (const [i, movie] of responseJson.entries()) {
          ranked.push(movie);
          console.log(movie);
        }
        ranked.sort((a, b) => (a.avg_rating < b.avg_rating ? 1 : -1));
        getMovieDetails(ranked[0].tmdb_movie_id);
        setChosenMovieAPI(ranked[0].tmdb_movie_id);
        //toggleLoaded(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function setChosenMovieAPI(id) {
    fetch(props.url + "event/" + props.event_id + "/movie", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + props.token,
      },
      method: "PATCH",
      body: JSON.stringify({
        tmdb_movie_id: id, //chosen movie
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("Movie?: " + responseJson);
        toggleLoaded(false);
      });
  }

  function getMovieDetails(id) {
    let TEST = BASEURL + "movie/" + id + APIKEY;
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
        console.log("movieDetails********");
        console.log(responseJson);
        setMovie(responseJson);
        setVoting(0);
        toggleShowPopup(true);
      });
  }

  //changes voting mode on database
  function setVoting(mode) {
    console.log("!@@@@@@");
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
        console.log("^&*(*&^&*(*&^");
        console.log(responseJson);
        if (
          responseJson.message ==
          "Voting is already enabled for another event in this group."
        ) {
          alert(
            "Whoops! To start voting on a movie for this event, you must finish or cancel voting for the event that is already in voting mode!"
          );
        } else {
          setIsVoting(mode);
          if (mode == 1) {
            getMovies();
            toggleLoaded(false);
          } else {
            deleteMovies();
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function deleteMovies() {
    fetch(props.url + "event/" + props.event_id + "/movies", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + props.token,
      },
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(
          "deleting movies below for event: " + props.event_id + "!!!!"
        );
        console.log(responseJson);
        toggleLoaded(false);
      });
  }

  // function for starting voting
  function startVoting() {
    setVoting(1);
    // must not work if others are voting
  }

  // function for finishing votings
  function finishVoting() {
    getMovieRatingsAPI();
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
          <FinishVoting
            showPopup={showPopup}
            toggleShowPopup={toggleShowPopup}
            poster_path={movie.poster_path} // example, movie.poster_path
            title={movie.title} // example, movie.original_title
            tmdb_id={movie.id}
            group_id={props.group_id}
            url={props.url}
            token={props.token}
          ></FinishVoting>
          {movie.title.length < 1 && (
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
                    //getMovies();
                    props.navigation.navigate("Voting");
                  }}
                >
                  <View style={[STYLES.lgButton, STYLES.btn, { padding: 10 }]}>
                    <Text style={[{ color: "white", fontSize: 30 }]}>
                      Vote!
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              )}

              {isVoting == 1 && isAdmin && (
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 30,
                    marginTop: 30,
                  }}
                >
                  <TouchableWithoutFeedback
                    testID="FinishVotingButton"
                    onPress={finishVoting}
                  >
                    <View style={[STYLES.cancelVotingButton, STYLES.btn]}>
                      <Text style={[{ color: COLORS.primary, fontSize: 20 }]}>
                        Finish Voting
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    testID="CancelVotingButton"
                    onPress={cancelVoting}
                  >
                    <View style={[STYLES.cancelVotingButton, STYLES.btn]}>
                      <Text style={[{ color: COLORS.primary, fontSize: 20 }]}>
                        Cancel Voting
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              )}
            </View>
          )}
          <View style={{ width: "90%", alignItems: "center", margin: 10 }}>
            <Text
              style={{
                fontSize: 20,
                marginTop: 30,
                textAlign: "left",
                color: "white",
              }}
            >
              {"Date: " + getDate(dateTime)}
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: "white",
              }}
            >
              {"Time: " + getTime(dateTime)}
            </Text>
            {currentEvent?.location == undefined ? (
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                }}
              >
                {"Location: " + currentEvent.location}
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                }}
              >
                {"Location: " + currentEvent.location}
              </Text>
            )}
            {movie.title.length < 1 ? (
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                }}
              >
                {"Movie: undecided"}
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                }}
              >
                {"Movie: " + movie.title}
              </Text>
            )}
            <Text
              style={{
                fontSize: 20,
                color: "white",
                marginTop: 13,
              }}
            >
              {"Genres"}
            </Text>

            <Text
              style={{
                fontSize: 15,
                color: "white",
                fontStyle: "italic",
                textAlign: "center",
              }}
            >
              {currentGenres.toString()}
            </Text>

            <Text
              style={{
                fontSize: 20,
                color: "white",
                marginTop: 13,
              }}
            >
              {"Streaming Platforms"}
            </Text>

            <Text
              style={{
                fontSize: 15,
                color: "white",
                fontStyle: "italic",
                textAlign: "center",
              }}
            >
              {currentPlatforms.toString()}
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
              style={{
                height: 30,
                borderColor: "white",
                borderWidth: 1,
                alignSelf: "center",
                width: "100%",
              }}
            >
              <Col
                style={{
                  height: 30,
                  borderColor: "white",
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 1,
                    fontSize: 20,
                    color: "white",
                  }}
                >
                  Going
                </Text>
              </Col>
              <Col
                style={{
                  height: 30,
                  borderColor: "white",
                  borderWidth: 1,
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 1,
                    fontSize: 20,
                    color: "white",
                  }}
                >
                  Not Going
                </Text>
              </Col>
              <Col
                style={{
                  height: 30,
                  borderColor: "white",
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 3,
                    fontSize: 17,
                    color: "white",
                  }}
                >
                  No Response
                </Text>
              </Col>
            </Row>
            <Row style={{ minHeight: 200, borderColor: "white" }}>
              <Col
                style={{
                  minHeight: 200,
                  borderColor: "white",
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
                  borderColor: "white",
                  borderWidth: 1,
                  alignSelf: "center",
                }}
              >
                <View>{usersNotGoing}</View>
              </Col>
              <Col
                style={{
                  minHeight: 200,
                  borderColor: "white",
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
