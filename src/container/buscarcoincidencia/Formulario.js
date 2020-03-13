import * as React from "react";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Platform,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";

export default class Formulario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      base64: null,
      modalVisible: false,
      hasCameraPermission: false,
      modalVisibleAlert: false,
      mensajeAlert: "",
      type: Camera.Constants.Type.back,
      flashMode: Camera.Constants.FlashMode.off,
      autoFocus: Camera.Constants.AutoFocus.on,
      zoom: 0,
      whiteBalance: Camera.Constants.WhiteBalance.auto,
      focusDepth: 0,
      ratio: "4:3",
      estadocamara: true,
      modalLoading: false
    };
  }

  async componentDidMount() {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);

      this.setState({ hasCameraPermission: status === "granted" });

      if (status !== "granted") {
        this.setState({
          mensajeAlert: "Es posible que desee habilitar la cámara en la configuración de su teléfono",
          modalVisibleAlert: true
        })
      }
    } catch (err) {
      console.log("err", err);
    }

    if (Platform.OS === "android") {
      try {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        this.setState({ hasCameraPermission: status === "granted" });

        if (status !== "granted") {
          this.setState({
            mensajeAlert: "Es posible que desee habilitar la cámara en la configuración de su teléfono",
            modalVisibleAlert: true
          })
        }
      } catch (err) {
        console.log("err", err);
      }
    }
    let token= await AsyncStorage.getItem('token');
    console.log(token)
  
      let toke = token.replace(/['"]+/g, "");
      this.setState({token:toke})

  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        // alert("Sorry, we need camera roll permissions to make this work!");
        this.setState({
          modalVisibleAlert: !this.state.modalVisibleAlert,
          mensajeAlert: "Se necesitan los permisos de la cámara para que funcione"
        });
      }
    }
  };

  _pickImage = async () => {
    const options = { quality: 0.1, base64: true,allowsEditing:true };
    let result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.cancelled) {
      this.setState({ base64: result.base64 });
      this.setState({ image: result.uri });
    }
  };

  _takePictureButtonPressed = async () => {
    if (this._cameraInstance) {
      // console.log('')

      //const options = { quality: 0.5, base64: true };
      const options = { quality: 0.1, base64: true };

      let result = await this._cameraInstance.takePictureAsync(options);

      if (!result.cancelled) {
        this.setState({ base64: result.base64 });
        this.setState({ image: result.uri });
        this.setState({ modalVisible: !this.state.modalVisible });
      }
    }
  };
  handleUploadPhoto = () => {
    // this.guardar();
    let { image, base64 } = this.state;

    if (image === null || base64 === null) {
      // Alert.alert("ERROR", "EL CAMPO DE IMAGEN ESTA VACIO");
      this.setState({
        modalVisibleAlert: !this.state.modalVisibleAlert,
        mensajeAlert: "EL CAMPO DE IMAGEN ESTA VACIO"
      });
      return;
    }
    this.setState({modalLoading: true})
    fetch("http://189.213.227.211:8443/person-query", {
      method: "POST",
      body: JSON.stringify({
        picture: this.state.base64}),
      headers: {
        "Content-Type": "application/json",
         key:this.state.token
      }
    })
      .then(response => response.json())
      .then(response => {
        console.log("upload succes", response);
        console.log(response)
        
        this.setState({ uri: null });
            response.people.forEach(element =>this.setState({id:element._id}))
            response.people.forEach(element =>this.setState({face:element.current_face}))
            response.people.forEach(element =>this.setState({name:element.names}))
            response.people.forEach(element =>this.setState({surname:element.surnames}))
            response.people.forEach(element =>this.setState({rface:element.registered_face}))
            response.people.forEach(element =>this.setState({wanted:element.wanted}))
            response.people.forEach(element =>this.setState({nationality:element.nationality}))
            response.people.forEach(element =>this.setState({sex:element.sex}))
            response.people.forEach(element =>this.setState({birth:element.birth}))
            console.log(this.state.id)
            console.log(this.state.face)
            console.log(this.state.name)
            
        if (this.state.rface === null) {
          this.setState({
            modalLoading: false,
            modalVisibleAlert: !this.state.modalVisibleAlert,
            mensajeAlert: "No se encontraron coincidencias en la base de datos"
          });
        }
        else {
          this.setState({modalLoading:false})
            this.props.navigation.navigate('CoincidenciaUsuario',
            {id:this.state.id,name:this.state.name,face:this.state.face,
            surnames:this.state.surname,rface:this.state.rface,wanted:this.state.wanted,
            nationality:this.state.nationality,sex:this.state.sex,birth:this.state.birth })}
          
      })
      .catch(error => {
        console.log("upload error", error);

        // Alert.alert("ERROR","No se encontraron coincidencias");
        this.setState({
          modalLoading: false,
          modalVisibleAlert: !this.state.modalVisibleAlert,
          mensajeAlert: "No se encontraron coincidencias en la base de datos"
        });
        
      });
  };
  render() {
    let { image } = this.state;

    const {
      type,

      zoom,
      whiteBalance,
      focusDepth,
      photo
    } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.viewContainer}>
          <Image
            style={{
              width: '100%',
              height: '100%',
              resizeMode:"stretch",
              marginRight:'-10%',
              
              
              position: "absolute"
            }}
            source={{ uri: image }}
          />
          <View style={{flexDirection:'row',alignItems:'center', justifyContent:'center'}}> 
          <View style={{height:'85%',width:'50%',justifyContent:'center'}}>
          
          <View style={styles.cuadro}></View>
          <View style={styles.cuadro}></View>
          <View style={styles.cuadro}></View>
        </View>
        <View style={{height:'85%',width:'50%',justifyContent:'center',marginLeft:'15%'}}>
          
          <View style={{width: "35%",height: "35%",borderColor: "white",borderTopWidth:10, borderLeftWidth:10}}></View>
          <View style={{width: "35%",height: "30%"}}></View>
          <View style={{width: "35%",height: "35%",borderColor: "white",borderBottomWidth:10, borderLeftWidth:10}}></View>
        </View>
        <View style={{height:'85%',width:'50%',justifyContent:'center'}}>
          
          <View style={{width: "35%",height: "35%",borderColor: "white",borderTopWidth:10, borderRightWidth:10}}></View>
          <View style={{width: "30%",height: "30%"}}></View>
          <View style={{width: "35%",height: "35%",borderColor: "white",borderBottomWidth:10, borderRightWidth:10}}></View>
        </View>
        </View>
        </View>
        
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
          <View
            style={styles.styleButtom2}
          >
            <TouchableOpacity
              onPress={() => {
                this.setState({ modalVisible: !this.state.modalVisible });
              }}
            >
              <Text style={styles.inputButtom}>
                Capturar
                 {/* <Ionicons name="ios-camera" size={18} color="#fff" /> */}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.styleButtom1}>
            <TouchableOpacity onPress={this._pickImage}>
              <Text style={styles.inputButtom1}>
                Cargar{" "}
                {/* <Ionicons name="md-cloud-upload" size={18} color="#150578" /> */}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View
          style={styles.styleButtom}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={this.handleUploadPhoto}
          >
            <Ionicons name="md-search" size={18} color="white" />
            <Text style={styles.inputButtom}>Buscar</Text>
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

        {/* modal camera ================= */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View style={styles.containermodal}>
            <TouchableOpacity onPress={() => this.setState({ modalVisible: !this.state.modalVisible })}>
              <Text style={[styles.icon, { padding: 6, marginLeft: 30, marginTop: 20 }]}>
                {" "}
                <Ionicons name="md-arrow-back" size={35} color="#fff" />{" "}
              </Text>
            </TouchableOpacity>
            <Camera
              style={styles.camera}
              ref={ref => (this._cameraInstance = ref)}
              type={type}
              zoom={zoom}
              whiteBalance={whiteBalance}
              focusDepth={focusDepth}
            />

        <View style={styles.cuadro2}>
        
          <View style={{flexDirection:'row',alignItems:'center', justifyContent:'center'}}> 
          
        <View style={{height:'85%',width:'50%',justifyContent:'center',marginLeft:'80%',marginTop:'15%'}}>
          
          <View style={{width: "35%",height: "45%",borderColor: "white",borderTopWidth:10, borderLeftWidth:10}}></View>
          <View style={{width: "35%",height: "30%"}}></View>
          <View style={{width: "35%",height: "45%",borderColor: "white",borderBottomWidth:10, borderLeftWidth:10}}></View>
        </View>
        <View style={{height:'85%',width:'50%',justifyContent:'center',marginLeft:'20%',marginTop:'15%'}}>
          
          <View style={{width: "35%",height: "45%",borderColor: "white",borderTopWidth:10, borderRightWidth:10}}></View>
          <View style={{width: "30%",height: "30%"}}></View>
          <View style={{width: "35%",height: "45%",borderColor: "white",borderBottomWidth:10, borderRightWidth:10}}></View>
        </View>
        </View>
        </View>
            <View style={styles.controls}>
              <View style={styles.controls}>
                {!photo && (
                  <TouchableOpacity style={{ height: 35, width: 35 }}
                    onPress={() => {

                      this.state.flashMode ?
                        this.setState({ flashMode: Camera.Constants.FlashMode.off })
                        :
                        this.setState({ flashMode: Camera.Constants.FlashMode.on })
                        ;

                    }}>

                    {
                      // this.setState({ modalVisible: !this.state.modalVisible });
                      this.state.flashMode ?
                        <Text style={styles.icon}>
                          {" "}
                          <MaterialIcons name="flash-auto" size={35} color="#fff" />{" "}
                        </Text>
                        :
                        <Text style={styles.icon}>
                          {" "}
                          <MaterialIcons name="flash-off" size={35} color="#fff" />{" "}
                        </Text>


                    }

                  </TouchableOpacity>
                )}
           
              
              {!photo && (
                <TouchableOpacity style={{
                height:40,width:'30%',backgroundColor:"#fff",alignItems:'center'
                ,borderRadius:10,justifyContent:'center',marginLeft:'15%' }}
                onPress={this._takePictureButtonPressed}>
                <Text style={styles.icon}>
                  {"TAKE PICTURE "}
                </Text>
              </TouchableOpacity>
              )}
              {!photo && (  
                <TouchableOpacity style={{height:35,width:35,marginLeft:'15%'}}
                onPress={() => this.state.estadocamara?
                
                this.setState({type: Camera.Constants.Type.front,estadocamara:false}):
                this.setState({type: Camera.Constants.Type.back,estadocamara:true})}>
                <Text style={styles.icon}>
                  {" "}
                  <Ionicons name="md-reverse-camera" size={35} color="#fff" />{" "}
                </Text>
              </TouchableOpacity>
              )}
              
              
              
            </View>
              
              
              
            </View>
          </View>
        </Modal>
        {/* modal Alert ================= */}
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
                  this.setState({ modalVisibleAlert: !this.state.modalVisibleAlert });
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
    // marginBottom: 20,
    alignItems: "stretch",
    maxWidth: 450,
    paddingHorizontal: 30,
    alignItems: "center"
  },
  containermodal: {
    flex: 1,
    backgroundColor: "black",
    position: "relative"
  },

  viewContainer: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 280,
    height: 280,
    borderRadius: 25,
    backgroundColor: "#CCE3EB"
  },
  
  cuadro: {
    width: "35%",
    height: "30%",
    borderColor: "white",
    borderWidth: 7,

    
  },
  cuadro2: {
    marginLeft: "10%",
    marginTop: "30%",
    width: "80%",
    height: "60%",
    
    alignItems:'center',

    position: "absolute"
  },
  inputButtom: {
    fontFamily: "PoppinsRegular",
    fontSize: 16,
    padding: 13,
    color: "#fff",
    paddingLeft: 10
  },
  styleButtom: {
    borderRadius: 5,
    // marginTop: 30,
    marginVertical: 5,
    // width: 'center',//
    alignItems: "center",
    backgroundColor: "#6777ef",
    paddingHorizontal: 90
  },
  styleButtom2: {
    borderRadius: 5,
    // marginTop: 30,
    marginVertical: 5,
    alignItems: "center",
    backgroundColor: "#6777ef",
    paddingHorizontal: 20,
    marginHorizontal: 10
  },
  inputButtom1: {
    fontSize: 16,
    fontFamily: "PoppinsRegular",
    padding: 13,
    color: "#6777ef"
  },
  styleButtom1: {
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "center",
    backgroundColor: "#CCE3EB",
    // marginBottom: 45,
    paddingHorizontal: 20,
    marginHorizontal: 10
  },
  camera: {
    height: "100%",
    width: "100%"
  },

  controls: {
    position: "absolute",
    flexDirection:'row',
    zIndex: 10,
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    
  },

  photo: {
    width: 100,
    height: 100,
    
    right: 0,
    bottom: 0,
    top: 0
  },
  icon:{
    fontSize:15,
    color:'black',
    fontWeight:'bold',
    fontFamily:"PoppinsSemiBold"
  }
});
