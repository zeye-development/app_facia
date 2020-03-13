import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator,
  Picker
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import md5 from "md5";
import { LinearGradient } from "expo-linear-gradient";
import { validatorEmail } from "../../helpers/validatorEmail";

export default class Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: null,
      pass: null,
      pass_v: null,
      modalVisible: false,
      modalVisible2: false,
      mensajeAlert: "",
      modalLoading: false,
      error: false,
      msjError: "",
      type:'1'
    };
  }

  async login(email, pass, pass_v) {
    email = email.toLowerCase();
    console.log(email);

    if (!email) {
      // Alert.alert("Error", "El correo es Requerido para iniciar Sesion");
      this.setState({
        modalVisible: !this.state.modalVisible,
        mensajeAlert: "El Usuario es requerido para iniciar Sesion"
      });
      return;
    } else if (email) {
      if (!validatorEmail(email)) {
        this.setState({
          error: true,
          msjError: "Introduzca un email valido"
        });
        setTimeout(() => {
          this.setState({
            error: false,
            msjError: ""
          });
        }, 2000);
        return;
      }
    }
    if (!pass) {
      // Alert.alert("Error", "La contraseña es requerida para iniciar Sesion");
      this.setState({
        modalVisible: !this.state.modalVisible,
        mensajeAlert: "El Contraseña es requerido para iniciar Sesion"
      });
      return;
    } else if (pass) {
      if (pass.length < 6) {
        this.setState({
          error: true,
          msjError: "La Contraseña debe ser mayor a 6 caracteres"
        });
        setTimeout(() => {
          this.setState({
            error: false,
            msjError: ""
          });
        }, 2000);
        return;
      }
    }
    if (!pass_v) {
      // Alert.alert("Error", "La contraseña es requerida para iniciar Sesion");
      this.setState({
        modalVisible: !this.state.modalVisible,
        mensajeAlert: "El Contraseña es requerido para iniciar Sesion"
      });
      return;
    } else if (pass_v) {
      if (pass_v.length < 6) {
        this.setState({
          error: true,
          msjError: "La Contraseña debe ser mayor a 6 caracteres"
        });
        setTimeout(() => {
          this.setState({
            error: false,
            msjError: ""
          });
        }, 2000);
        return;
      }
    }
    if (pass_v != pass) {
      this.setState({
        error: true,
        msjError: "Las Contraseñas no coinciden"
      });
      setTimeout(() => {
        this.setState({
          error: false,
          msjError: ""
        });
      }, 2000);
      return;
    }

    const licence = Math.floor(
      Math.random() *
        1000 *
        Math.floor(
          Math.random() *
            100 *
            Math.floor(Math.random() * 10000000000 * 1458102)
        )
    );
    var licenceS = licence.toString();
    let lic = licenceS.replace(/['"]+/g, "");
    console.log(licenceS);
    console.log(this.state.type)

    try {
      this.setState({ modalLoading: true });
      let response = await fetch("http://189.213.227.211:8443/user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          mimeType: "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: md5(pass),
          password_validate: md5(pass_v),
          names: "Keyberth",
          surnames: "Pe",
          license_key: lic,
          type:parseInt(this.state.type)
        })
      });

      let responseJson = await response.json();
      console.log(responseJson);

      if (responseJson.status === 200) {
        this.setState({
          modalLoading: false,
          modalVisible2: !this.state.modalVisible2,
          mensajeAlert: "El Registro se Completo de Manera Exitosa!"
        });
      } else {
        // Alert.alert("Error", "El Correo o la contraseña no son correctos");

        this.setState({
          modalLoading: false,
          modalVisible: !this.state.modalVisible,
          mensajeAlert: "Este correo ya se encuentra registrado"
        });
      }
    } catch (error) {
      // Alert.alert("Error", "Usted no dispone de una conexion a internet");
      this.setState({
        modalLoading: false,
        modalVisible: !this.state.modalVisible,
        mensajeAlert: "Usted no dispone de una conexion a internet"
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              padding: 13,
              color: "#00425A"
            }}
          >
            Ingrese sus datos
          </Text>
        </View>
        <View style={styles.viewContainer}>
          <TextInput
            placeholder="Email"
            value={this.state.email}
            onChangeText={item => {
              const email = item.trim();
              this.setState({ email });
            }}
            style={styles.input}
          />
        </View>

        <View style={styles.viewContainer}>
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            value={this.state.pass}
            onChangeText={item => {
              const pass = item.trim();
              this.setState({ pass });
            }}
            style={styles.input}
          />
        </View>

        <View style={styles.viewContainer}>
          <TextInput
            placeholder="Repeat Password"
            secureTextEntry={true}
            value={this.state.pass_v}
            onChangeText={item => {
              const pass_v = item.trim();
              this.setState({ pass_v });
            }}
            style={styles.input}
          />
        </View>
        <View style={{alignItems:'center'}}>
          <Text style={{fontSize:18, marginTop:20}}>Tipo de cuenta</Text>
          </View>
          <Picker
            selectedValue={this.state.type}
            onValueChange={itemValue =>
              this.setState({ type: itemValue })
            }
          >
            <Picker.Item label="Usuario" value= '1' />
            <Picker.Item label="Administrador" value='2' />
            <Picker.Item label="Funcionario Policial" value='3' />
          </Picker>
        {this.state.error ? (
          <View style={styles.error}>
            <Text style={[styles.font, { color: "#fff" }]}>
              {this.state.msjError}
            </Text>
          </View>
        ) : null}

        <View style={styles.styleButtom}>
          <TouchableOpacity
            onPress={() => {
              this.login(this.state.email, this.state.pass, this.state.pass_v);
            }}
          >
            <Text style={styles.inputButtom}>
              Registrar{" "}
              <Ionicons name="md-arrow-forward" size={18} color="#fff" />
            </Text>
          </TouchableOpacity>
        </View>
        {/* ============================modalLoading======= */}

        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.modalLoading}
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
              position: "absolute",
              top: "45%",
              left: "45%"
            }}
          >
            {this.state.modalLoading ? (
              <ActivityIndicator size={30} color="#fff" />
            ) : null}
          </View>
        </Modal>
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
                {this.state.mensajeAlert}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalVisible: !this.state.modalVisible });
                }}
              >
                <Text
                  onPress={() => {
                    this.props.navigation.replace("InicioSesion");
                  }}
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
        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.modalVisible2}
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
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalVisible2: !this.state.modalVisible2 });
                  this.props.navigation.replace("InicioSesion");
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
                  Iniciar Sesion
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
    // alignItems: "center",
    marginBottom: 10,
    alignItems: "stretch",
    maxWidth: 450,
    marginTop: "18%",
    paddingHorizontal: 30
  },
  input: {
    fontSize: 16,
    paddingVertical: 13,
    paddingHorizontal: 33,
    borderWidth: 2,
    borderColor: "transparent",
    fontFamily: "PoppinsRegular"
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
    marginVertical: 5
  },
  styleButtom: {
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "stretch",
    backgroundColor: "#6777ef"
  },
  error: {
    borderRadius: 5,
    backgroundColor: "#7c0b2b",
    alignItems: "center",
    padding: 10,
    marginVertical: 5
  },
  usuario: {
    padding: 13,
    backgroundColor: "red",
    textAlign: "center",
    color: "#fff",
    borderRadius: 15,
    marginTop: 5
  },
  font: {
    fontFamily: "PoppinsRegular"
  }
});
