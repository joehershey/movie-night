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
import { Card } from "react-native-elements";

import { COLORS, STYLES } from "../assets/saved";
import { TEST_DATA } from "../assets/testData";
import { FontAwesome5 } from "@expo/vector-icons";

import TabBar from "../components/TabBar";
import TopBar from "../components/TopBar";
import MemberInfo from "../components/MemberInfo";

function GroupSettingsScreen(props) {
  const [edit, setEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [maxMovies, setMaxMovies] = useState("");

  /* This hook insures getUsersAPI() is only automatically called on the 
  first render (because of the empty array as the second argument) */
  useEffect(() => {
    getMembersAPI();
  }, []);

  /* Getss all members of the group from API */
  function getMembersAPI() {
    //TODO: Call GET @ ~ /group/props.group_id/users

    //code below should be done in the .then code block
    setGroupMembers(TEST_DATA.group_data.members); //replace arg with responseJson
    console.log(TEST_DATA.group_data.members);
    getGroupInfoAPI();
    checkAdminStatus(TEST_DATA.group_data.members); //replace arg with responseJson
  }

  /* Gets group settings information from the API */
  function getGroupInfoAPI() {
    //TODO: Call GET @ ~ /group/props.group_id
    //      setGroupName(responseJson.group_name);
    //      setMaxMovies(responseJson.max_user_movies.toString());
    setGroupName(TEST_DATA.group_data.group_name);
    setMaxMovies(TEST_DATA.group_data.max_user_movies.toString());
  }

  /* Sets group settings information through the API */
  function changeGroupSettingsAPI() {
    //TODO: Call PATCH @ ~ /group/props.group_id
    //      params-> max_user_movies: (if != "") parseInt(maxMovies), group_name: groupName
    //      .then getMembersAPI(); //refresh page
    TEST_DATA.group_data.group_name = groupName;
    if (maxMovies != "") {
      TEST_DATA.group_data.max_user_movies = parseInt(maxMovies);
      //else
    }
    getMembersAPI();
  }

  /* removes current user (leaving group) or other user (kicking) from group */
  function removeFromGroupAPI(user_id) {
    //TODO: Call DELETE @ ~ /user/[user_id]/props.group_id
    //      .then getMembersAPI(); //refresh page

    /* this code is simply to simulate the process */
    let members = groupMembers;
    for (let i = 0; i < members.length; i++) {
      if (members[i].user_id == user_id) {
        members.splice(i, 1);
        break;
      }
    }
    TEST_DATA.group_data.members = members;
    getMembersAPI();
  }

  function setAdminStatusAPI(user_id, is_admin) {
    //TODO: Call PATCH @ ~ /user/[user_id]/props.group_id/admin
    //      params-> is_admin: is_admin (the parameter)
    //      .then getMembersAPI(); //refresh page

    /* this code is simply to simulate the process without the API */
    let members = groupMembers;
    for (let i = 0; i < members.length; i++) {
      if (members[i].user_id == user_id) {
        members[i].is_admin = is_admin ? 1 : 0;
        break;
      }
    }
    TEST_DATA.group_data.members = members;
    getMembersAPI();
  }

  function setAliasAPI(alias) {
    //TODO: Call PATCH @ ~ /user/[user_id]/props.group_id/alias
    //      params-> alias: alias (the parameter)
    //      .then getMembersAPI(); //refresh page

    /* this code is simply to simulate the process without the API */
    let members = groupMembers;
    for (let i = 0; i < members.length; i++) {
      if (members[i].user_id == props.user_id) {
        members[i].display_name = alias;
        break;
      }
    }
    TEST_DATA.group_data.members = members;
    getMembersAPI();
  }

  /* AUXILLARY FUNCTIONS */

  /* Removes user from group and navigates to the landing page */
  function leaveGroup() {
    removeFromGroupAPI(props.user_id);
    //props.navigation.navigate("Landing");
  }

  /* Sets whether or not the user is an admin and thus has the ability to edit */
  function checkAdminStatus(members) {
    for (let i = 0; i < members.length; i++) {
      if (members[i].user_id == props.user_id) {
        setIsAdmin(members[i].is_admin ? true : false); //member isAdmin set true if active user is_admin
        break;
      }
    }
  }

  /* Generate members cards */

  const usersToRenderHTML = []; //Card for all other group members
  const currentUserRenderHTML = []; //Card for active user

  for (const [i, member] of groupMembers.entries()) {
    console.log("ayo");
    //only non applied to properties
    if (member.user_id == props.user_id) {
      currentUserRenderHTML.push(
        <MemberInfo
          member={member}
          isUser={true}
          leaveGroup={() => leaveGroup()}
          setAliasAPI={(alias) => setAliasAPI(alias)}
        ></MemberInfo>
      );
    } else {
      usersToRenderHTML.push(
        <MemberInfo
          member={member}
          isAdmin={isAdmin}
          isUser={false}
          removeFromGroupAPI={(user_id) => removeFromGroupAPI(user_id)}
          setAdminStatusAPI={(user_id, is_admin) =>
            setAdminStatusAPI(user_id, is_admin)
          }
        ></MemberInfo>
      );
    }
  }

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
                fontSize: 20,
                fontStyle: "italic",
              }}
            >
              Group Name:
            </Text>
            <View style={{ flex: 1.5, flexDirection: "row" }}>
              <View style={{ flex: 12 }}>
                {!edit && (
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    {groupName}
                  </Text>
                )}

                {edit && (
                  <TextInput
                    style={[STYLES.input, STYLES.settingsInput]}
                    onChangeText={setGroupName}
                    textAlign="center"
                    value={groupName}
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
                fontSize: 20,
                fontStyle: "italic",
              }}
            >
              Max. Movies Per User:
            </Text>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 12 }}>
                {!edit && (
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    {maxMovies}
                  </Text>
                )}

                {edit && (
                  <TextInput
                    style={[STYLES.input, STYLES.settingsInput]}
                    onChangeText={setMaxMovies}
                    value={maxMovies}
                    textAlign="center"
                    keyboardType="number-pad"
                    placeholder="Max. # per user"
                  />
                )}
              </View>
            </View>
          </View>
          {isAdmin && (
            <TouchableWithoutFeedback
              onPress={() => {
                if (edit) {
                  setEdit(!edit);
                  changeGroupSettingsAPI();
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
                  backgroundColor: COLORS.secondary,
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
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                marginTop: 20,
                flexDirection: "column",
                borderBottomWidth: 1,
                borderColor: "black",
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                }}
              >
                Members
              </Text>
            </View>
          </View>
          <View>
            {/* note currentUser is displayed before other users */}
            {currentUserRenderHTML}
            {usersToRenderHTML}
          </View>

          <View style={{ height: 50 }}></View>
        </ScrollView>
      </View>
      {/* Tabs */}
      <TabBar navigation={props.navigation} screen="settings"></TabBar>
    </SafeAreaView>
  );
}

export default GroupSettingsScreen;
