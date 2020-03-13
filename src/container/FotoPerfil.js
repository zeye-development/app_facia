import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FotoPerfil() {
  return (
    <View style={styles.container}>
      <View style={styles.viewContainer}>
        <Image
          style={{ width: 220, height: 220 }}
          source={require("../../../assets/captura.png")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    marginTop: 50,
    marginBottom: 5,
    // alignItems: 'stretch',
    maxWidth: 450,
    paddingHorizontal: 30
  },
  viewContainer: {
    marginTop: 10,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 225,
    height: 225,
    borderRadius: 25
  }
});
