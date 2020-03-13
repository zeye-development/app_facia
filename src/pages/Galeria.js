import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import Header from "../container/galeria/Header";
import Camera from "../container/galeria/Camera";
import Imagenes from "../container/galeria/Imagenes";

export default function Galeria(props) {
  let { id, images } = props.navigation.state.params;

  return (
    <View style={style.container}>
      <ScrollView>
        <Header navigation={props.navigation} />
        <Camera navigation={props.navigation} id={id} />
        <Imagenes navigation={props.navigation} images={images} />
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
