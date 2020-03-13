import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ImageBackground
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default function FotoPerfil(props) {
  return (
    <View style={styles.container}>
      <View style={styles.viewContainer}>
        <ImageBackground
          source={require("../../../assets/perfil.png")}
          style={styles.imageBackground}
        >
          {/* <AntDesign name="plus" size={50} color="#EBF0F2" /> */}
        </ImageBackground>
      </View>

      <View style={styles.styleButtom}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.replace("Captura", { mainFoto: true })
          }
        >
          <Text style={styles.inputButtom}>Capturar rostro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 10,
    // alignItems: 'stretch',
    maxWidth: 450,
    paddingHorizontal: 30
  },
  inputButtom: {
    fontSize: 16,
    padding: 13,
    color: "#fff",
    textAlign: "center",
    fontFamily: "PoppinsRegular"
  },
  styleButtom: {
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "stretch",
    backgroundColor: "#6777ef"
  },
  viewContainer: {
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    borderRadius: 100
  },

  imageBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});
