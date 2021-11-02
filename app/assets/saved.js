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
  lgButton: {
    top: 30,
    width: "50%",
    height: 70,
    backgroundColor: COLORS.secondary,
  },
});
