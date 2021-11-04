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

function LandingScreen(props) {
  const [showCreateGroup, toggleShowCreateGroup] = React.useState(false);
  const [showJoinGroup, toggleShowJoinGroup] = React.useState(false);

  const keyboardControl = () => {
    if (Platform.OS == "web") {
    } else {
      Keyboard.dismiss();
    }
  };

  const testGroups = [
    {
      group_name: "Spooky Sunday",
      group_id: 1,
      admin_name: "Griffin",
    },
    {
      group_name: "Mystery Monday",
      group_id: 2,
      admin_name: "Tony",
    },
  ];

  const [groupsToRender, setGroups] = React.useState(testGroups);

  const groupsToRenderHTML = [];
  for (const [i, group] of groupsToRender.entries()) {
    //only non applied to properties

    groupsToRenderHTML.push(
      <Card>
        <Card.Title>{group.group_name}</Card.Title>
        <Card.Divider />
        <Text>Group Admin:{group.admin_name}</Text>
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
