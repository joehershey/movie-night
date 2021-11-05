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

function GroupQueueScreen(props) {
  console.log("on settings");
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
        <View style={{ justifyContent: "center", flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              margin: 20,
            }}
          >
            <FontAwesome5 name="hammer" color="black" size={50} />
            <Text style={{ fontSize: 25, margin: 10 }}>Under Construction</Text>
            <FontAwesome5
              name="hammer"
              style={{ transform: [{ rotateY: "180deg" }] }}
              color="black"
              size={50}
            />
          </View>
          <Text
            style={{
              fontSize: 25,
              margin: 30,
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            Coming in Iteration 2!
          </Text>
        </View>
      </View>
      {/* Tabs */}
      <TabBar navigation={props.navigation} screen="queue"></TabBar>
    </SafeAreaView>
  );
}

export default GroupQueueScreen;
