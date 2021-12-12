import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";

import { COLORS, STYLES } from "../assets/saved";
import { FontAwesome5 } from "@expo/vector-icons";

import TabBar from "../components/TabBar";
import TopBar from "../components/TopBar";
import ChangePassword from "../components/ChangePassword";
import DeleteAccount from "../components/DeleteAccount";
import { useLinkProps } from "@react-navigation/native";

import fetch from "cross-fetch";

function ProfileSettingsScreen(props) {
  const [showPopup, toggleShowPopup] = React.useState(false);
  const [showDelete, toggleShowDelete] = React.useState(false);

  return (
    <SafeAreaView style={STYLES.container}>
      {/* Top Bar */}
      <TopBar
        navigation={props.navigation}
        screen="Landing"
        message="Groups"
      ></TopBar>
      <ChangePassword
        showPopup={showPopup}
        token={props.token}
        toggleShowPopup={toggleShowPopup}
      />
      <DeleteAccount
        showPopup={showDelete}
        toggleShowPopup={toggleShowDelete}
        navigation={props.navigation}
        token={props.token}
      ></DeleteAccount>
      {/* Content */}
      <View style={styles.content}>
        <Text style={{ fontSize: 50 }}>{"Profile Settings"}</Text>
        <Text style={{ fontSize: 30 }}>{"Username: " + props.username}</Text>

        <View style={{ width: "100%", alignItems: "center" }}>
          <TouchableWithoutFeedback testID="ChangePasswordButton" onPress={() => toggleShowPopup(!showPopup)}>
            <View
              style={[
                STYLES.settingsButtons,
                STYLES.btn,
                { backgroundColor: COLORS.primary },
              ]}
            >
              <Text style={[{ color: "white", fontSize: 20 }]}>
                Change Password
              </Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback testID="NavigateButton"
            onPress={() => props.navigation.navigate("Welcome")}
          >
            <View
              style={[
                STYLES.settingsButtons,
                STYLES.btn,
                { backgroundColor: COLORS.primary },
              ]}
            >
              <Text style={[{ color: "white", fontSize: 20 }]}>Log out</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback testID="DeleteAccountButton"
            onPress={() => toggleShowDelete(!showDelete)}
          >
            <View
              style={[
                STYLES.settingsButtons,
                STYLES.btn,
                { backgroundColor: COLORS.danger },
              ]}
            >
              <Text style={[{ color: "white", fontSize: 20 }]}>
                Delete Account
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 12,
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

export default ProfileSettingsScreen;
