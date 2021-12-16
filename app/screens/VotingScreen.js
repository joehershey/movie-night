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
import Vote from "../components/Vote";

import fetch from "cross-fetch";

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
      <View style={[STYLES.content, { backgroundColor: COLORS.primary }]}>
        <Vote
          url={props.url}
          event_id={props.event_id}
          user_id={props.user_id}
          group_id={props.group_id}
          token={props.token}
        ></Vote>
      </View>
      {/* Tabs */}
    </SafeAreaView>
  );
}

export default VotingScreen;
