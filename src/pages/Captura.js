import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import Header from "../container/captura/Header";

import Formulario from "../container/captura/Formulario";

export default function Captura(props) {
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
  }
});
