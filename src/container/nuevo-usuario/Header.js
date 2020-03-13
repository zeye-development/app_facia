import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foto: false,
      base64: null,
      estado: true,
      modalVisibleAlert: false,
      mensajeAlert: ""
    };
  }
  Retroceder() {
    let parabase64 = JSON.stringify(
      this.props.navigation.getParam("base", "base64")
    );
    this.setState({ foto: true, base64: parabase64 });
    // if (this.state.base64 != null) {
    this.setState({
      modalVisibleAlert: true,
      mensajeAlert: "Se perderan los datos una vez salga de la vista"
    });
    // console.log(this.state.base64);
    // }
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            // props.navigation.goBack()
            this.Retroceder();
          }}
        >
          <Text style={styles.icon}>
            {" "}
            <Ionicons name="md-arrow-back" size={20} color="#000" />
          </Text>
        </TouchableOpacity>

        <Text style={styles.headerText}>Nuevo Usuario</Text>
        <TouchableOpacity>
          <Text style={styles.icon}>
            <MaterialIcons name="delete-forever" size={20} color="#000" />
          </Text>
        </TouchableOpacity>
        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.modalVisibleAlert}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 66, 90, 0.5)"
              // opacity: 0.9
            }}
          ></View>

          <View
            style={{
              width: 290,
              backgroundColor: "#fff",
              borderRadius: 15,
              position: "absolute",
              marginTop: "45%",
              marginHorizontal: "10%"
            }}
          >
            <View style={{ marginHorizontal: 20, marginTop: 33 }}>
              <Text
                style={{
                  fontSize: 18,
                  color: "#00425A",
                  textAlign: "center",
                  textShadowRadius: 2,
                  fontFamily: "PoppinsBold"
                }}
              >
                {this.state.mensajeAlert}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 20,
                justifyContent: "flex-end",
                marginBottom: 10
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    modalVisibleAlert: !this.state.modalVisibleAlert
                  });
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    // padding: 13,
                    color: "#00425A",
                    // textAlign: "right",
                    fontFamily: "PoppinsRegular",
                    marginTop: 40,
                    padding: 10
                    // marginHorizontal: 20,
                    // marginBottom: 20
                  }}
                >
                  {" "}
                  CANCELAR
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    modalVisibleAlert: !this.state.modalVisibleAlert
                  });

                  this.props.navigation.goBack();
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    // padding: 13,
                    color: "#01B8E2",
                    // textAlign: "right",
                    fontFamily: "PoppinsRegular",
                    marginTop: 40,
                    backgroundColor: "#EBF0F2",
                    padding: 10,
                    borderRadius: 15
                    // marginHorizontal: 20,
                    // marginBottom: 20
                  }}
                >
                  {" "}
                  SI, REALIZAR
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    maxWidth: 450,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 30
  },
  headerText: {
    color: "#000",
    fontSize: 14,
    fontFamily: "PoppinsSemiBold"
  },
  icon: {
    padding: 6
  }
});
