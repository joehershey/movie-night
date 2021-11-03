import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

import { COLORS, STYLES } from "../assets/saved";
import { FontAwesome5 } from "@expo/vector-icons";

function ButtonPanel(props) {
  const showCreateGroup = props.showCreateGroup;
  const showJoinGroup = props.showJoinGroup;
  const toggleShowCreateGroup = props.toggleShowCreateGroup;
  const toggleShowJoinGroup = props.toggleShowJoinGroup;
  return (
    <View style={{ flexDirection: "row", marginBottom: 30 }}>
      <TouchableWithoutFeedback
        onPress={() => toggleShowCreateGroup(!showCreateGroup)}
      >
        <View style={[STYLES.createGroupButton, STYLES.btn]}>
          <Text style={[{ color: "white", fontSize: 20 }]}>Create Group</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => toggleShowJoinGroup(!showJoinGroup)}
      >
        <View style={[STYLES.joinGroupButton, STYLES.btn]}>
          <Text style={[{ color: COLORS.primary, fontSize: 20 }]}>
            Join Group
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

export default ButtonPanel;
