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

function ChangePassword(props) {
  const showPopup = props.showPopup;
  const toggleShowPopup = props.toggleShowPopup;

  const [showConfirm, toggleShowConfirm] = React.useState(false);
  const [currentPassword, changeCurrentPassword] = React.useState("");
  const [confirmPassword, changeConfirmPassword] = React.useState("");
  const [newPassword, changeNewPassword] = React.useState("");

  const onSubmit = () => {
    if (
      currentPassword.trim() <= 0 ||
      confirmPassword.trim() <= 0 ||
      newPassword.trim() <= 0
    ) {
      alert("Please fill out all fields.");
    } else if (newPassword != confirmPassword) {
      alert("Password confirmation unsuccessful.");
    }
    // check if current password is correct -- database call
    else {
      toggleShowPopup(false);

      // here we would do a backend request to create a new group

      toggleShowConfirm(true);

      // erase values or else they will be stored
      changeCurrentPassword("");
      changeConfirmPassword("");
    }
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
            {/* MOBILE MODAL */}
            <View style={STYLES.centeredModalView}>
              <View style={STYLES.webModalView}>
                <View
                  style={{
                    marginLeft: 30,
                    paddingBottom: 10,
                  }}
                >
                  <Text style={{ fontSize: 30 }}>Change Password</Text>
                </View>
                <Text style={{ fontSize: 20 }}>Current Password:</Text>
                <View
                  style={{
                    height: 45,
                    width: 275,
                    marginBottom: 5,
                  }}
                >
                  <TextInput
                    style={STYLES.textInput}
                    placeholder={"Group Name"}
                    placeholderTextColor={"#D3D3D3"}
                    onChangeText={changeCurrentPassword}
                  ></TextInput>
                </View>

                <Text style={{ fontSize: 20 }}>New Password:</Text>
                <View
                  style={{
                    height: 45,
                    width: 275,
                    marginBottom: 5,
                  }}
                >
                  <TextInput
                    style={STYLES.textInput}
                    placeholder={"New Password"}
                    placeholderTextColor={"#D3D3D3"}
                    onChangeText={changeNewPassword}
                  ></TextInput>
                </View>
                <Text style={{ fontSize: 20 }}>Confirm New Password:</Text>
                <View
                  style={{
                    height: 45,
                    width: 275,
                    marginBottom: 5,
                  }}
                >
                  <TextInput
                    style={STYLES.textInput}
                    placeholder={"New Password"}
                    placeholderTextColor={"#D3D3D3"}
                    onChangeText={changeConfirmPassword}
                  ></TextInput>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <TouchableWithoutFeedback onPress={onSubmit}>
                    <View style={[STYLES.submitButton, STYLES.btn]}>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 20,
                          alignContent: "center",
                        }}
                      >
                        Submit
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

          <Modal visible={showConfirm} transparent={true}>
            <View style={STYLES.centeredModalView}>
              <View style={STYLES.webModalView}>
                <View
                  style={{
                    marginLeft: 40,
                    paddingBottom: 30,
                  }}
                >
                  <Text style={{ fontSize: 30 }}>
                    You have changed your password!
                  </Text>
                </View>

                <TouchableWithoutFeedback
                  onPress={() => toggleShowConfirm(!showConfirm)}
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
          </Modal>
        </View>
      ) : (
        <View>
          <MobileModal visible={showPopup} transparent={true}>
            {/* MOBILE MODAL */}
            <View style={STYLES.centeredModalView}>
              <View style={STYLES.mobileModalView}>
                <View
                  style={{
                    marginLeft: 30,
                    paddingBottom: 10,
                  }}
                >
                  <Text style={{ fontSize: 30 }}>Change Password</Text>
                </View>
                <Text style={{ fontSize: 20 }}>Current Password:</Text>
                <View
                  style={{
                    height: 45,
                    width: 275,
                    marginBottom: 5,
                  }}
                >
                  <TextInput
                    style={STYLES.textInput}
                    placeholder={"Group Name"}
                    placeholderTextColor={"#D3D3D3"}
                    onChangeText={changeCurrentPassword}
                  ></TextInput>
                </View>

                <Text style={{ fontSize: 20 }}>New Password:</Text>
                <View
                  style={{
                    height: 45,
                    width: 275,
                    marginBottom: 5,
                  }}
                >
                  <TextInput
                    style={STYLES.textInput}
                    placeholder={"New Password"}
                    placeholderTextColor={"#D3D3D3"}
                    onChangeText={changeNewPassword}
                  ></TextInput>
                </View>
                <Text style={{ fontSize: 20 }}>Confirm New Password:</Text>
                <View
                  style={{
                    height: 45,
                    width: 275,
                    marginBottom: 5,
                  }}
                >
                  <TextInput
                    style={STYLES.textInput}
                    placeholder={"New Password"}
                    placeholderTextColor={"#D3D3D3"}
                    onChangeText={changeConfirmPassword}
                  ></TextInput>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <TouchableWithoutFeedback onPress={onSubmit}>
                    <View style={[STYLES.submitButton, STYLES.btn]}>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 20,
                          alignContent: "center",
                        }}
                      >
                        Submit
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

          <MobileModal visible={showConfirm} transparent={true}>
            <View style={STYLES.centeredModalView}>
              <View style={STYLES.mobileModalView}>
                <View
                  style={{
                    marginLeft: 20,
                    paddingBottom: 30,
                  }}
                >
                  <Text style={{ fontSize: 30 }}>
                    You have changed your password!
                  </Text>
                </View>
                <TouchableWithoutFeedback
                  onPress={() => toggleShowConfirm(!showConfirm)}
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
          </MobileModal>
        </View>
      )}
    </View>
  );
}

export default ChangePassword;
