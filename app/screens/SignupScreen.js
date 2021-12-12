import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TextInput,
  Alert,
  Keyboard,
  Platform,
} from "react-native";

import { COLORS, STYLES } from "../assets/saved";
import { FontAwesome5 } from "@expo/vector-icons";
import fetch from "cross-fetch";

function SignupScreen(props) {
  const [username, changeUsername] = React.useState("");
  const [email, changeEmail] = React.useState("");
  const [password, changePassword] = React.useState("");

  //TODO replace spike code
  function signupAPI(user, pass, setEmail) {
    fetch(props.url + "signup", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "POST",
      body: JSON.stringify({
        email: setEmail,
        username: user,
        password: pass,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.user_id === undefined) {
          alert("Unable to sign up");
        } else {
          props.setUser(responseJson.user_id, user, responseJson.token);
          props.navigation.navigate("Landing");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function testOrAPI(user, pass, setEmail) {
    //signupAPITest(user, pass, setEmail);
    signupAPI(user, pass, setEmail);
  }

  //test input without api
  function signupAPITest(user, pass, email) {
    console.log(user + ":" + pass + ":" + setEmail);
    props.setUser(2, user); //sets user_id as 2, username as input for username
    props.navigation.navigate("Landing");
  }

  const keyboardControl = () => {
    if (Platform.OS == "web") {
    } else {
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.background}>
      <TouchableWithoutFeedback onPress={keyboardControl}>
        <View style={styles.content}>
          <TextInput
            style={STYLES.input}
            onChangeText={changeUsername}
            value={username}
            placeholder="Enter username:"
          />

          <TextInput
            style={STYLES.input}
            onChangeText={changeEmail}
            value={email}
            placeholder="Enter email:"
            testID="EnterEmail"
          />

          <TextInput
            style={STYLES.input}
            onChangeText={changePassword}
            value={password}
            placeholder="Enter password:"
            secureTextEntry={true}
            testID="EnterPassword"
          />

          <TouchableWithoutFeedback testID="SignUpButton"
            onPress={() => {
              if (username == "" || password == "" || email == "") {
                Alert.alert("Please fill out all fields");
              } else {
                testOrAPI(username, password, email);
              }
            }}
          >
            <View style={[STYLES.lgButton, STYLES.btn]}>
              <Text style={[{ color: "white", fontSize: 30 }]}>Sign Up</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback testID="NavigateButton"
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
      <View style={styles.spacer}></View>
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
    flex: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    //to be added
    width: 275,
    height: 200,
    margin: 30,
  },
});

export default SignupScreen;
