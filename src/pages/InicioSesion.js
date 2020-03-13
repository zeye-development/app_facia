import React, {useEffect} from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Dimensions
} from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

import Header from "../container/inicioSesion/Header";
// import LoginRedes from "../container/inicioSesion/LoginRedes";
import Formulario from "../container/inicioSesion/Formulario";
import Preguntas from "../container/inicioSesion/Preguntas";
const { height } = Dimensions.get("window");
export default function InicioSesion(props) {

  useEffect(()=>{
   
  })
  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="height" enabled>
        <ScrollView>
          <View style={style.container}>
            <Header navigation={props.navigation} />
            <Formulario navigation={props.navigation} />
            <Preguntas navigation={props.navigation} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 6,
    backgroundColor: "#fff",
    paddingVertical: 30,
    height: height,
    marginLeft: 5
  }
});
