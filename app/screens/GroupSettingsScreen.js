import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";

import { COLORS, STYLES } from "../assets/saved";
import { TEST_DATA } from "../assets/testData";
import { FontAwesome5 } from "@expo/vector-icons";

import TabBar from "../components/TabBar";
import TopBar from "../components/TopBar";

function GroupSettingsScreen(props) {
  const [edit, setEdit] = useState(false);
  const [groupName, setGroupName] = useState(TEST_DATA.group_data.group_name);
  const [maxMovies, setMaxMovies] = useState(
    TEST_DATA.group_data.max_user_movies.toString()
  );

  return (
    <SafeAreaView style={STYLES.container}>
      {/* Top Bar */}
      <TopBar
        navigation={props.navigation}
        screen="Landing"
        message="Groups"
      ></TopBar>
      {/* Content */}
      <View style={STYLES.content}>
        <ScrollView
          style={{
            backgroundColor: "white",
            flexDirection: "column",
          }}
          contentContainerStyle={{
            justifyContent: "flex-start",
            alignItems: "stretch",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                margin: 20,
                flexDirection: "column",
              }}
            >
              <Text style={{ fontSize: 35 }}>Group Settings</Text>
              <TouchableWithoutFeedback onPress={() => setEdit(!edit)}>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: COLORS.secondary,
                    borderRadius: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                    margin: 10,
                    height: 50,
                  }}
                >
                  <Text style={{ color: "white", margin: 5, fontSize: 20 }}>
                    {!edit ? "Edit" : "Save"}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>

          <View
            style={{
              margin: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ flex: 1, margin: 5, fontSize: 20 }}>
              Group Name:{""}
            </Text>
            <View style={{ flex: 1.5, flexDirection: "row" }}>
              <View style={{ flex: 12 }}>
                {!edit && <Text style={{ fontSize: 20 }}>{groupName}</Text>}

                {edit && (
                  <TextInput
                    style={[STYLES.input, STYLES.settingsInput]}
                    onChangeText={setGroupName}
                    value={groupName}
                    placeholder="Enter new group name:"
                  />
                )}
              </View>
            </View>
          </View>

          <View
            style={{
              margin: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ flex: 1.5, margin: 5, fontSize: 20 }}>
              Max. Movies Per User:
            </Text>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 12 }}>
                {!edit && <Text style={{ fontSize: 20 }}>{maxMovies}</Text>}

                {edit && (
                  <TextInput
                    style={[STYLES.input, STYLES.settingsInput]}
                    onChangeText={setMaxMovies}
                    value={maxMovies}
                    placeholder="Enter new group name:"
                  />
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      {/* Tabs */}
      <TabBar navigation={props.navigation} screen="settings"></TabBar>
    </SafeAreaView>
  );
}

export default GroupSettingsScreen;
