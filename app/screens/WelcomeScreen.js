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

function WelcomeScreen(props) {
  return (
    <View style={styles.background}>
      <View style={{ margin: 30 }}>
        <Text style={[styles.message, STYLES.font]}>
          Welcome to Movie Night!
        </Text>
      </View>

      <TouchableWithoutFeedback
        onPress={() => props.navigation.navigate("LogIn")}
      >
        <View style={[styles.loginButton, styles.btn]}>
          <Text style={[{ color: COLORS.primary, fontSize: 30 }]}>Log In</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={() => props.navigation.navigate("SignUp")}
      >
        <View style={[styles.registerButton, styles.btn]}>
          <Text
            style={[
              styles.font,
              { color: "white", fontSize: 20, fontStyle: "italic" },
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
  btn: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 20,
  },
});

export default WelcomeScreen;
