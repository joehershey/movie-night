import React from "react";
import { StyleSheet } from "react-native";

export const COLORS = {
  primary: "#1d1f1e",
  secondary: "#166fdb",
};
export const STYLES = StyleSheet.create({
  fontPrimary: {
    fontFamily: "Didot",
    letterSpacing: 1.2,
    fontWeight: "bold",
  },
  returnBtn: {
    backgroundColor: "white",
    position: "absolute",
    left: 20,
    top: 50,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 20,
  },
  lgButton: {
    top: 30,
    width: "50%",
    height: 70,
    backgroundColor: COLORS.secondary,
  },
  input: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: 50,
    width: "60%",
    margin: 4,
    borderWidth: 0,
    borderRadius: 10,
    padding: 10,
  },
  settingsInput: {
    borderColor: "grey",
    borderWidth: 1,
    width: "100%",
  },
  topBar: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    flexDirection: "row",
  },
  tabBar: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 10,
  },
  content: {
    flex: 11,
    backgroundColor: "white",
  },
  container: {
    backgroundColor: COLORS.primary,
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
  },
});
