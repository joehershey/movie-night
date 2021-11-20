import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";

import { COLORS, STYLES } from "../assets/saved";
import { FontAwesome5 } from "@expo/vector-icons";

import TabBar from "../components/TabBar";
import TopBar from "../components/TopBar";
import Queue from "../components/Queue";

import fetch from "cross-fetch";

function GroupQueueScreen(props) {
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      getUsersAPI();
    });

    return unsubscribe;
  }, [props.navigation]);

  //used to see if the user is an admin
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
        members = responseJson;
        for (let i = 0; i < members.length; i++) {
          if (members[i].user_id == props.user_id) {
            setIsAdmin(members[i].is_admin ? true : false); //member isAdmin set true if active user is_admin
            break;
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  console.log("on queue");
  return (
    <SafeAreaView style={STYLES.container}>
      {/* Top Bar */}
      <TopBar
        navigation={props.navigation}
        screen="Landing"
        message="Groups"
      ></TopBar>
      {/* Content */}
      <View style={[STYLES.content, { backgroundColor: COLORS.primary }]}>
        <Queue
          navigation={props.navigation}
          url={props.url}
          user_id={props.user_id}
          group_id={props.group_id}
          token={props.token}
          isAdmin={isAdmin}
        ></Queue>
      </View>
      {/* Tabs */}
      <TabBar navigation={props.navigation} screen="queue"></TabBar>
    </SafeAreaView>
  );
}

export default GroupQueueScreen;
