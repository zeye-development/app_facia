import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default class Formulario extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      

    }}
    componentDidMount=()=>{
      
      let pface=JSON.stringify(this.props.navigation.getParam( "face", "face"))
      let face = pface.replace(/['"]+/g, "");
      const url = 'http://189.213.227.211:8443/file=' + face
      console.log(face)
      let prface=JSON.stringify(this.props.navigation.getParam("rface", "rface"))
      let rface = prface.replace(/['"]+/g, "");
      const url2 = 'http://189.213.227.211:8443/file=' + rface
      console.log(rface)
      this.setState({url:url})
      this.setState({url2:url2})
      let wanted=JSON.stringify(this.props.navigation.getParam("wanted","wanted"))
    if (wanted=== 'false')
    this.setState({wanted:false})
    else {
      this.setState({wanted:true})
    }
      }
  render(){
    let {url,url2,wanted}=this.state

    
    
  return (
    <View style={styles.container}>
      <View style={styles.viewContainer1}>
        <Image
          source={{uri:url}}
          style={styles.imageBackground}
        />
      </View>
      <AntDesign name="arrowright" size={32} color="#00425A" />
      {wanted?
      <View style={[styles.viewContainer, styles.solicitado]}>
        <Image
          source={{uri:url2}}
          style={styles.imageBackground}
        />
      </View>: <View style={[styles.viewContainer, styles.noSolicitado]}>
        <Image
          source={{uri:url2}}
          style={styles.imageBackground}
        />
      </View>}
    </View>
  );
}}


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
    // alignItems: "stretch",
    maxWidth: 450,
    paddingHorizontal: 30,
    flexDirection: "row"
  },
  viewContainer: {
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 130,
    height: 130,
    borderRadius: 70
  },
  viewContainer1: {
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 120,
    borderRadius: 70
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius:100
  },
  usuario: {
    padding: 13,
    backgroundColor: "#00DFAA",
    // textAlign: "center",
    justifyContent: "center",
    color: "#fff",
    borderRadius: 15,
    marginTop: 5,
    fontFamily: "PoppinsRegular"
  },
  solicitado: {
    borderColor: "#FE6363",
    borderWidth: 8
  },

  noSolicitado: {
    borderColor: "#00DFAA",
    borderWidth: 8
  }
});
