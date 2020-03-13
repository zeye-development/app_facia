import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import {
  Feather,
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons
} from "@expo/vector-icons";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: null
    };
  }

  async logOut() {
    try {
      await AsyncStorage.clear();
      this.props.navigation.replace("Principal");
    } catch (error) {}
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => this.logOut()}
          >
            <Text style={styles.icon}>
              {" "}
              <FontAwesome name="sign-in" size={22} color="#fff" />{" "}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerText}>Dashboard</Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={styles.back}>
            <Text style={styles.icon}>
              <Ionicons name="md-notifications" size={20} color="#fff" />{" "}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.back}
            onPress={() => {
              this.props.navigation.navigate("BuscarCoincidencia");
            }}
          >
            <Text style={styles.icon}>
              <MaterialCommunityIcons
                name="image-search-outline"
                size={22}
                color="#fff"
              />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 450,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10
  },
  back: {},
  headerText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "PoppinsSemiBold"
  },
  icon: {
    padding: 6
  },
  container1: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",

    padding: 8
  },

  text: {
    alignSelf: "center",
    fontSize: 22,
    paddingTop: 20
  }
});
