import React from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Modal as MobileModal,
  TextInput,
  Platform,
} from "react-native";

import { COLORS, STYLES } from "../assets/saved";
import { FontAwesome5 } from "@expo/vector-icons";
import Modal from "modal-react-native-web";

import fetch from "cross-fetch";

function DeleteAccount(props) {
  const showPopup = props.showPopup;
  const toggleShowPopup = props.toggleShowPopup;

  const [showConfirm, toggleShowConfirm] = React.useState(false);
  const [currentPassword, changeCurrentPassword] = React.useState("");
  const [confirmPassword, changeConfirmPassword] = React.useState("");
  const [newPassword, changeNewPassword] = React.useState("");

  const onConfirm = () => {
    // access the database, delete the users account and then send them to welcome screen logged out
    showConfirm(false);
    props.navigation.navigate("Welcome");
  };

  return (
    <View>
      {/* "Modal" does not work the same between the web app and phone apps, so we must check if the platform
        is web or not, using a downloaded modal if so and using the tradition, mobile version if the platform is
        not web. Remember- if you are changing the popup, you MUST change both the web and the mobile versions. */}

      {/* WEB MODAL */}
      {Platform.OS == "web" ? (
        <View>
          <Modal visible={showPopup} transparent={true}>
            <View style={STYLES.centeredModalView}>
              <View style={STYLES.webModalView}>
                <View
                  style={{
                    marginLeft: 20,
                    paddingBottom: 30,
                  }}
                >
                  <Text style={{ fontSize: 30 }}>
                    Are you sure you would like to delete your account?
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <TouchableWithoutFeedback onPress={onConfirm}>
                    <View
                      style={[
                        STYLES.submitButton,
                        STYLES.btn,
                        { backgroundColor: COLORS.danger },
                      ]}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 20,
                          alignContent: "center",
                        }}
                      >
                        Confirm
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={() => toggleShowPopup(!showPopup)}
                  >
                    <View style={[STYLES.closeButton, STYLES.btn]}>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 20,
                          alignContent: "center",
                        }}
                      >
                        Close
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      ) : (
        <View>
          <MobileModal visible={showPopup} transparent={true}>
            <View style={STYLES.centeredModalView}>
              <View style={STYLES.mobileModalView}>
                <View
                  style={{
                    marginLeft: 20,
                    paddingBottom: 30,
                  }}
                >
                  <Text style={{ fontSize: 30 }}>
                    Are you sure you would like to delete your account?
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <TouchableWithoutFeedback onPress={onConfirm}>
                    <View
                      style={[
                        STYLES.submitButton,
                        STYLES.btn,
                        { backgroundColor: COLORS.danger },
                      ]}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 20,
                          alignContent: "center",
                        }}
                      >
                        Confirm
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={() => toggleShowPopup(!showPopup)}
                  >
                    <View style={[STYLES.closeButton, STYLES.btn]}>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 20,
                          alignContent: "center",
                        }}
                      >
                        Close
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
          </MobileModal>
        </View>
      )}
    </View>
  );
}

export default DeleteAccount;
