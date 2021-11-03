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

function TopBar(props) {
  return (
    <View style={STYLES.topBar}>
      <TouchableWithoutFeedback
        onPress={() => props.navigation.navigate("Welcome")}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesome5 name="arrow-left" color="white" size={20} />
          <Text style={{ color: "white", margin: 5 }}>Groups</Text>
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

      {/* Spacer */}
      <View
        style={{
          flex: 1,
        }}
      ></View>
    </View>
  );
}

export default TopBar;
