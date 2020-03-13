import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";

import Header from "../container/coincidenciaUsuario/Header";
import FotoPerfil from "../container/coincidenciaUsuario/FotoPerfil";
import Formulario from "../container/coincidenciaUsuario/Formulario";

export default function CoincidenciaUsuario(props) {
  return (
    <View style={style.container}>
      <ScrollView>
        <Header navigation={props.navigation} />
        <FotoPerfil navigation={props.navigation} />
        <Formulario navigation={props.navigation} />
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
