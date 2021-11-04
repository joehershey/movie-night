import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback, TextInput } from "react-native";

import { COLORS, STYLES } from "../assets/saved";

function GroupSettings(props) {
  const [edit, setEdit] = useState(false);

  return (
    <View
      style={{
        borderColor: COLORS.lg,
        borderWidth: 5,
        margin: 10,
        borderRadius: 20,
      }}
    >
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            margin: 20,
            flexDirection: "column",
          }}
        >
          <Text style={{ fontSize: 35, fontWeight: "bold" }}>
            Group Settings
          </Text>
        </View>
      </View>

      <View
        style={{
          marginLeft: 15,
          marginRight: 15,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            flex: 1,
            margin: 5,
            fontSize: 18,
            fontStyle: "italic",
          }}
        >
          Group Name:
        </Text>
        <View style={{ flex: 1.5, flexDirection: "row" }}>
          <View style={{ flex: 12 }}>
            {!edit && (
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "right",
                }}
              >
                {props.groupName}
              </Text>
            )}

            {edit && (
              <TextInput
                style={[
                  STYLES.input,
                  STYLES.settingsInput,
                  {
                    borderColor:
                      props.groupName.length < 1 ? COLORS.danger : "lightgrey",
                  },
                ]}
                onChangeText={props.setGroupName}
                textAlign="center"
                value={props.groupName}
                placeholder="New group name"
              />
            )}
          </View>
        </View>
      </View>

      <View
        style={{
          marginLeft: 15,
          marginRight: 15,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            flex: 1.5,
            margin: 5,
            fontSize: 18,
            fontStyle: "italic",
          }}
        >
          Max. Movies Per User:
        </Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 12 }}>
            {!edit && (
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "right",
                }}
              >
                {props.maxMovies}
              </Text>
            )}

            {edit && (
              <TextInput
                style={[
                  STYLES.input,
                  STYLES.settingsInput,
                  {
                    borderColor:
                      props.maxMovies.length < 1 ? COLORS.danger : "lightgrey",
                  },
                ]}
                onChangeText={props.setMaxMovies}
                value={props.maxMovies}
                textAlign="center"
                keyboardType="number-pad"
                placeholder="Max. # per user"
              />
            )}
          </View>
        </View>
      </View>
      {props.isAdmin && (
        <TouchableWithoutFeedback
          onPress={() => {
            if (edit) {
              setEdit(!edit);
              props.changeGroupSettingsAPI();
            } else {
              setEdit(!edit);
            }
          }}
        >
          <View
            style={{
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              backgroundColor:
                props.maxMovies.length < 1 || props.groupName.length < 1
                  ? "lightgrey"
                  : COLORS.secondary,
              borderRadius: 10,
              width: "20%",
              paddingLeft: 10,
              paddingRight: 10,
              margin: 10,
              height: 40,
            }}
          >
            <Text style={{ color: "white", margin: 5, fontSize: 20 }}>
              {!edit ? "Edit" : "Save"}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

export default GroupSettings;
