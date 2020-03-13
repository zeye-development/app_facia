import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function Formulario(props) {
  return (
    <View style={styles.container}>
      <View style={styles.viewContainerGrup}>
        <View style={styles.viewContainerInput}>
          <TextInput style={styles.input1} value="Jhon" />
        </View>
        <View style={styles.viewContainerInput}>
          <TextInput value="Doe" style={styles.input1} />
        </View>
      </View>
      <View style={styles.viewContainer}>
        <TextInput value="venezuela" style={styles.input} />
      </View>

      <View style={styles.viewContainer}>
        <TextInput value="15238529" style={styles.input} />
      </View>

      <View style={styles.viewContainer}>
        <TextInput value="masculino" style={styles.input} />
      </View>

      <View style={styles.viewContainerButtom}>
        {/* <View style={styles.viewContainerButtom1}> */}
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Dashboard")}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "PoppinsRegular",
              padding: 13,
              color: "#fff",
              textAlign: "center"
            }}
          >
            Guardar Cambios
          </Text>
        </TouchableOpacity>
        {/* </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    marginBottom: 10,
    alignItems: "stretch",
    maxWidth: 450,
    paddingHorizontal: 30
  },
  input: {
    fontSize: 16,
    fontFamily: "PoppinsRegular",
    paddingVertical: 13,
    paddingHorizontal: 33
  },
  input1: {
    fontSize: 16,
    fontFamily: "PoppinsRegular",
    paddingVertical: 13,
    paddingHorizontal: 33,
    marginRight: 13
  },
  viewContainer: {
    borderRadius: 5,
    backgroundColor: "#EBF2F4",
    marginVertical: 5
  },
  viewContainerGrup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 15
  },
  viewContainerInput: {
    borderRadius: 5,
    backgroundColor: "#EBF2F4",
    width: 140
  },

  viewContainerButtom: {
    borderRadius: 5,
    backgroundColor: "#6777ef",
    // padding: 6,
    // alignItems: "stretch"
    marginTop: 15
  }
});
