import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Platform,
} from "react-native";

import { COLORS, STYLES } from "../assets/saved";
import { FontAwesome5 } from "@expo/vector-icons";

import fetch from "cross-fetch";

function LoginScreen(props) {
  const [username, changeUsername] = React.useState("");
  const [password, changePassword] = React.useState("");

  //this is
  function loginAPI(user, pass) {
    fetch(props.url + "login", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "POST",
      body: JSON.stringify({
        username: user,
        password: pass,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.user_id === undefined) {
          alert("Username or password is incorrect");
        } else {
          console.log(responseJson.token);
          props.setUser(responseJson.user_id, user, responseJson.token);
          props.navigation.navigate("Landing");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function forgotPasswordAPI() {
    if (username == "") {
      alert("Please enter your username");
    } else {
      fetch(props.url + "user/" + "/forgot_password", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + props.token,
        },
        method: "PATCH",
        body: JSON.stringify({
          username: username,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          alert(responseJson.message);
        })
        .catch((error) => {
          console.error(error);
          alert(error);
        });
    }
  }

  //called by the login button
  function checkCredentials() {
    //loginAPITest(username, password);
    loginAPI(username, password);
  }

  const keyboardControl = () => {
    if (Platform.OS == "web") {
    } else {
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.background}>
      <TouchableWithoutFeedback onPress={keyboardControl} accessible={false}>
        <View style={styles.content}>
          <TextInput
            style={STYLES.input}
            onChangeText={changeUsername}
            value={username}
            placeholder="Enter username:"
            testID="EnterUserName"
          />

          <TextInput
            style={STYLES.input}
            onChangeText={changePassword}
            value={password}
            placeholder="Enter password:"
            secureTextEntry={true}
            testID="EnterPassword"
          />

          <TouchableWithoutFeedback
            testID="LogInButton"
            onPress={() => checkCredentials()} //checking w/ API and navigating
          >
            <View style={[STYLES.lgButton, STYLES.btn]}>
              <Text style={[{ color: "white", fontSize: 30 }]}>Log In</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => forgotPasswordAPI()}>
            <View style={[styles.registerButton, STYLES.btn]}>
              <Text
                style={[
                  styles.font,
                  {
                    color: COLORS.secondary,
                    fontSize: 20,
                    fontStyle: "italic",
                  },
                ]}
              >
                Forgot your password?
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            testID="NavigateButton"
            onPress={() => props.navigation.navigate("Welcome")}
          >
            <View style={[STYLES.returnBtn]}>
              <FontAwesome5
                name="arrow-left"
                color={COLORS.primary}
                size={30}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch", //stretch allows content to fill screen
    backgroundColor: COLORS.primary,
  },
  content: {
    //used with spacer to push content up the screen
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    //to be added
    width: 275,
    height: 200,
    margin: 30,
  },
  registerButton: {
    top: 10,
    width: "60%",
    height: 70,
  },
});

export default LoginScreen;
