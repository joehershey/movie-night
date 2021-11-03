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
import { useLinkProps } from "@react-navigation/native";

function ScheduleScreen(props) {
  console.log("on schedule");
  return (
    <SafeAreaView style={STYLES.container}>
      {/* Top Bar */}
      <TopBar
        navigation={props.navigation}
        screen="Landing"
        message="Groups"
      ></TopBar>
      {/* Content */}
      <View style={STYLES.content}></View>
      {/* Tabs */}
      <TabBar navigation={props.navigation} screen="schedule"></TabBar>
    </SafeAreaView>
  );
}

export default ScheduleScreen;
