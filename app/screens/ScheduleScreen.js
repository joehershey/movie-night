import React from "react";
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
import { FontAwesome5 } from "@expo/vector-icons";

import TabBar from "../components/TabBar";
import TopBar from "../components/TopBar";
import { useLinkProps } from "@react-navigation/native";
import { TEST_DATA } from "../assets/testData";

function ScheduleScreen(props) {
  const [eventsToRender, setEvents] = React.useState(TEST_DATA.events);

  const eventsToRenderHTML = [];
  for (const [i, event] of eventsToRender.entries()) {
    //only non applied to properties

    eventsToRenderHTML.push(
      <Card key={i}>
        <Card.Title>{"Movie Night " + event.date}</Card.Title>
        <Card.Divider />
        <Text>{"Start Time: " + event.start_time}</Text>
        <Text>{"Location: " + event.location}</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.navigate("Event");
          }}
        >
          <View
            style={{
              margin: 10,
              padding: 5,
              backgroundColor: COLORS.primary,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                alignContent: "center",
              }}
            >
              View Event
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </Card>
    );
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
          style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <View style={{ width: "90%" }}>{eventsToRenderHTML}</View>

          <View>
            <View
              style={{
                backgroundColor: "lightgrey",
                padding: 5,
                alignItems: "stretch",
                marginTop: 20,
                width: 300,
              }}
            >
              <Text style={{ fontSize: 30 }}>New Movie Night</Text>

              {/* Current address */}
              <TextInput style={STYLES.formInput} placeholder="Date" />
              <TextInput style={STYLES.formInput} placeholder="Time" />
              {/* Phone number */}
              <TextInput style={STYLES.formInput} placeholder="Genre" />

              {/* Monthly income */}
              <TextInput style={STYLES.formInput} placeholder="Location" />
              {/* Comments */}
              <TextInput style={STYLES.formInput} placeholder="Theme" />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableWithoutFeedback>
                <View
                  style={{
                    borderRadius: 5,
                    margin: 10,
                    padding: 5,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: COLORS.secondary,
                  }}
                >
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

              <TouchableWithoutFeedback>
                <View
                  style={{
                    borderRadius: 5,
                    margin: 10,
                    padding: 5,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: COLORS.primary,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      alignContent: "center",
                    }}
                  >
                    Clear Form
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </ScrollView>
      </View>
      {/* Tabs */}
      <TabBar navigation={props.navigation} screen="schedule"></TabBar>
    </SafeAreaView>
  );
}

export default ScheduleScreen;
