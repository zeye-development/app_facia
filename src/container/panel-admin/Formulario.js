import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function Formulario(props) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.tituloInput}>Change User</Text>
        <View
          style={[
            styles.viewContainer,
            styles.containerInput,
            { justifyContent: "space-between" }
          ]}
        >
          <View style={styles.containerInput}>
            <FontAwesome name="user" size={18} color="#00425A" />
            <TextInput style={styles.input} placeholder="User" />
          </View>
          <TouchableOpacity>
            <View style={styles.buttomInputRight}>
              <Ionicons name="md-save" size={26} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* email========================== */}
      <View>
        <Text style={styles.tituloInput}>Change Email</Text>
        <View
          style={[
            styles.viewContainer,
            styles.containerInput,
            { justifyContent: "space-between" }
          ]}
        >
          <View style={styles.containerInput}>
            <MaterialIcons name="email" size={18} color="#00425A" />
            <TextInput placeholder="Email" style={styles.input} />
          </View>
          <TouchableOpacity>
            <View style={styles.buttomInputRight}>
              <Ionicons name="md-save" size={26} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* ==============================Password=========================== */}
      <View>
        <Text style={styles.tituloInput}>Change Password</Text>
        <View style={[styles.viewContainer, styles.containerInput]}>
          <Ionicons name="md-key" size={18} color="#00425A" />
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            style={styles.input}
          />
        </View>
      </View>
      <View>
        <View style={[styles.viewContainer, styles.containerInput]}>
          <Ionicons name="md-key" size={18} color="#00425A" />
          <TextInput
            placeholder="Re-Password"
            secureTextEntry={true}
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.styleButtom}>
        <TouchableOpacity>
          <Text style={styles.inputButtom}>
            <Ionicons name="md-save" size={22} color="#fff" /> Password
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    alignItems: "stretch",
    maxWidth: 450,
    paddingHorizontal: 30,
    paddingBottom: 20
  },
  input: {
    fontSize: 16,
    fontFamily: "PoppinsRegular",
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 200
  },
  inputButtom: {
    fontSize: 16,
    fontFamily: "PoppinsRegular",
    padding: 13,
    color: "#fff",
    textAlign: "center"
  },
  viewContainer: {
    borderRadius: 5,
    backgroundColor: "#EBF2F4",
    marginVertical: 5,
    paddingLeft: 15
  },
  styleButtom: {
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "stretch",
    backgroundColor: "#6777ef"
  },
  tituloInput: {
    color: "#00425A",
    marginVertical: 5,
    fontSize: 14,
    fontFamily: "PoppinsSemiBold"
  },
  containerInput: {
    flexDirection: "row",
    alignItems: "center"
  },
  buttomInputRight: {
    backgroundColor: "#6777ef",
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 50,
    borderRadius: 15
  }
});
