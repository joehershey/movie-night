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

function GroupSettingsScreen(props) {
  const [loaded, setLoaded] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [maxMovies, setMaxMovies] = useState("");

  /* This hook insures getUsersAPI() is only automatically called on the 
  first render (because of the empty array as the second argument) */
  if (loaded == false) {
    getMembersAPI();
  }

  /* Getss all members of the group from API */
  function getMembersAPI() {
    //TODO: Call GET @ ~ /group/props.group_id/users
    //DONE but not tested
    /* fetch(props.url + "group/" + props.group_id + "/users", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
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
 */
    //code below should be done in the .then code block
    setGroupMembers(TEST_DATA.group_data.members); //replace arg with responseJson
    checkAdminStatus(TEST_DATA.group_data.members); //replace arg with responseJson
    getGroupInfoAPI();
  }

  /* Gets group settings information from the API */
  function getGroupInfoAPI() {
    //TODO: Call GET @ ~ /group/props.group_id
    //      setGroupName(responseJson.group_name);
    //      setMaxMovies(responseJson.max_user_movies.toString());
    //DONE but not tested
    /* fetch(props.url + "group/" + props.group_id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setMaxMovies(responseJson.max_user_movies);
        setGroupName(responseJson.group_name);
        setLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      }); */

    setGroupName(TEST_DATA.group_data.group_name);
    setMaxMovies(TEST_DATA.group_data.max_user_movies.toString());
    setLoaded(true);
  }

  /* Sets group settings information through the API */
  function changeGroupSettingsAPI() {
    //TODO: Call PATCH @ ~ /group/props.group_id
    //      params-> max_user_movies: (if < 1 -> = 1) parseInt(maxMovies), group_name: groupName
    //      .then getMembersAPI(); //refresh page
    //DONE except hasn't been tested

    /* let max = 0;
    if (parseInt(maxMovies) > 0) {
      max = parseInt(maxMovies);
    } else {
      max = 1;
    }
    fetch(props.url + "group/" + props.group_id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "PATCH",
      body: JSON.stringify({
        group_name: groupName,
        max_user_movies: max,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setLoaded(false);
      })
      .catch((error) => {
        console.error(error);
      }); */

    TEST_DATA.group_data.group_name = groupName;
    if (parseInt(maxMovies) > 0) {
      TEST_DATA.group_data.max_user_movies = parseInt(maxMovies);
    } else {
      TEST_DATA.group_data.max_user_movies = 1;
    }
    setLoaded(false);
  }

  /* removes current user (leaving group) or other user (kicking) from group */
  function removeFromGroupAPI(user_id) {
    //TODO: Call DELETE @ ~ /user/[user_id]/props.group_id
    //      .then getMembersAPI(); //refresh page
    //DONE but need to test

    /* fetch(props.url + "user/" + user_id + "/" + props.group_id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setLoaded(false);
      })
      .catch((error) => {
        console.error(error);
      }); */

    /* this code is simply to simulate the process */
    let members = groupMembers;
    for (let i = 0; i < members.length; i++) {
      if (members[i].user_id == user_id) {
        members.splice(i, 1);
        break;
      }
    }
    TEST_DATA.group_data.members = members;
    setLoaded(false);
  }

  function setAdminStatusAPI(user_id, is_admin) {
    //TODO: Call PATCH @ ~ /user/[user_id]/props.group_id/admin
    //      params-> is_admin: is_admin (the parameter)
    //      .then getMembersAPI(); //refresh page
    //DONE but need to test

    /* fetch(props.url + "user/" + user_id + "/" + props.group_id + "/admin", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
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
      }); */

    /* this code is simply to simulate the process without the API */
    let members = groupMembers;
    for (let i = 0; i < members.length; i++) {
      if (members[i].user_id == user_id) {
        members[i].is_admin = is_admin ? 1 : 0;
        break;
      }
    }
    TEST_DATA.group_data.members = members;
    setLoaded(false);
  }

  function setAliasAPI(alias) {
    //TODO: Call PATCH @ ~ /user/[user_id]/props.group_id/alias
    //      params-> alias: alias (the parameter)
    //      .then getMembersAPI(); //refresh page
    //DONE but need to test

    /* fetch(props.url + "user/" + props.user_id + "/" + props.group_id + "/alias", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=utf-8",
        },
        method: "PATCH",
        body: JSON.stringify({
          alias: alias,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          setLoaded(false);
        })
        .catch((error) => {
          console.error(error);
        }); */

    /* this code is simply to simulate the process without the API */
    let members = groupMembers;
    for (let i = 0; i < members.length; i++) {
      if (members[i].user_id == props.user_id) {
        members[i].display_name = alias;
        break;
      }
    }
    TEST_DATA.group_data.members = members;
    setLoaded(false);
  }

  /* Deletes group from the app */
  function deleteGroupAPI() {
    //TODO: Call DELETE @ ~ /group/props.group_id
    //DONE but need to test

    /* fetch(props.url + "group/" + props.group_id, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((responseJson) => {
          props.navigation.navigate('Landing')
          alert(groupName + " deleted")
      })
      .catch((error) => {
        console.error(error);
      });  */

    /* this code is simply to simulate the process */
    props.navigation.navigate("Landing");
    alert(groupName + " deleted");
  }

  /* AUXILLARY FUNCTIONS */

  /* Removes user from group and navigates to the landing page */
  function leaveGroup() {
    removeFromGroupAPI(props.user_id);
    props.navigation.navigate("Landing");
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
          {/* Groups preferences edit/view based on admin status */}
          <GroupSettings
            maxMovies={maxMovies}
            groupName={groupName}
            isAdmin={isAdmin}
            setMaxMovies={(set) => setMaxMovies(set)}
            setGroupName={(set) => setGroupName(set)}
            changeGroupSettingsAPI={() => changeGroupSettingsAPI()}
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
