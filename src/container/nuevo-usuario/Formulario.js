import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Picker,
  Modal,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import DatePicker from "react-native-datepicker";

export default class Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foto: null,
      base64: null,
      estado: true,
      modalVisibleAlert: false,
      mensajeAlert: "",
      isDateTimePickerVisible: false,
      sex: "Male",
      nationality: "VE",
      mainFoto: null,
      birth: "",
      name: "",
      surname: "",
      imagenes: [],
      id: "",
      modalLoading:false
    };
  }
  async componentDidMount() {
    // console.log(this.props.navigation.getParam("mainFoto"));
    let token = await AsyncStorage.getItem("token");
    console.log(token);

    let toke = token.replace(/['"]+/g, "");
    this.setState({ token: toke });
    let perfil = JSON.stringify(
      this.props.navigation.getParam("item", "image")
    );
    console.log(perfil);
    let pfoto = perfil.replace(/['"]+/g, "");
    console.log("fotot", pfoto);

    this.setState({ foto: pfoto });
    let parabase64 = JSON.stringify(
      this.props.navigation.getParam("base", "base64")
    );
    let base64 = parabase64.replace(/['"]+/g, "");
    this.setState({ base64: base64 });
  }

  handleUploadPhoto = () => {
    // let { foto, base64 } = this.state;
    console.log(this.state.estado);
    console.log(this.state.foto);
    if (this.state.foto === "image") {
      this.setState({
        modalVisibleAlert: !this.state.modalVisibleAlert,
        mensajeAlert: "EL CAMPO DE IMAGEN ESTA VACIO"
      });
      return;
    }
    if (this.state.name === "") {
      this.setState({
        modalVisibleAlert: !this.state.modalVisibleAlert,
        mensajeAlert: "El campo Nombre no puede estar vacio"
      });
      return;
    }
    if (this.state.surname === "") {
      this.setState({
        modalVisibleAlert: !this.state.modalVisibleAlert,
        mensajeAlert: "El campo Apellido no puede estar vacio"
      });
      return;
    }
    if (this.state.birth === "") {
      this.setState({
        modalVisibleAlert: !this.state.modalVisibleAlert,
        mensajeAlert: "Por favor ingrese una fecha"
      });
      return;
    }
    // let parabase64 = JSON.stringify(
    //   this.props.navigation.getParam("base", "base64")
    // );
    // let base64 = parabase64.replace(/['"]+/g, "");

    // if (this.state.foto != null) {
    this.setState({modalLoading:true})
    fetch("http://189.213.227.211:8443/register-face", {
      method: "POST",
      body: JSON.stringify({
        names: this.state.name,
        surnames: this.state.surname,
        nationality: this.state.nationality,
        dni: this.state.id,
        sex: this.state.sex,
        picture: this.state.base64,
        wanted: this.state.estado,
        birth: this.state.birth
      }),
      headers: {
        "Content-Type": "application/json",
        key: this.state.token
      }
    })
      .then(response => response.json())
      .then(response => {
        console.log(this.state.sex);
        console.log(this.state.sex);
        console.log("upload succes", response);
        this.setState({
          modalLoading:false,
          modalVisibleAlert: true,
          mensajeAlert: "Usuario Registrado Exitosamente"
        });
        setTimeout(() => {
          this.setState({ uri: null });
          this.props.navigation.replace("Loading");
        }, 1000);
      })
      .catch(error => {
        console.log("upload error", error);
        this.setState({modalLoading:false})
        console.log(this.state.estado);

        alert("Upload failed!");
      });
    // }
  };
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.hideDateTimePicker();
  };
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            height: 100,
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20,
            marginBottom: 20
          }}
        >
          <View
            style={{
              width: 90,
              height: 90,
              backgroundColor: "#EBF2F4",
              borderRadius: 100
            }}
          >
            <Image
              source={{ uri: this.state.foto }}
              style={{ width: 120, height: 120, borderRadius: 100 }}
            />
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

        {/* ==================subida muntiples de imagenes ============== */}

        {/* ========================================================== */}
        <View style={styles.viewContainer}>
          <TextInput
            style={styles.input1}
            placeholder="Nombres"
            value={this.name}
            onChangeText={name => this.setState({ name })}
          />
        </View>
        <View style={styles.viewContainer}>
          <TextInput
            placeholder="Apellidos"
            value={this.surname}
            onChangeText={surname => this.setState({ surname })}
            style={styles.input1}
          />
        </View>
        <View style={styles.viewContainer}>
          <TextInput
            placeholder="Identidad"
            value={this.id}
            onChangeText={id => this.setState({ id })}
            style={styles.input1}
          />
        </View>
        <Text
          style={{
            fontSize: 15,
            color: "black",
            textAlign: "center",
            fontFamily: "PoppinsRegular",
            margin: 5
          }}
        >
          {" "}
          Seleccionar Pais
        </Text>
        <View style={styles.containerpicker}>
          <Picker
            selectedValue={this.state.nationality}
            onValueChange={itemValue =>
              this.setState({ nationality: itemValue })
            }
            style={[styles.picker]}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Venezuela" value="VE" />
            <Picker.Item label="Bolivia" value="BO" />
          </Picker>
        </View>

        <Text
          style={{
            fontSize: 15,
            color: "black",
            textAlign: "center",
            fontFamily: "PoppinsRegular",
            margin: 5
          }}
        >
          {" "}
          Seleccionar Sexo
        </Text>
        <View style={styles.containerpicker}>
          <Picker
            selectedValue={this.state.sex}
            onValueChange={Value => this.setState({ sex: Value })}
            style={[styles.picker]}
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Masculino" value="Male" />
            <Picker.Item label="Femenino" value="Female" />
          </Picker>
        </View>
        <Text
          style={{
            fontSize: 15,
            color: "black",
            textAlign: "center",
            fontFamily: "PoppinsRegular",
            margin: 5
          }}
        >
          {" "}
          Fecha de Nacimiento
        </Text>
        <DatePicker
          style={{ width: "100%", height: 40, marginTop: 6 }}
          // style={styles.input1}
          date={this.state.birth}
          mode="date"
          placeholder="Fecha de Nacimiento"
          format="DD-MM-YYYY"
          minDate="01-05-1920"
          maxDate="01-10-2025"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={date => {
            this.setState({ birth: date });
          }}
        />
        <View style={styles.viewContainerCheck}>
          <TouchableOpacity
            style={{ width: 45, height: 45, marginTop: 15, marginRight: -10 }}
            onPress={() => {
              this.setState({ estado: !this.state.estado });
            }}
          >
            {this.state.estado ? (
              <Ionicons name="md-checkbox-outline" size={25} color="#00425A" />
            ) : (
              <Ionicons name="md-square-outline" size={25} color="#00425A" />
            )}
          </TouchableOpacity>
          <Text
            style={{
              color: "#00425A",
              fontSize: 14,
              marginLeft: -10,
              fontFamily: "PoppinsSemiBold"
            }}
          >
            Añadir a solicitados
          </Text>
        </View>

        <View style={styles.styleButtom}>
          <TouchableOpacity onPress={this.handleUploadPhoto}>
            <Text style={styles.inputButtom}>Guardar Usuario</Text>
          </TouchableOpacity>
        </View>
        {/* modal aLert ================ */}
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
            <View>
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
      </View>
    );
  }
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
  input: {
    fontSize: 16,
    paddingVertical: 13,
    paddingHorizontal: 33,
    fontFamily: "PoppinsRegular"
  },
  input1: {
    fontSize: 16,
    paddingVertical: 13,
    paddingHorizontal: 20,
    marginRight: 13,
    fontFamily: "PoppinsRegular"
  },
  inputButtom: {
    fontSize: 16,
    padding: 13,
    color: "#fff",
    textAlign: "center",
    fontFamily: "PoppinsRegular"
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
    borderRadius: 5
  },
  viewContainerInput: {
    borderRadius: 5,
    backgroundColor: "#EBF2F4",
    width: 140
  },
  styleButtom: {
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "stretch",
    backgroundColor: "#6777ef"
  },
  viewContainerCheck: {
    flexDirection: "row",
    padding: 13,
    color: "#EBF2F4",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 7,
    marginBottom: 15
  },
  containerpicker: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#EBF2F4",
    marginBottom: 5
  },

  picker: {
    width: "100%",
    height: 50,
    marginLeft: "2%",
    color: "black",

    alignItems: "center"
  },
  imagenesSubir: {
    width: 50,
    marginHorizontal: 3,
    height: 50,
    backgroundColor: "#EBF2F4",
    // borderRadius: 25,
    alignItems: "center",
    justifyContent: "center"
  }
});
