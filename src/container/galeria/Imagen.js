import React from "react";
import styled from "styled-components/native";

export default function Imagen(props) {
  let { url } = props;

  return (
    <ContainerImagen>
      <Img source={{ uri: `http://189.213.227.211:8443/file=${url}` }}></Img>
    </ContainerImagen>
  );
}

const ContainerImagen = styled.View`
  margin: 3px;
  border-radius: 15px;
`;
const Img = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 10px;
`;
