import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Inicio() {
  return (
    <View style={style.container}>
      <Text
        style={[
          style.text,
          {
            fontFamily: "PoppinsMedium"
          }
        ]}
      >
        Facial
      </Text>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 32,
    textAlign: "center",
    color: "#fff",
    padding: 5
  }
});
