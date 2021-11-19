import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Modal as MobileModal,
  TextInput,
  Platform,
  Keyboard,
} from "react-native";

import { COLORS, STYLES } from "../assets/saved";
import { FontAwesome5 } from "@expo/vector-icons";
import Modal from "modal-react-native-web";

function JoinGroupPopup(props) {
  const showPopup = props.showPopup;
  const toggleShowPopup = props.toggleShowPopup;

  const [groupCode, changeGroupCode] = React.useState("");
  const [alias, changeAlias] = React.useState("");
  const [flag, setFlag] = React.useState(true);

  function joinGroupAPI() {
    //TODO: Call POST @ ~ /group/
    //DONE but not tested
    let setAlias = alias;
    if (setAlias.length < 1) {
      setAlias = props.username;
    }

    fetch(props.url + "user/" + props.user_id + "/join", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + props.token,
      },
      method: "POST",
      body: JSON.stringify({
        group_code: groupCode,
        alias: setAlias,
        isAdmin: false,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.group_id === undefined) {
          alert("Group code not valid.");
        } else {
          toggleShowPopup(false);
          changeGroupCode("");
          changeAlias("");
          alert("You joined the group!");
          props.setLoaded(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function onSubmit() {
    if (groupCode.trim() <= 0) {
      alert("Please enter a group code.");
    } else {
      // here we would do a backend request to join a new group

      joinGroupAPI();

      // erase values or else they will be stored
    }
  }

  const onClose = () => {
    changeGroupCode("");
    changeAlias("");
    toggleShowPopup(false);
  };

  const keyboardControl = () => {
    if (Platform.OS == "web") {
    } else {
      Keyboard.dismiss();
    }
  };

  return (
    <View>
      {/* "Modal" does not work the same between the web app and phone apps, so we must check if the platform
        is web or not, using a downloaded modal if so and using the tradition, mobile version if the platform is
        not web. Remember- if you are changing the popup, you MUST change both the web and the mobile versions. */}
      {/* WEB MODAL */}
      {Platform.OS == "web" ? (
        <Modal visible={showPopup} transparent={true} ariaHideApp={false}>
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
                  onChangeText={changeGroupCode}
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
                <TouchableWithoutFeedback onPress={onClose}>
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
          <TouchableWithoutFeedback onPress={keyboardControl}>
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
                    onChangeText={changeGroupCode}
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
                  <TouchableWithoutFeedback onPress={onClose}>
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
          </TouchableWithoutFeedback>
        </MobileModal>
      )}
    </View>
  );
}

export default JoinGroupPopup;
