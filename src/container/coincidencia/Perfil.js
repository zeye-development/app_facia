import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Perfil(props) {
  let { nombre, conectado, edad, solicitado } = props.usuario;
  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate("CoincidenciaUsuario")}
    >
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={styles.container}>
            <View style={styles.img}>
              <Image
                style={{ width: 45, height: 45 }}
                source={require("../../../assets/perfil.png")}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 5
              }}
            >
              <AntDesign name="arrowright" size={18} color="#000" />
            </View>
            {solicitado == "si" ? (
              <View style={[styles.img, styles.solicitado]}>
                <Image
                  style={{ width: 45, height: 45 }}
                  source={require("../../../assets/perfil.png")}
                />
              </View>
            ) : (
              <View style={[styles.img, styles.noSolicitado]}>
                <Image
                  style={{ width: 45, height: 45 }}
                  source={require("../../../assets/perfil.png")}
                />
              </View>
            )}
          </View>
          <View style={{ justifyContent: "center", paddingLeft: 10 }}>
            <Text style={[styles.textColor, { fontFamily: "PoppinsSemiBold" }]}>
              {nombre}{" "}
            </Text>
            <Text style={[styles.textColor, { fontFamily: "PoppinsRegular" }]}>
              {edad} - {conectado}
            </Text>
          </View>
        </View>
        {/* <View style={styles.styleButtom}>
          <Ionicons name="md-more" size={18} color="#00425A" />
        </View> */}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  img: {
    justifyContent: "center",
    borderRadius: 100
  },
  textColor: {
    color: "#000",
    fontSize: 14
  },
  styleButtom: {
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 10
  },
  solicitado: {
    borderColor: "#FE6363",
    borderWidth: 2
  },

  noSolicitado: {
    borderColor: "#00DFAA",
    borderWidth: 2
  }
});
