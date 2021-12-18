import React from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Modal as MobileModal,
  Platform,
  Image,
} from "react-native";

import { COLORS, STYLES } from "../assets/saved";
import Modal from "modal-react-native-web";

function FinishVoting(props) {
  const showPopup = props.showPopup;
  const toggleShowPopup = props.toggleShowPopup;

  var title = props.title;
  var poster = "https://image.tmdb.org/t/p/w500" + props.poster_path;
  const onConfirm = () => {
    console.log("ayo");
    console.log(
      props.url + "group/" + props.group_id + "/movie/" + props.tmdb_id
    );
    // access the database, delete the movie from the queue
    fetch(props.url + "group/" + props.group_id + "/movie/" + props.tmdb_id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + props.token,
      },
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
    toggleShowPopup(false);
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
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 20, textAlign: "center" }}>
                    Your group voted for
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {title}
                  </Text>
                  <Text style={{ fontSize: 20, textAlign: "center" }}>
                    Would you like to delete it from the queue?
                  </Text>
                </View>
                <View style={{ alignSelf: "center", flex: 3 }}>
                  <Image
                    style={{ width: 200 * 0.3, height: 300 * 0.3, margin: 10 }}
                    source={{
                      uri: poster,
                      //uri:
                      //  "https://image.tmdb.org/t/p/w500/1BIoJGKbXjdFDAqUEiA2VHqkK1Z.jpg",
                    }}
                  />
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
                        Yes
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
                        No
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
                  }}
                >
                  <Text style={{ fontSize: 20, textAlign: "center" }}>
                    Your group voted for
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {title}
                  </Text>
                  <Text style={{ fontSize: 20, textAlign: "center" }}>
                    Would you like to delete it from the queue?
                  </Text>
                </View>
                <View style={{ alignSelf: "center", flex: 3 }}>
                  <Image
                    style={{ width: 200 * 0.6, height: 300 * 0.6, margin: 10 }}
                    source={{
                      uri: poster,
                      //uri:
                      //  "https://image.tmdb.org/t/p/w500/1BIoJGKbXjdFDAqUEiA2VHqkK1Z.jpg",
                    }}
                  />
                </View>
                <View style={{ flexDirection: "row", marginLeft: 20 }}>
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
                        Yes
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
                        No
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

export default FinishVoting;
