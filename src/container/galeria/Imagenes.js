import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions } from "react-native";
import Imagen from "./Imagen";
import styled from 'styled-components/native';

export default class Imagenes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisibleAlert: false,
      mensajeAlert: "",
      images: []
    };
  }

  componentDidMount(){
    let { images } = this.props.navigation.state.params;
    this.setState({ images });
  }

  render() {
    console.log(this.props.navigation.state.params)
    if(!this.state.images) return false;

    return (
      <Container style={styles.container}>
        {this.state.images.map((url, key) => (
          <Imagen
            navigation={this.props.navigation}
            key={key}
            url={url}
            style={styles.imagen}
          />
        ))}
        {/* modal alert============= */}
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
                {this.state.mensajeAlert} - holis
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
      </Container>
    );
  }
}

const Container = styled.View`
`;

let { width } = Dimensions.get('window');
width -= 30;
let widthImagen = width / 3;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    maxWidth: 450,
    display: "flex",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  imagen: {
    width: widthImagen,
    borderWidth: 2,
    borderColor: "peru",
    flex: 1,
  }
});
