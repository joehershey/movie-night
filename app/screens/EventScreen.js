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
        <View style={{ justifyContent: "center" }}>
          <View>
            <TouchableWithoutFeedback
              onPress={() => props.navigation.navigate("Voting")}
            >
              <View style={[STYLES.lgButton, STYLES.btn]}>
                <Text style={[{ color: "white", fontSize: 20 }]}>Vote!</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <Text
            style={{
              fontSize: 25,
              margin: 30,
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            {props.event_id}
          </Text>
        </View>
      </View>
      {/* Tabs */}
    </SafeAreaView>
  );
}

export default EventScreen;
