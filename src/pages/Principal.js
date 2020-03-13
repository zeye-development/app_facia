import React from "react";
import { StyleSheet, SectionList, ScrollView, View, Text } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";

import Inicio from "../container/principal/Inicio";
import Login from "../container/principal/Login";
export default function Principal(props) {
  return (
    <View
      style={styles.container}
      // colors={["#0097CD", "#01B8E2"]}
      // start={[0, 0.8]}
      // end={[0.8, 0.5]}
    >
      <Inicio />
      <Login navigation={props.navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6777ef",
    padding: 30
  }
});
