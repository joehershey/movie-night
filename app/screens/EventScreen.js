import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { COLORS, STYLES } from "../assets/saved";
import TopBar from "../components/TopBar";
import { TEST_DATA } from "../assets/testData";
import { Col, Row, Grid } from "react-native-easy-grid";

import fetch from "cross-fetch";

function EventScreen(props) {
  const [currentEvent, setEvent] = useState([]);
  const [dateTime, setDateTime] = useState(new Date());
  const [userList, setUserList] = useState([]);
  const [rsvpList, setRSVPList] = useState([]);
  const [isLoaded, toggleLoaded] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

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
        // console.log("a");
        console.log(responseJson);
        setEvent(responseJson);
        setDateTime(new Date(responseJson.start_time));
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
        .then((responseJson) => {
          console.log("new");
        })
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
        .then((responseJson) => {
          console.log("old");
        })
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
        // console.log("a");
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

  const usersGoing = [];
  const usersNotGoing = [];
  const usersNoResponse = [];
  for (const [i, user] of userList.entries()) {
    let status = false;
    for (const [j, rsvp] of rsvpList.entries()) {
      if (user.user_id == rsvp.user_id) {
        status = true;

        if (rsvp.is_coming) {
          usersGoing.push(<Text>{user.display_name}</Text>);
        } else {
          usersNotGoing.push(<Text>{user.display_name}</Text>);
        }
        break;
      }
    }
    if (!status) {
      usersNoResponse.push(<Text>{user.display_name}</Text>);
    }
  }

  if (!isLoaded) {
    getEventInfoAPI();
    getUsersAPI();
    getRSVPListAPI();
    toggleLoaded(true);
  }

  const isGoing = () => {
    RSVPAPI(true);
    toggleLoaded(false);
  };

  const isNotGoing = () => {
    RSVPAPI(false);
    toggleLoaded(false);
  };

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
          <TouchableWithoutFeedback
            onPress={() => props.navigation.navigate("Voting")}
          >
            <View style={[STYLES.lgButton, STYLES.btn]}>
              <Text style={[{ color: "white", fontSize: 40 }]}>Vote!</Text>
            </View>
          </TouchableWithoutFeedback>

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
            {"Genre: Any"}
          </Text>

          <View style={{ flexDirection: "row", marginBottom: 30 }}>
            <TouchableWithoutFeedback onPress={isGoing}>
              <View style={[STYLES.goingButton, STYLES.btn]}>
                <Text style={[{ color: "white", fontSize: 20 }]}>Going</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={isNotGoing}>
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
