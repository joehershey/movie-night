import React, { useState } from "react";
import { StyleSheet, Platform, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./app/screens/LoginScreen";
import SignupScreen from "./app/screens/SignupScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import LandingScreen from "./app/screens/LandingScreen";
import GroupSettingsScreen from "./app/screens/GroupSettingsScreen";
import SearchMoviesScreen from "./app/screens/SearchMoviesScreen";
import GroupQueueScreen from "./app/screens/GroupQueueScreen";
import ScheduleScreen from "./app/screens/ScheduleScreen";
import ProfileSettingsScreen from "./app/screens/ProfileSettingsScreen";
import EventScreen from "./app/screens/EventScreen";
import VotingScreen from "./app/screens/VotingScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const URL = "https://movienightapi2.azurewebsites.net/";

  //save states that need to be accessed throughout app
  //state.abcd -> access here, props.abcd access in screens
  const [state, setState] = useState({
    user_id: -1, //initially empty, initialized with login/signup (props.user_id)
    username: "", //same as above (but accessed via props.username)
    token: "", //keep track of token IF backend wants this functionality
    group_id: -1,
    event_id: -1,
  });

  //changes the state of user_id in this component (props.user_id in screens)
  function setUser(id, user, tok) {
    console.log(id + user + tok);
    //takes previous state, only overrites passed info (with param)
    setState((prevState) => {
      return { ...prevState, user_id: id, username: user, token: tok };
    });
  }

  function setGroup(set_id) {
    console.log(set_id);
    //takes previous state, only overrites passed info (with param)
    setState((prevState) => {
      return { ...prevState, group_id: set_id };
    });
  }

  function setEvent(set_id) {
    console.log(set_id);

    setState((prevState) => {
      return { ...prevState, event_id: set_id };
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
              setUser={(set_id, set_user, set_token) =>
                setUser(set_id, set_user, set_token)
              } //passes user info from login for storage(props.setUser(user_id) )
              url={URL} //const URL to use for api calls (props.url)
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="SignUp">
          {(props) => (
            <SignupScreen
              {...props}
              setUser={(set_id, set_user, set_token) =>
                setUser(set_id, set_user, set_token)
              } //passes user info from login for storage(props.setUser(user_id) )
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

        <Stack.Screen name="Landing">
          {(props) => (
            <LandingScreen
              {...props}
              setGroup={(group_id) => setGroup(group_id)}
              url={URL} //const URL to use for api calls (props.url)
              user_id={state.user_id}
              token={state.token}
              username={state.username}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Profile">
          {(props) => (
            <ProfileSettingsScreen
              {...props}
              url={URL} //const URL to use for api calls (props.url)
              user_id={state.user_id}
              token={state.token}
              username={state.username}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="GroupSettings">
          {(props) => (
            <GroupSettingsScreen
              {...props}
              url={URL} //const URL to use for api calls (props.url)
              user_id={state.user_id}
              token={state.token}
              username={state.username}
              group_id={state.group_id}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="SearchMovies">
          {(props) => (
            <SearchMoviesScreen
              {...props}
              url={URL} //const URL to use for api calls (props.url)
              user_id={state.user_id}
              token={state.token}
              username={state.username}
              group_id={state.group_id}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="GroupQueue">
          {(props) => (
            <GroupQueueScreen
              {...props}
              url={URL} //const URL to use for api calls (props.url)
              user_id={state.user_id}
              token={state.token}
              username={state.username}
              group_id={state.group_id}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Schedule">
          {(props) => (
            <ScheduleScreen
              {...props}
              setEvent={(event_id) => setEvent(event_id)}
              url={URL} //const URL to use for api calls (props.url)
              user_id={state.user_id}
              token={state.token}
              username={state.username}
              group_id={state.group_id}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Event">
          {(props) => (
            <EventScreen
              {...props}
              url={URL} //const URL to use for api calls (props.url)
              user_id={state.user_id}
              token={state.token}
              username={state.username}
              group_id={state.group_id}
              event_id={state.event_id}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Voting">
          {(props) => (
            <VotingScreen
              {...props}
              url={URL} //const URL to use for api calls (props.url)
              user_id={state.user_id}
              token={state.token}
              username={state.username}
              group_id={state.group_id}
              event_id={state.event_id}
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
