import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class App extends Component {
  state = {
    location: null,
    errorMessage: null,
    
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.090,
      longitudeDelta: 0.040
  
  };
  async componentDidMount(){
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
    try {
      let token=await AsyncStorage.getItem("token");
       

      let toke = token.replace(/['"]+/g, "");
      console.log(toke)
      token = toke;
      fetch("http://189.213.227.211:8443/panic-button?all=1", {
        method: "GET",
        headers: {
          key: token,

        }
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log('aqui')
         const data =JSON.stringify(responseJson)
         console.log(data)

         
        })
        .catch(error => {
          console.error(error);
        });
    } catch (error) {}
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
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    console.log(this.state.location.coords.latitude)
    this.setState({latitude: this.state.location.coords.latitude });
    this.setState({longitude: this.state.location.coords.longitude });


    
  };
 

  render() {
   
  let { latitude, 
    longitude, 
    latitudeDelta,
    longitudeDelta} = this.state
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }
    console.log(this.state.location)

    return (
      <View style={styles.container}>
        <MapView style={{width:'100%', height: 800}}
          region={{ latitude,
            longitude,
            latitudeDelta,
            longitudeDelta}}
          //provider={MapView.PROVIDER_GOOGLE}
        >
         <Marker
          coordinate={{
            latitude,
            longitude
          }}
          />
          </MapView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});