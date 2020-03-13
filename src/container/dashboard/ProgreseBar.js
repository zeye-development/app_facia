import React from "react";
import {
  StyleSheet,
  View,
  ProgressBarAndroid,
  Text,
  TouchableOpacity
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";

export default class ProgreseBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cant: 0
    };
  }
  componentDidMount = () => {
    let cant = JSON.stringify(
      this.props.navigation.getParam("cantidad", "cantidad")
    );
    cant = cant.replace(/['"]+/g, "");
    if (cant != "cantidad") this.setState({ cant: cant });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.styleButtom}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("NuevoUsuario")}
          >
            <Text style={styles.inputButtom}>
              <Ionicons name="md-person-add" size={18} color="#150578" /> Añadir
              Usuario{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    marginTop: 18,
    paddingLeft: 35,
    paddingRight: 35,
    marginBottom: 10,
    alignItems: "stretch",
    maxWidth: 450
  },
  viewContainer: {
    paddingBottom: 20
  },
  inputButtom: {
    fontSize: 16,
    padding: 13,
    color: "#150578",
    textAlign: "center",
    fontFamily: "PoppinsRegular"
  },
  styleButtom: {
    borderRadius: 5,
    marginVertical: 15,
    alignItems: "stretch",
    backgroundColor: "#fff"
  }
});
