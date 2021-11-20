import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";

import { COLORS, STYLES } from "../assets/saved";
import { FontAwesome5 } from "@expo/vector-icons";

import TabBar from "../components/TabBar";
import TopBar from "../components/TopBar";
import Categories from "../components/Categories";
import Search from "../components/Search";

import fetch from "cross-fetch";

function SearchMoviesScreen(props) {
  const [display, setDisplay] = useState("categories");

  return (
    <SafeAreaView style={STYLES.container}>
      {/* Top Bar */}
      <TopBar
        navigation={props.navigation}
        screen="Landing"
        message="Groups"
      ></TopBar>
      {/* Content */}

      <View style={[STYLES.content, { backgroundColor: COLORS.primary }]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            margin: 10,
          }}
        >
          <TouchableWithoutFeedback onPress={() => setDisplay("categories")}>
            <View
              style={[
                styles.selectButton,
                display == "categories" ? styles.selected : styles.unselected,
                { borderTopLeftRadius: 10, borderBottomLeftRadius: 10 },
              ]}
            >
              <Text
                style={[
                  {
                    color: "white",
                    fontSize: 20,
                    alignContent: "center",
                  },
                  display == "categories"
                    ? { fontWeight: "bold" }
                    : { fontWeight: "normal" },
                ]}
              >
                Categories
              </Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => setDisplay("search")}>
            <View
              style={[
                styles.selectButton,
                display == "search" ? styles.selected : styles.unselected,
                { borderTopRightRadius: 10, borderBottomRightRadius: 10 },
              ]}
            >
              <Text
                style={[
                  {
                    color: "white",
                    fontSize: 20,
                    alignContent: "center",
                  },
                  display == "search"
                    ? { fontWeight: "bold" }
                    : { fontWeight: "normal" },
                ]}
              >
                Search
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        {display == "categories" && (
          <Categories
            url={props.url}
            user_id={props.user_id}
            group_id={props.group_id}
            token={props.token}
          ></Categories>
        )}
        {display == "search" && (
          <Search
            url={props.url}
            user_id={props.user_id}
            group_id={props.group_id}
            token={props.token}
          ></Search>
        )}
      </View>

      {/* Tabs */}
      <TabBar navigation={props.navigation} screen="search"></TabBar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btn: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 20,
  },
  selected: {
    backgroundColor: COLORS.secondary,
  },
  selectButton: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
  unselected: {
    backgroundColor: "lightgrey",
  },
});
export default SearchMoviesScreen;
