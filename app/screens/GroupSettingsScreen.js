import React, { useState } from "react";
import { View, Text, Image, SafeAreaView, ScrollView } from "react-native";

import { COLORS, STYLES } from "../assets/saved";
import { TEST_DATA } from "../assets/testData";
import { FontAwesome5 } from "@expo/vector-icons";

import TabBar from "../components/TabBar";
import TopBar from "../components/TopBar";
import MemberInfo from "../components/MemberInfo";
import GroupSettings from "../components/GroupSettings";
import DeleteGroup from "../components/DeleteGroup";

import fetch from "cross-fetch";
//import fetch from "node-fetch"; // used to fix ReferenceError:
// fetch is not defined for
// LandingScreen-test.js. Remove if needed.

function GroupSettingsScreen(props) {
  const [loaded, setLoaded] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [maxMovies, setMaxMovies] = useState("");
  const [groupCode, setGroupCode] = useState("");

  /* This hook insures getUsersAPI() is only automatically called on the 
  first render (because of the empty array as the second argument) */
  if (loaded == false) {
    getMembersAPI();
  }

  /* Getss all members of the group from API */
  function getMembersAPI() {
    //TODO: Call GET @ ~ /group/props.group_id/users
    //DONE but not tested
    fetch(props.url + "group/" + props.group_id + "/users", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + props.token,
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setGroupMembers(responseJson); //replace arg with responseJson
        checkAdminStatus(responseJson); //replace arg with responseJson
        getGroupInfoAPI();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /* Gets group settings information from the API */
  function getGroupInfoAPI() {
    //TODO: Call GET @ ~ /group/props.group_id
    //      setGroupName(responseJson.group_name);
    //      setMaxMovies(responseJson.max_user_movies.toString());
    //DONE but not tested
    fetch(props.url + "group/" + props.group_id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + props.token,
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setMaxMovies(responseJson.max_user_movies.toString());
        setGroupName(responseJson.group_name);
        setGroupCode(responseJson.group_code);
        setLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /* Sets group settings information through the API */
  function changeGroupSettingsAPI() {
    //TODO: Call PATCH @ ~ /group/props.group_id
    //      params-> max_user_movies:  parseInt(maxMovies), group_name: groupName

    let max = 0;
    if (parseInt(maxMovies) > 0) {
      max = parseInt(maxMovies);
    } else {
      max = 1;
    }
    console.log(max + "<-max");
    console.log(groupName + "<-group name");
    fetch(props.url + "group/" + props.group_id + "/group_name", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + props.token,
      },
      method: "PATCH",
      body: JSON.stringify({
        group_name: groupName,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        changeGroupMaxAPI(max);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function changeGroupMaxAPI(max) {
    fetch(props.url + "group/" + props.group_id + "/max_user_movies", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + props.token,
      },
      method: "PATCH",
      body: JSON.stringify({
        max_user_movies: max,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setLoaded(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /* removes current user (leaving group) or other user (kicking) from group */
  function removeFromGroupAPI(user_id) {
    //TODO: Call DELETE @ ~ /user/[user_id]/props.group_id
    //      .then getMembersAPI(); //refresh page
    //DONE but need to test

    fetch(props.url + "user/" + user_id + "/" + props.group_id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + props.token,
      },
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (user_id != props.user_id) {
          setLoaded(false);
        } else {
          props.navigation.navigate("Landing");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function setAdminStatusAPI(user_id, is_admin) {
    //TODO: Call PATCH @ ~ /user/[user_id]/props.group_id/admin
    //      params-> is_admin: is_admin (the parameter)
    //      .then getMembersAPI(); //refresh page
    //DONE but need to test

    fetch(props.url + "user/" + user_id + "/" + props.group_id + "/admin", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + props.token,
      },
      method: "PATCH",
      body: JSON.stringify({
        is_admin: is_admin,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setLoaded(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function setAliasAPI(alias) {
    //TODO: Call PATCH @ ~ /user/[user_id]/props.group_id/alias
    //      params-> alias: alias (the parameter)
    //DONE but need to test

    fetch(
      props.url + "user/" + props.user_id + "/" + props.group_id + "/alias",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + props.token,
        },
        method: "PATCH",
        body: JSON.stringify({
          alias: alias,
        }),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setLoaded(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /* Deletes group from the app */
  function deleteGroupAPI() {
    //TODO: Call DELETE @ ~ /group/props.group_id
    //DONE but need to test

    fetch(props.url + "group/" + props.group_id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + props.token,
      },
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        props.navigation.navigate("Landing");
        alert(groupName + " deleted");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /* AUXILLARY FUNCTIONS */

  /* Removes user from group and navigates to the landing page */
  function leaveGroup() {
    removeFromGroupAPI(props.user_id);
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
    //only non applied to properties
    if (member.user_id == props.user_id) {
      currentUserRenderHTML.push(
        /* Card holding user info/leave group */
        <MemberInfo
          key={i}
          member={member}
          isUser={true}
          leaveGroup={() => leaveGroup()}
          setAliasAPI={(alias) => setAliasAPI(alias)}
        ></MemberInfo>
      );
    } else {
      usersToRenderHTML.push(
        /* Collapsable card with member info/edit if admin */
        <MemberInfo
          key={i}
          member={member}
          isAdmin={isAdmin}
          isUser={false}
          removeFromGroupAPI={(user_id) => {
            removeFromGroupAPI(user_id);
          }}
          setAdminStatusAPI={(user_id, is_admin) => {
            setAdminStatusAPI(user_id, is_admin);
          }}
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
      <View style={[STYLES.content, { backgroundColor: "black" }]}>
        <ScrollView
          style={{
            backgroundColor: COLORS.primary,
            flexDirection: "column",
          }}
          contentContainerStyle={{
            justifyContent: "flex-start",
            alignItems: "stretch",
          }}
        >
          {/* Groups preferences edit/view based on admin status */}
          <GroupSettings
            maxMovies={maxMovies}
            groupName={groupName}
            isAdmin={isAdmin}
            url={props.url}
            group_id={props.group_id}
            group_code={groupCode}
            token={props.token}
            setMaxMovies={(set) => setMaxMovies(set)}
            setGroupName={(set) => setGroupName(set)}
            changeGroupSettingsAPI={() => changeGroupSettingsAPI()}
            setCode={() => getGroupInfoAPI()}
          ></GroupSettings>

          <View style={{ alignItems: "center" }}>
            <View
              style={{
                marginTop: 20,
                flexDirection: "column",
              }}
            >
              <Text
                style={{
                  fontSize: 35,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Members
              </Text>
            </View>
          </View>
          {/* View/edit group members based on admin status */}
          <View>
            {/* note currentUser is displayed before other users */}
            {currentUserRenderHTML}
            {usersToRenderHTML}
          </View>

          {/* Delete group button if admin */}
          {isAdmin && (
            <DeleteGroup deleteGroupAPI={() => deleteGroupAPI()}></DeleteGroup>
          )}

          <View style={{ height: 50 }}></View>
        </ScrollView>
      </View>
      {/* Tabs */}
      <TabBar navigation={props.navigation} screen="settings"></TabBar>
    </SafeAreaView>
  );
}

export default GroupSettingsScreen;
