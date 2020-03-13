import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Header(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Text style={styles.icon}>
          {" "}
          <Ionicons name="md-arrow-back" size={18} color="#00425A" />{" "}
        </Text>
      </TouchableOpacity>

      <Text style={styles.headerText}>Coincidencia</Text>
      <Text style={styles.icon}> </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    maxWidth: 450,
    flexDirection: "row",
    // alignItems: 'flex-start',
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 30
  },
  headerText: {
    color: "#00425A",
    fontSize: 14,
    fontFamily: "PoppinsSemiBold"
  },
  icon: {
    padding: 6
  }
});
