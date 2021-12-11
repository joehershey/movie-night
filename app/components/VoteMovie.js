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

import fetch from "cross-fetch";

function VoteMovie(props) {
  return (
    <View style={{ flex: 1 }}>
      <Text>{props.txt}</Text>
    </View>
  );
}

export default VoteMovie;
