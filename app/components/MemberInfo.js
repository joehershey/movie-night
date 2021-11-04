import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { Card } from "react-native-elements";

import { COLORS, STYLES } from "../assets/saved";
import { FontAwesome5 } from "@expo/vector-icons";

/* This component returns one Card representing a member in a group */
function MemberInfo(props) {
  const [editAlias, setEditAlias] = useState(false); //if alias editing is on
  const [alias, setAlias] = useState(""); //used when editing alias
  const [expanded, setExpanded] = useState(false); //used when editing alias
  return (
    <View>
      {props.isUser ? (
        <Card containerStyle={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            {/* hidden buttons to preserve centering */}
            {!editAlias ? (
              <View style={{ margin: 10 }}>
                <FontAwesome5 name="pencil-alt" color="white" size={20} />
              </View>
            ) : (
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    margin: 10,
                    padding: 5,
                    borderRadius: 5,
                  }}
                >
                  <FontAwesome5 name="check" color="white" size={25} />
                </View>

                <View
                  style={{
                    margin: 10,
                    padding: 5,
                    borderRadius: 5,
                  }}
                >
                  <FontAwesome5 name="times-circle" color="white" size={25} />
                </View>
              </View>
            )}
            <View>
              {!editAlias ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>
                    {props.member.display_name}
                  </Text>
                  <Text style={{ fontWeight: "bold", fontStyle: "italic" }}>
                    {" "}
                    (You)
                  </Text>
                </View>
              ) : (
                <View>
                  <TextInput
                    style={[
                      STYLES.input,
                      STYLES.settingsInput,
                      {
                        height: 40,
                        width: 120,
                        textAlign: "center",
                        borderColor: alias.length < 1 ? COLORS.danger : "green",
                      },
                    ]}
                    onChangeText={setAlias}
                    maxLength={20}
                    value={alias}
                    placeholder="New alias"
                  />
                </View>
              )}
            </View>

            {!editAlias ? (
              <View style={{ margin: 10 }}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    setEditAlias(true);
                  }}
                >
                  <FontAwesome5 name="pencil-alt" color="grey" size={20} />
                </TouchableWithoutFeedback>
              </View>
            ) : (
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    margin: 10,
                    marginLeft: 20,
                    backgroundColor: alias.length < 1 ? "lightgrey" : "green",
                    padding: 5,
                    borderRadius: 5,
                  }}
                >
                  <TouchableWithoutFeedback
                    onPress={() => {
                      if (alias.length > 0) {
                        props.setAliasAPI(alias);
                        setEditAlias(false);
                      }
                    }}
                  >
                    <FontAwesome5 name="check" color="white" size={25} />
                  </TouchableWithoutFeedback>
                </View>

                <View
                  style={{
                    margin: 10,
                    backgroundColor: COLORS.danger,
                    padding: 5,
                    borderRadius: 5,
                  }}
                >
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setEditAlias(false);
                    }}
                  >
                    <FontAwesome5 name="times-circle" color="white" size={25} />
                  </TouchableWithoutFeedback>
                </View>
              </View>
            )}
          </View>

          <Card.Divider />
          <Text style={{ alignSelf: "center" }}>
            Group Role: {props.member.is_admin ? "Admin" : "Member"}
          </Text>
          <TouchableWithoutFeedback
            onPress={() => {
              props.leaveGroup();
            }}
          >
            <View
              style={{
                margin: 10,
                padding: 5,
                borderRadius: 10,
                backgroundColor: COLORS.danger,
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
                Leave Group
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </Card>
      ) : (
        <Card containerStyle={{ padding: 0 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "white",
                margin: 10,
                alignItems: "center",
              }}
            ></View>

            <View
              style={{
                flex: 10,
                padding: 15,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>{props.member.display_name}</Text>
              <Text style={{ fontStyle: "italic" }}>
                {props.member.is_admin ? " (Admin)" : ""}
                {!props.member.is_admin ? " (Member)" : ""}
              </Text>
            </View>
            <TouchableWithoutFeedback
              onPress={() => {
                if (props.isAdmin) {
                  setExpanded(!expanded);
                }
              }}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  margin: 10,
                  alignItems: "center",
                }}
              >
                <FontAwesome5
                  name={expanded ? "compress" : "edit"}
                  color={props.isAdmin ? "grey" : "white"}
                  size={20}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
          {expanded && <Card.Divider />}

          {props.isAdmin && expanded && (
            <View style={{ flexDirection: "row", margin: 0 }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  props.setAdminStatusAPI(
                    props.member.user_id,
                    !props.member.is_admin
                  );
                }}
              >
                <View
                  style={{
                    margin: 10,
                    marginTop: 0,
                    height: 50,
                    borderRadius: 5,
                    flex: 1,
                    padding: 5,
                    backgroundColor: COLORS.secondary,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 14,
                      alignContent: "center",
                    }}
                  >
                    {props.member.is_admin
                      ? "Demote to member"
                      : "Promote to admin"}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  props.removeFromGroupAPI(props.member.user_id);
                }}
              >
                <View
                  style={{
                    margin: 10,
                    marginTop: 0,
                    borderRadius: 5,
                    padding: 5,
                    flex: 1,
                    backgroundColor: COLORS.danger,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 14,
                      alignContent: "center",
                    }}
                  >
                    Kick From Group
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          )}
        </Card>
      )}
    </View>
  );
}

export default MemberInfo;
