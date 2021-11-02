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

function GroupSettingsScreen(props) {
  return (
    <SafeAreaView style={STYLES.container}>
      {/* Top Bar */}
      <TopBar navigation={props.navigation} screen="group"></TopBar>
      {/* Content */}
      <View style={STYLES.content}></View>
      {/* Tabs */}
      <TabBar navigation={props.navigation} screen="settings"></TabBar>
    </SafeAreaView>
  );
}

export default GroupSettingsScreen;
