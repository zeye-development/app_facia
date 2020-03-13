import React, { useState } from "react";
import { StyleSheet, AsyncStorage, Text, View, Platform, Modal, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class ButtonFloat extends React.Component {
    state = {
      location: null,
      errorMessage: null,
      modalVisible: false
    }
    componentDidMount(){
      
    }
    async show(){
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied',
        });
      }
  
      let location = await Location.getCurrentPositionAsync({});
      this.setState({ location });
      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds(); //Current Seconds
      this.setState({
        //Setting the value of the date time
        date:
          date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
      });
      console.log('holiss')
      console.log(this.state.location)
      // , this.state.date
      let id = "id" + Math.random().toString(16).slice(2)
      location =  this.state.location;
      date = this.state.date    
      let send = {
        id,
        date,
        location
      }
      
      this.setState({ modalVisible: true });
      // http://189.213.227.211:8443
      let token = await AsyncStorage.getItem("token");
      let toke = token.replace(/['"]+/g, "");
      console.log(toke)
      token = toke;      
      fetch("http://189.213.227.211:8443/panic-button", {
        method: "POST",
        body: JSON.stringify(send),
        headers:{
          'Content-Type': 'application/json'
        },        
        headers: {
          "Content-Type": "application/json",
          key: token,
        }
      })
        .then(response => response.json())
        .then(response => {
          console.log("upload succes", response);
        })
        .catch(error => {
          console.log("upload error", error);
        });      
    }
    componentWillMount() {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        this.setState({
          errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
        });
      } else {
        this._getLocationAsync();
      }
    }
  
    _getLocationAsync = async () => {
      
    };
  
  render() {
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }
   

    return (
      <View>
      <TouchableOpacity
        style={styles.button} 
      >
        <Text onPress ={()=>this.show()}>
          <MaterialCommunityIcons name="alert-octagon" size={35} color="#fff" />
        </Text>
      </TouchableOpacity>        
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
                El boton de panico ha sido presionado
              </Text>
            </View>
            <View style={{ marginHorizontal: 20, marginTop: 33 }}>
              <Text
                style={{
                  fontSize: 14,
                  color: "#00425A",
                  textAlign: "center",
                  textShadowRadius: 2,
                }}
              >
                El incidente ha sido registrado correctamente.
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
  button: {
    borderRadius: 40,
    width: 60,
    height: 60,
    alignItems: "center",
    backgroundColor: "#7c0b2b",
    justifyContent: "center",
    position: "absolute",
    bottom: 15,
    right: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24
  }
});