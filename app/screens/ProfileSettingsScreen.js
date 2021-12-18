import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";

import { COLORS, STYLES } from "../assets/saved";

import TopBar from "../components/TopBar";
import ChangePassword from "../components/ChangePassword";

function ProfileSettingsScreen(props) {
  const [showPopup, toggleShowPopup] = React.useState(false);

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
        url={props.url}
        user_id={props.user_id}
      />

      {/* Content */}
      <View style={styles.content}>
        <Text style={{ fontSize: 50, color: "white" }}>
          {"Profile Settings"}
        </Text>
        <Text style={{ fontSize: 30, color: "white" }}>
          {"Username: " + props.username}
        </Text>

        <View style={{ width: "100%", alignItems: "center" }}>
          <TouchableWithoutFeedback
            testID="ChangePasswordButton"
            onPress={() => toggleShowPopup(!showPopup)}
          >
            <View
              style={[
                STYLES.settingsButtons,
                STYLES.btn,
                { backgroundColor: COLORS.secondary },
              ]}
            >
              <Text style={[{ color: "white", fontSize: 20 }]}>
                Change Password
              </Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            testID="NavigateButton"
            onPress={() => props.navigation.navigate("Welcome")}
          >
            <View
              style={[
                STYLES.settingsButtons,
                STYLES.btn,
                { backgroundColor: "white" },
              ]}
            >
              <Text style={[{ color: COLORS.primary, fontSize: 20 }]}>
                Log out
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
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

export default ProfileSettingsScreen;
