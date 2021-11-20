import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

import { COLORS, STYLES } from "../assets/saved";
import { FontAwesome5 } from "@expo/vector-icons";

import fetch from "cross-fetch";

function WelcomeScreen(props) {
  return (
    <View style={styles.background}>
      <View style={{ margin: 30 }}>
        <Text style={[styles.message, STYLES.fontPrimary]}>
          Welcome to Movie Night!
        </Text>
      </View>

      <TouchableWithoutFeedback
        onPress={() => props.navigation.navigate("LogIn")}
      >
        <View style={[styles.loginButton, STYLES.btn]}>
          <Text style={[{ color: COLORS.primary, fontSize: 30 }]}>Log In</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={() => props.navigation.navigate("SignUp")}
      >
        <View style={[styles.registerButton, STYLES.btn]}>
          <Text
            style={[
              styles.font,
              { color: COLORS.secondary, fontSize: 20, fontStyle: "italic" },
            ]}
          >
            New here? Sign up!
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  message: {
    color: "white",
    fontSize: 40,
    textAlign: "center",
  },
  loginButton: {
    top: 10,
    width: "60%",
    height: 70,
    backgroundColor: "white",
  },
  registerButton: {
    top: 10,
    width: "60%",
    height: 70,
  },
});

export default WelcomeScreen;
