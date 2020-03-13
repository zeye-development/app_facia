import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Dimensions, AsyncStorage } from "react-native";

import Header from "../container/dashboard/Header";
import ProgreseBar from "../container/dashboard/ProgreseBar";
import ButtonFloat from "../container/dashboard/ButtonFloat";
import Perfiles from "../container/dashboard/Perfiles";
import Mapas from "../../src/pages/Mapas"

const { height } = Dimensions.get("window");
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount (){
     let type = await AsyncStorage.getItem('type')
     this.setState({type:type })

  }

  render() {
    if (this.state.type == 1){

    // console.log(this.props)
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.containerSuperior}>
            <Header navigation={this.props.navigation} />
            <ProgreseBar navigation={this.props.navigation} />
            {/* <Opciones
              navigation={this.props.navigation}
              CambiarEstado={estado => {
                this.setState({ estado: estado });
              }}
            /> */}
          </View>

          <View>
            <Perfiles
              navigation={this.props.navigation}
              estado={this.state.estado}
            />
          </View>
        </ScrollView>
        <ButtonFloat />
      </View>
    );}
    else if(this.state.type == 3){
      return (
      <View style={styles.container}>
       
          <View style={styles.containerSuperior}>
            <Header navigation={this.props.navigation} />
            <Mapas />
            {/* <Opciones
              navigation={this.props.navigation}
              CambiarEstado={estado => {
                this.setState({ estado: estado });
              }}
            /> */}
          </View>
        
      </View>
      )
    }
    else{
      return (
      null
      )
    }
    
  }
}

const styles = StyleSheet.create({
  container: {
    height: height
  },
  containerSuperior: {
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    backgroundColor: "#6777ef"
  }
});
