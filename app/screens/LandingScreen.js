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

  const [groupsToRender, setGroups] = React.useState([]);

  //re-render the groups when the screen is navigated to
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      getGroupsAPI();
    });

    return unsubscribe;
  }, [props.navigation]);

  if (!isLoaded) {
    getGroupsAPI();
    setLoaded(!isLoaded);
  }

  function getGroupsAPI() {
    fetch(props.url + "user/" + props.user_id + "/groups", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("a");
        console.log(responseJson);
        setGroups(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });

    //setGroups(TEST_DATA.groups);
  }

  const groupsToRenderHTML = [];

  for (const [i, group] of groupsToRender.entries()) {
    //only non applied to properties

    groupsToRenderHTML.push(
      <Card key={i}>
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
          setLoaded={setLoaded}
        ></CreateGroupPopup>
        <JoinGroupPopup
          showPopup={showJoinGroup}
          toggleShowPopup={toggleShowJoinGroup}
          url={props.url}
          user_id={props.user_id}
          setLoaded={setLoaded}
        ></JoinGroupPopup>
        <ScrollView
          style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
          contentContainerStyle={{ alignItems: "center" }}
        >
          {groupsToRender?.length < 1 && (
            <View style={{ alignSelf: "center", margin: 50 }}>
              <Text
                style={{
                  color: "lightgrey",
                  textAlign: "center",
                  fontSize: 20,
                  fontStyle: "italic",
                  top: 100,
                }}
              >
                You aren't currently a member of any groups, create one now or
                join an existing one with the group's access code!
              </Text>
            </View>
          )}
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
