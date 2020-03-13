import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import Header from "../container/recuperarPaso2/Header";
import BodyMensaje from "../container/recuperarPaso2/BodyMensaje";
import Formulario from "../container/recuperarPaso2/Formulario";

export default function RecuperarPaso2(props) {
  return (
    <View style={style.container}>
      <ScrollView>
        <Header navigation={props.navigation} />
        <BodyMensaje />
        <Formulario />
      </ScrollView>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 6,
    backgroundColor: "#fff",
    paddingVertical: 30,
    marginLeft: 5
  }
});
