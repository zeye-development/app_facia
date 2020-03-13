import React from "react";
import { View, StyleSheet, FlatList, Text, Image } from "react-native";

import Perfil from "./Perfil";
export default function Perfiles(props) {
  const usuarios = [
    {
      nombre: "Jhon Doe",
      edad: "28 Years",
      img: "../../../assets/perfil.png",
      conectado: "15889623",
      key: "0",
      solicitado: "si"
    },
    {
      nombre: "Jhon Doe",
      edad: "28 Years",
      img: "../../../assets/perfil.png",
      conectado: "15889623",
      key: "1",
      solicitado: "si"
    },
    {
      nombre: "Jhon Doe",
      edad: "28 Years",
      img: "../../../assets/perfil.png",
      conectado: "15889623",
      key: "2",
      solicitado: "no"
    },
    {
      nombre: "Jhon Doe",
      edad: "28 Years",
      img: "../../../assets/perfil.png",
      conectado: "15889623",
      key: "3",
      solicitado: "no"
    },
    {
      nombre: "Jhon Doe",
      edad: "28 Years",
      img: "../../../assets/perfil.png",
      conectado: "15889623",
      key: "4",
      solicitado: "no"
    },
    {
      nombre: "Jhon Doe",
      edad: "28 Years",
      img: "../../../assets/perfil.png",
      conectado: "15889623",
      key: "6",
      solicitado: "no"
    },
    {
      nombre: "Jhon Doe",
      edad: "28 Years",
      img: "../../../assets/perfil.png",
      conectado: "15889623",
      key: "7",
      solicitado: "no"
    },
    {
      nombre: "Jhon Doe",
      edad: "28 Years",
      img: "../../../assets/perfil.png",
      conectado: "15889623",
      key: "8",
      solicitado: "si"
    }
  ];

  separador = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#f2f2f2",
          marginVertical: 10
        }}
      ></View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={usuarios}
        renderItem={({ item }) => (
          <Perfil navigation={props.navigation} usuario={item} />
        )}
        keyExtractor={item => item.key}
        horizontal={false}
        ItemSeparatorComponent={separador}
        ListEmptyComponent={
          <Text
            style={{ marginVertical: 20, fontSize: 20, textAlign: "center" }}
          >
            No se encontraron coincidencias
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingRight: 25,
    paddingTop: 10
  },
  containerPerfil: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  img: {
    justifyContent: "center",
    borderRadius: 100
  },
  textColor: {
    color: "#00425A"
  }
});
