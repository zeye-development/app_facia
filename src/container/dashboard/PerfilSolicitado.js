import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity} from "react-native";
import { Ionicons, Foundation } from "@expo/vector-icons";


export default class Perfil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      click:false
    }}
  componentDidMount=()=>{
    let rface=JSON.stringify(this.props.navigation.getParam( "item", "url"))
      let oface = rface.replace(/['"]+/g, "");
      this.setState({url2:oface})
      console.log(oface)
    
    }
  OnClickTrue = () => {
  if (this.state.click) {
   
     this.setState({click:false})
    };
   if(!this.state.click) {
    this.setState({click:true})
    };
}
render(){
  let {_id, names, surnames, images, birth_date } = this.props.usuario;

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={styles.img}>
            <Image
              style={{ width: 50, height: 50, borderRadius:100 }}
              source={{uri:`http://189.213.227.211:8443/file=${images[0]}`}}
            />
          </View>
          <View style={{ justifyContent: "center", paddingLeft: 10 }}>
            <Text
              style={[
                styles.textColor,
                {
                  color:'#E1868F',
                  fontFamily: "PoppinsSemiBold"
                }
              ]}
            >
              {names[0]}{" "} {surnames[0]}
              <Foundation name="prohibited" size={16} color="#E1868F" />
            </Text>
            <Text
              style={[
                styles.textColor2,
                {
                  fontFamily: "PoppinsRegular"
                }
              ]}
            >
            {" "}{_id} {birth_date}
  
            </Text>
          </View>
        </View>

        {!this.state.click ? (
          <TouchableOpacity onPress={this.OnClickTrue}>
            <View style={styles.styleButtom}>
              <Ionicons name="md-more" size={18} color="#00425A" />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={this.OnClickTrue}>
            <View style={styles.styleButtom}>
              <Ionicons name="md-close" size={18} color="#00425A" />
            </View>
          </TouchableOpacity>
        )}
      </View>
      {this.state.click ? (
        <View style={styles.containerOptionButtom}>
          <View style={styles.containerButtom}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("UsuarioRequerido", {user: this.props.usuario})}
            >
              <Text style={styles.optionButtom}>Perfil</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity>
              <Text style={styles.optionButtom}>Eliminar</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      ) : null}
    </View>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  img: {
    justifyContent: "center",
    borderRadius: 100
  },
  textColor: {
    color: "#00425A",
    fontSize: 14
  },
  textColor2: {
    color: "#00425A",
    fontSize: 15
  },
  styleButtom: {
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 10
  },
  optionButtom: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontFamily: "PoppinsRegular",
    fontSize: 14
    // borderBottomWidth: 1,
    // borderColor: "#f2f2f2"
  },
  containerOptionButtom: {
    position: "absolute",
    right: 25,
    top: 0
  },
  containerButtom: {
    width: 180,
    backgroundColor: "#fff",
    borderRadius: 2,
    // borderWidth: 1,
    // borderColor: "#000",
    // shadowOpacity: 2
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
});
