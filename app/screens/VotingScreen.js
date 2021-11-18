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

import TopBar from "../components/TopBar";

function VotingScreen(props) {
  return (
    <SafeAreaView style={STYLES.container}>
      {/* Top Bar */}
      <TopBar
        navigation={props.navigation}
        screen="Event"
        message="Event"
      ></TopBar>
      {/* Content */}
      <View style={[STYLES.content]}></View>
      {/* Tabs */}
    </SafeAreaView>
  );
}

export default VotingScreen;
