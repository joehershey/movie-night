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

function GroupQueueScreen(props) {
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
        ></Queue>
      </View>
      {/* Tabs */}
      <TabBar navigation={props.navigation} screen="queue"></TabBar>
    </SafeAreaView>
  );
}

export default GroupQueueScreen;
