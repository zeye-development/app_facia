import React from "react";
import { StyleSheet, Text, View, Platform, Button, Image } from "react-native";
// import { Camera, Permissions } from 'expo'
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";

export default class App extends React.Component {
  state = {
    hasCameraPermission: false,
    // type: Camera.Constants.Type.front,
    type: Camera.Constants.Type.back,
    flashMode: Camera.Constants.FlashMode.on,
    autoFocus: Camera.Constants.AutoFocus.on,
    zoom: 0,
    whiteBalance: Camera.Constants.WhiteBalance.auto,
    focusDepth: 0,
    ratio: "4:3"
  };

  render() {
    const {
      hasCameraPermission,
      type,
      flashMode,
      zoom,
      whiteBalance,
      focusDepth,
      photo
    } = this.state;

    if (!hasCameraPermission) {
      return <View style={styles.container} />;
    }

    return (
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          ref={ref => (this._cameraInstance = ref)}
          type={type}
          flashMode={flashMode}
          zoom={zoom}
          whiteBalance={whiteBalance}
          focusDepth={focusDepth}
        />

        <View style={styles.controls}>
          {photo && (
            <Button
              title="Uplod photo"
              color="#010101"
              onPress={this._uploadPhoto}
            />
          )}
        </View>
        <View style={styles.controls}>
          {!photo && (
            <Button
              title="Take photo"
              color="#010101"
              onPress={this._takePictureButtonPressed}
            />
          )}
          {/* //previo */}
          {photo && <Image style={styles.photo} source={photo} />}
        </View>
      </View>
    );
  }

  async componentDidMount() {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);

      this.setState({ hasCameraPermission: status === "granted" });

      if (status !== "granted") {
        alert("Hey! You might want to enable Camera in your phone settings.");
      }
    } catch (err) {
      console.log("err", err);
    }

    if (Platform.OS === "android") {
      try {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        this.setState({ hasCameraPermission: status === "granted" });

        if (status !== "granted") {
          alert("Hey! You might want to enable Camera in your phone settings.");
        }
      } catch (err) {
        console.log("err", err);
      }
    }
  }

  _takePictureButtonPressed = async () => {
    if (this._cameraInstance) {
      // console.log('')

      //const options = { quality: 0.5, base64: true };
      const options = { quality: 0.1, base64: true };
      console.log("succes hh");
      console.log(photo);
      const photo = await this._cameraInstance.takePictureAsync(options);
      console.log(photo.uri);

      this.setState({ photo });

      this.handleUploadPhoto();
    }
  };

  _uploadPhoto = () => {
    console.log("upload");
  };

  //uploadPhoto
  createFormData = (photo, body) => {
    const data = new FormData();
    console.log(photo);
    data.append("photo", {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    console.log(data);
    return data;
  };

  //uploadPhoto
  createFormData2 = photo => {
    const data = new FormData();
    // console.log(photo);
    data.append("photo", {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });

    console.log("data");
    // console.log(data);
    let newPhoto = {
      image: photo
    };
    console.log(newPhoto);
    return newPhoto;
  };

  handleUploadPhoto = () => {
    fetch("http://189.213.227.211:8080/send_image", {
      method: "POST",
      body: JSON.stringify(this.createFormData2(this.state.photo)),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        console.log("upload succes", response);
        alert("Upload success!");
        this.setState({ photo: null });
      })
      .catch(error => {
        console.log("upload error", error);
        alert("Upload failed!");
      });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    position: "relative"
  },

  camera: {
    flex: 1
  },

  controls: {
    position: "absolute",
    zIndex: 10,
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    justifyContent: "center",
    alignItems: "center"
  },

  photo: {
    width: 100,
    height: 100,
    position: "absolute",
    right: 0,
    bottom: 0,
    top: 0
  }
});
