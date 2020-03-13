import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import Header from "../container/buscarcoincidencia/Header";

import Formulario from "../container/buscarcoincidencia/Formulario";

export default function buscarcoincidencia(props) {
  return (
    <View style={style.container}>
      <ScrollView>
        <Header navigation={props.navigation} />
        
        <Formulario navigation={props.navigation} />
      </ScrollView>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 6,
    backgroundColor: "#fff"
    // paddingVertical: 30,
    // paddingLeft: 5
  }
});
