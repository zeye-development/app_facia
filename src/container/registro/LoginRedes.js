import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default class LoginRedes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.setState({ modalVisible: !this.state.modalVisible });
          }}
        >
          <View style={styles.viewContainer}>
            <Text style={styles.google}>
              <Image
                source={require("../../../assets/google.png")}
                style={{ width: 18, height: 18 }}
              />{" "}
              Iniciar con Google
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.viewContainerF}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ modalVisible: !this.state.modalVisible });
            }}
          >
            <Text style={styles.facebook}>
              <FontAwesome name="facebook" size={20} color="#fff" /> Iniciar con
              Facebook
            </Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.modalVisible}
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
                Lo sentimos, esta funcion no se encuentra disponible.
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalVisible: !this.state.modalVisible });
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    // padding: 13,
                    color: "#01B8E2",
                    textAlign: "right",
                    fontFamily: "PoppinsRegular",
                    marginTop: 40,
                    marginHorizontal: 20,
                    marginBottom: 20
                  }}
                >
                  {" "}
                  Entendido
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
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10,
    alignItems: "stretch",
    maxWidth: 450,
    paddingHorizontal: 30
  },
  google: {
    color: "#150578",
    fontSize: 16,
    paddingVertical: 13,
    fontFamily: "PoppinsRegular"
  },
  viewContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#150578",
    marginVertical: 5,
    alignItems: "center"
  },
  viewContainerF: {
    borderRadius: 5,
    backgroundColor: "#3b5998",
    marginVertical: 5,
    alignItems: "stretch"
  },
  facebook: {
    color: "#fff",
    fontSize: 16,
    paddingVertical: 13,
    textAlign: "center",
    fontFamily: "PoppinsRegular"
  }
});
