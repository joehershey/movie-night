import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Modal as MobileModal,
  TextInput,
} from "react-native";

import { COLORS, STYLES } from "../assets/saved";
import { FontAwesome5 } from "@expo/vector-icons";
import Modal from "modal-react-native-web";

function JoinGroupPopup(props) {
  const showPopup = props.showPopup;
  const toggleShowPopup = props.toggleShowPopup;
  return (
    <View>
      {/* "Modal" does not work the same between the web app and phone apps, so we must check if the platform
        is web or not, using a downloaded modal if so and using the tradition, mobile version if the platform is
        not web. Remember- if you are changing the popup, you MUST change both the web and the mobile versions. */}
      {/* WEB MODAL */}
      {Platform.OS == "web" ? (
        <Modal visible={showPopup} transparent={true}>
          <View style={STYLES.centeredModalView}>
            <View style={STYLES.webModalView}>
              <View
                style={{
                  marginLeft: 40,
                  paddingBottom: 30,
                }}
              >
                <Text style={{ fontSize: 30 }}>Join a Group</Text>
              </View>
              <Text style={{ fontSize: 20 }}>Enter Group Code:</Text>
              <View
                style={{
                  height: 45,
                  width: 275,
                  marginBottom: 20,
                }}
              >
                <TextInput
                  style={STYLES.textInput}
                  placeholder={"Group Code"}
                  placeholderTextColor={"#D3D3D3"}
                ></TextInput>
              </View>

              <Text style={{ fontSize: 20 }}>
                Enter Your Alias for the Group (Optional):
              </Text>
              <View
                style={{
                  height: 45,
                  width: 275,
                  marginBottom: 20,
                }}
              >
                <TextInput
                  style={STYLES.textInput}
                  placeholder={"Alias"}
                  placeholderTextColor={"#D3D3D3"}
                ></TextInput>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableWithoutFeedback
                  onPress={() => toggleShowPopup(!showPopup)}
                >
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
      ) : (
        <MobileModal visible={showPopup} transparent={true}>
          {/* MOBILE MODAL */}
          <View style={STYLES.centeredModalView}>
            <View style={STYLES.mobileModalView}>
              <View
                style={{
                  marginLeft: 40,
                  paddingBottom: 30,
                }}
              >
                <Text style={{ fontSize: 30 }}>Join a Group</Text>
              </View>
              <Text style={{ fontSize: 20 }}>Enter Group Code:</Text>
              <View
                style={{
                  height: 45,
                  width: 275,
                  marginBottom: 20,
                }}
              >
                <TextInput
                  style={STYLES.textInput}
                  placeholder={"Group Code"}
                  placeholderTextColor={"#D3D3D3"}
                ></TextInput>
              </View>

              <Text style={{ fontSize: 20 }}>
                Enter Your Alias for the Group (Optional):
              </Text>
              <View
                style={{
                  height: 45,
                  width: 275,
                  marginBottom: 20,
                }}
              >
                <TextInput
                  style={STYLES.textInput}
                  placeholder={"Alias"}
                  placeholderTextColor={"#D3D3D3"}
                ></TextInput>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableWithoutFeedback
                  onPress={() => toggleShowPopup(!showPopup)}
                >
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
      )}
    </View>
  );
}

export default JoinGroupPopup;
