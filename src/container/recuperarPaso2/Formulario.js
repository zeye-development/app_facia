import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Formulario() {
  return (
    <View style={styles.container}>
      <View style={styles.styleButtom}>
        <TouchableOpacity>
          <Text style={styles.inputButtom}>
            Enviado{" "}
            <Ionicons
              name="md-checkmark-circle-outline"
              size={18}
              color="#fff"
            />
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <View style={styles.viewContainerCheck}>
          <Text
            style={{
              color: "#000",
              fontSize: 16,
              fontFamily: "PoppinsRegular"
            }}
          >
            Volver a enviar{" "}
            <Ionicons name="md-arrow-forward" size={18} color="#000" />{" "}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    marginBottom: 10,
    alignItems: "stretch",
    maxWidth: 450,
    paddingHorizontal: 30
  },
  inputButtom: {
    fontSize: 16,
    fontFamily: "PoppinsRegular",
    padding: 13,
    color: "#fff",
    textAlign: "center"
  },
  styleButtom: {
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "stretch",
    backgroundColor: "#00DFAA"
  },
  viewContainerCheck: {
    padding: 13,
    color: "#EBF2F4",
    alignItems: "center",
    marginTop: 7,
    marginBottom: 15
  }
});
