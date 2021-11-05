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

function EventScreen(props) {
  console.log("on settings");
  return (
    <SafeAreaView style={STYLES.container}>
      {/* Top Bar */}
      <TopBar
        navigation={props.navigation}
        screen="Schedule"
        message="Schedule"
      ></TopBar>
      {/* Content */}
      <View style={STYLES.content}>
        <View
          style={{
            flexDirection: "row",
            flex: 11,
            justifyContent: "space-evenly",
            marginTop: 100,
          }}
        >
          <FontAwesome5 name="hammer" color="black" size={50} />
          <Text style={{ fontSize: 30 }}>Under Construction</Text>
          <FontAwesome5 name="hammer" color="black" size={50} />
        </View>
        <Text style={{ fontSize: 30 }}>Coming in Iteration 2!</Text>
      </View>
      {/* Tabs */}
    </SafeAreaView>
  );
}

export default EventScreen;
