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

function CreateGroupPopup(props) {
  const showPopup = props.showPopup;
  const toggleShowPopup = props.toggleShowPopup;

  const [showConfirm, toggleShowConfirm] = React.useState(false);
  const [groupName, changeGroupName] = React.useState("");
  const [alias, changeAlias] = React.useState("");

  const onSubmit = () => {
    if (groupName.trim() <= 0) {
      alert("Please enter a group name.");
    } else {
      toggleShowPopup(false);

      // here we would do a backend request to create a new group

      toggleShowConfirm(true);

      // erase values or else they will be stored
      changeGroupName("");
      changeAlias("");
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
            <View style={STYLES.centeredModalView}>
              <View style={STYLES.webModalView}>
                <View
                  style={{
                    marginLeft: 40,
                    paddingBottom: 30,
                  }}
                >
                  <Text style={{ fontSize: 30 }}>Create a Group</Text>
                </View>
                <Text style={{ fontSize: 20 }}>Enter Group Name:</Text>
                <View
                  style={{
                    height: 45,
                    width: 275,
                    marginBottom: 20,
                  }}
                >
                  <TextInput
                    style={STYLES.textInput}
                    placeholder={"Group Name"}
                    placeholderTextColor={"#D3D3D3"}
                    onChangeText={changeGroupName}
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
                    onChangeText={changeAlias}
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
                    Successful Group Creation!
                  </Text>
                </View>
                <Text style={{ fontSize: 20 }}>
                  Your group code is: 2020. Use it to invite other members! You
                  can also view it later in your Group Settings.
                </Text>
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
                    marginLeft: 40,
                    paddingBottom: 30,
                  }}
                >
                  <Text style={{ fontSize: 30 }}>Create a Group</Text>
                </View>
                <Text style={{ fontSize: 20 }}>Enter Group Name:</Text>
                <View
                  style={{
                    height: 45,
                    width: 275,
                    marginBottom: 20,
                  }}
                >
                  <TextInput
                    style={STYLES.textInput}
                    placeholder={"Group Name"}
                    placeholderTextColor={"#D3D3D3"}
                    onChangeText={changeGroupName}
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
                    onChangeText={changeAlias}
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
                    Successful Group Creation!
                  </Text>
                </View>
                <Text style={{ fontSize: 20 }}>
                  Your group code is: 2020. Use it to invite other members! You
                  can also view it later in your Group Settings.
                </Text>
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

export default CreateGroupPopup;
