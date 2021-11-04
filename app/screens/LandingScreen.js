import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Platform,
  SafeAreaView,
  Modal,
} from "react-native";

import { Card } from "react-native-elements";
import TopBar from "../components/TopBar";
import ButtonPanel from "../components/ButtonPanel";
import CreateGroupPopup from "../components/CreateGroupPopup";
import JoinGroupPopup from "../components/JoinGroupPopup";
import { COLORS, STYLES } from "../assets/saved";
import { FontAwesome5 } from "@expo/vector-icons";
import { useLinkProps } from "@react-navigation/native";
import { TEST_DATA } from "../assets/testData";

function LandingScreen(props) {
  const [isLoaded, setLoaded] = React.useState(false);
  const [showCreateGroup, toggleShowCreateGroup] = React.useState(false);
  const [showJoinGroup, toggleShowJoinGroup] = React.useState(false);

  const testGroups = [
    {
      group_name: "Spooky Sunday",
      group_id: 1,
      created_by: 1,
    },
    {
      group_name: "Mystery Monday",
      group_id: 2,
      created_by: 2,
    },
  ];

  const [groupsToRender, setGroups] = React.useState(testGroups);

  if (!isLoaded) {
    getGroupsAPI();
    setLoaded(!isLoaded);
  }

  function getGroupsAPI() {
    // fetch(props.url + "user/" + props.user_id + "/groups", {
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json; charset=utf-8",
    //     },
    //     method: "GET",
    //   })
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //       () => setGroups(responseJson);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    () => setGroups(TEST_DATA.groups);
  }

  const groupsToRenderHTML = [];
  for (const [i, group] of groupsToRender.entries()) {
    //only non applied to properties

    groupsToRenderHTML.push(
      <Card>
        <Card.Title>{group.group_name}</Card.Title>
        <Card.Divider />
        <TouchableWithoutFeedback
          onPress={() => {
            props.setGroup(group.group_id);
            props.navigation.navigate("Schedule");
          }}
        >
          <View
            style={{
              margin: 10,
              padding: 5,
              backgroundColor: COLORS.primary,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                alignContent: "center",
              }}
            >
              View Group
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </Card>
    );
  }

  return (
    <SafeAreaView style={STYLES.container}>
      <TopBar
        navigation={props.navigation}
        screen="Welcome"
        message="Log out"
      ></TopBar>

      <View style={styles.content}>
        <CreateGroupPopup
          showPopup={showCreateGroup}
          toggleShowPopup={toggleShowCreateGroup}
          url={props.url}
          user_id={props.user_id}
        ></CreateGroupPopup>
        <JoinGroupPopup
          showPopup={showJoinGroup}
          toggleShowPopup={toggleShowJoinGroup}
        ></JoinGroupPopup>
        <ScrollView
          style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <View style={{ width: "90%" }}>{groupsToRenderHTML}</View>
        </ScrollView>
        {/* Button Panel start */}
        <ButtonPanel
          showCreateGroup={showCreateGroup}
          toggleShowCreateGroup={toggleShowCreateGroup}
          showJoinGroup={showJoinGroup}
          toggleShowJoinGroup={toggleShowJoinGroup}
        ></ButtonPanel>
        {/* Button Panel over */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    //used with spacer to push content up the screen
    flex: 12,
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

export default LandingScreen;
