import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback, TextInput } from "react-native";

import { COLORS, STYLES } from "../assets/saved";

function DeleteGroup(props) {
  const [deleteMode, setDeleteMode] = useState(false);

  return (
    <View>
      {!deleteMode && (
        <TouchableWithoutFeedback
          onPress={() => {
            setDeleteMode(true);
          }}
        >
          <View
            style={{
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              backgroundColor: COLORS.danger,
              borderRadius: 10,
              width: "50%",
              paddingLeft: 10,
              paddingRight: 10,
              margin: 10,
              marginTop: 60,
              height: 80,
            }}
          >
            <Text style={{ color: "white", margin: 5, fontSize: 20 }}>
              Delete Group
            </Text>
          </View>
        </TouchableWithoutFeedback>
      )}
      {deleteMode && (
        <View
          style={{
            width: "80%",
            backgroundColor: "#f2eceb",
            alignSelf: "center",
            borderRadius: 10,
            padding: 10,
            marginTop: 60,
          }}
        >
          <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
            Are you sure?
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableWithoutFeedback
              onPress={() => {
                setDeleteMode(false);
                props.deleteGroupAPI();
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  alignSelf: "center",
                  justifyContent: "center",
                  backgroundColor: COLORS.danger,
                  flex: 1,
                  borderRadius: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                  margin: 10,
                  height: 60,
                }}
              >
                <Text style={{ color: "white", margin: 5, fontSize: 15 }}>
                  Delete Group
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                setDeleteMode(false);
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  alignSelf: "center",
                  justifyContent: "center",
                  backgroundColor: "grey",
                  flex: 1,
                  borderRadius: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                  margin: 10,
                  height: 60,
                }}
              >
                <Text style={{ color: "white", margin: 5, fontSize: 15 }}>
                  Cancel
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      )}
    </View>
  );
}

export default DeleteGroup;
