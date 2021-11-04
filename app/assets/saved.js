import React from "react";
import { StyleSheet } from "react-native";

export const COLORS = {
  primary: "#1d1f1e",
  secondary: "#166fdb",
  danger: "#b81f00",
  happy: "green",
  neutral: "#d5db0f",
  lg: "#f0f0f0",
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
  createGroupButton: {
    top: 10,
    width: "40%",
    height: 70,
    backgroundColor: COLORS.secondary,
  },
  joinGroupButton: {
    top: 10,
    width: "40%",
    height: 70,
    backgroundColor: "white",
  },
  settingsButtons: {
    top: 10,
    width: "60%",
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

  centeredModalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  mobileModalView: {
    margin: 20,
    height: "50%",
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "flex-start",
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  webModalView: {
    margin: 20,
    height: "50%",
    width: "30%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "flex-start",
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textInput: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: "auto",
    width: "auto",
    margin: 4,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  submitButton: {
    top: 10,
    width: "40%",
    height: 60,
    backgroundColor: COLORS.secondary,
  },
  closeButton: {
    top: 10,
    width: "40%",
    height: 60,
    backgroundColor: COLORS.primary,
  },
});
