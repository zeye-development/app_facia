import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import Header from "../container/coincidencia/Header";
import Perfiles from "../container/coincidencia/Perfiles";

export default function Coincidencia(props) {
  return (
    <View>
      <ScrollView>
        <View style={styles.containerSuperior}>
          <Header navigation={props.navigation} />
        </View>
        <View>
          <Perfiles navigation={props.navigation} />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  containerSuperior: {
    backgroundColor: "#6777ef"
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10
    // paddingLeft: 5
  }
});
