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

function TopBar(props) {
  return (
    <View style={STYLES.topBar}>
      <TouchableWithoutFeedback
        onPress={() => props.navigation.navigate(props.screen)}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesome5 name="arrow-left" color="white" size={20} />
          <Text style={{ color: "white", margin: 5 }}>{props.message}</Text>
        </View>
      </TouchableWithoutFeedback>

      {/* Logo */}
      <View
        style={{
          flex: 2,
          alignItems: "center",
          paddingBottom: 10,
        }}
      >
        <Image
          style={{
            flex: 1,
            width: 100,
            height: 50,
            marginBottom: 0,
          }}
          source={require("../assets/MovieNightLogo2.png")}
        ></Image>
      </View>

      {/* This code checks if the current screen is the landing page or not, displaying 
            a link to the user's profile if yes and blank space if no. */}
      {props.screen == "Welcome" ? (
        <TouchableWithoutFeedback
          onPress={() => props.navigation.navigate("Profile")}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome5 name="user" color="white" size={20} />
            <Text style={{ color: "white", margin: 5 }}>{"User Profile"}</Text>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <View style={{ flex: 1 }}></View>
      )}
      {/* End of spacer / user profile*/}
    </View>
  );
}

export default TopBar;
