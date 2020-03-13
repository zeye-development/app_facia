import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Header from "../container/panel-admin/Header";
import PerfilUsuario from "../container/panel-admin/PerfilUsuario";
import ButtomPanel from "../container/panel-admin/ButtomPanel";
import Formulario from "../container/panel-admin/Formulario";

export default function PanelAdmin(props) {
  return (
    <View>
      <ScrollView>
        <View
          // colors={["#0097CD", "#01B8E2"]}
          // start={[0, 0.8]}
          // end={[0.8, 0.5]}
          style={styles.containerSuperior}
        >
          <Header navigation={props.navigation} />
          <PerfilUsuario navigation={props.navigation} />
        </View>
        <View>
          <ButtomPanel navigation={props.navigation} />
          <Formulario />
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
