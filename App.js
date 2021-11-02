import React, { useState } from "react";
import { StyleSheet, Platform, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./app/screens/LoginScreen";
import SignupScreen from "./app/screens/SignupScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const URL = ""; //FIXME: Update with URL for APU calls

  //save states that need to be accessed throughout app
  //state.abcd -> access here, props.abcd access in screens
  const [state, setState] = useState({
    user_id: -1, //initially empty, initialized with login/signup (props.user_id)
    username: "", //same as above (but accessed via props.username)
    user_token: "", //keep track of token IF backend wants this functionality
  });

  //changes the state of user_id in this component (props.user_id in screens)
  function setUser(id, user) {
    //takes previous state, only overrites passed info (with param)
    setState((prevState) => {
      return { ...prevState, user_id: id, username: user };
    });
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false, animation: "none" }}
      >
        <Stack.Screen name="LogIn">
          {(props) => (
            <LoginScreen
              {...props}
              setUser={(set_id, set_user) => setUser(set_id, set_user)} //passes user info from login for storage(props.setUser(user_id) )
              url={URL} //const URL to use for api calls (props.url)
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="SignUp">
          {(props) => (
            <SignupScreen
              {...props}
              setUser={(set_id, set_user) => setUser(set_id, set_user)} //passes user info from login for storage(props.setUser(user_id) )
              url={URL} //const URL to use for api calls (props.url)
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Welcome">
          {(props) => (
            <WelcomeScreen
              {...props}
              url={URL} //const URL to use for api calls (props.url)
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
