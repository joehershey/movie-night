import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

function WelcomeScreen(props) {
  return (
    <View style={styles.background}>
      <View style={{ margin: 30 }}>
        <Text style={[styles.message, styles.font]}>
          Welcome to Movie Night!
        </Text>
      </View>

      <TouchableWithoutFeedback
        onPress={() => props.navigation.navigate("LogIn")}
      >
        <View style={[styles.loginButton, styles.btn]}>
          <Text style={[styles.font, { color: "black", fontSize: 30 }]}>
            Log In
          </Text>
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
    backgroundColor: "#242322",
  },
  message: {
    color: "white",
    fontSize: 40,
    textAlign: "center",
  },
  font: {
    fontFamily: "Didot",
    letterSpacing: 1.2,
    fontWeight: "bold",
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
