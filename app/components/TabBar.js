import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

import { COLORS, STYLES } from "../assets/saved";
import { FontAwesome5 } from "@expo/vector-icons";

import fetch from "cross-fetch";

function TabBar(props) {
  return (
    <View style={STYLES.tabBar}>
      <TouchableWithoutFeedback
        onPress={() => props.navigation.navigate("Schedule")}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesome5
            name="calendar-alt"
            color={props.screen == "schedule" ? COLORS.secondary : "white"}
            size={30}
          />
          <Text
            style={{
              color: props.screen == "schedule" ? COLORS.secondary : "white",
              fontWeight: props.screen == "schedule" ? "bold" : "normal",
              margin: 5,
            }}
          >
            Schedule
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => props.navigation.navigate("GroupQueue")}
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesome5
            name="list"
            color={props.screen == "queue" ? COLORS.secondary : "white"}
            size={30}
          />
          <Text
            style={{
              color: props.screen == "queue" ? COLORS.secondary : "white",
              fontWeight: props.screen == "queue" ? "bold" : "normal",
              margin: 5,
            }}
          >
            Queue
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => props.navigation.navigate("SearchMovies")}
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesome5
            name="search"
            color={props.screen == "search" ? COLORS.secondary : "white"}
            size={30}
          />
          <Text
            style={{
              color: props.screen == "search" ? COLORS.secondary : "white",
              fontWeight: props.screen == "search" ? "bold" : "normal",
              margin: 5,
            }}
          >
            Search
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => props.navigation.navigate("GroupSettings")}
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesome5
            name="sliders-h"
            color={props.screen == "settings" ? COLORS.secondary : "white"}
            size={30}
          />
          <Text
            style={{
              color: props.screen == "settings" ? COLORS.secondary : "white",
              fontWeight: props.screen == "settings" ? "bold" : "normal",
              margin: 5,
            }}
          >
            Settings
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

export default TabBar;
