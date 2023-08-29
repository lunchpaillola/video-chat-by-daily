import React from "react";
import { Image, Text, View, StyleSheet, Alert } from "react-native";
import videoImage from "./editor-image.png";
import { WebView } from "react-native-webview";

const DailyVideoChat = (props) => {
  const { editor, token, url } = props;

  const imageStyle = {
    width: "100%",
    height: 500,
    resizeMode: "contain",
    display: "flex",
  };

  //url for the video call
  const videoCallURL = token ? url + "?t=" + token : url;

  //error handling
  const errorHandling = getError();

  function getError(e) {
    if (!url) return 'Room url is not set in the "Video chat" component';
    if (e) return e;
  }

  if (errorHandling && !editor) {
    return (
      <View style={componentStyles.statusWrapper}>
        <Text style={componentStyles.statusText}>{errorHandling}</Text>
      </View>
    );
  }

  if (editor) {
    return (
      <View style={componentStyles.wrapper}>
        <Image style={imageStyle} source={videoImage} />
      </View>
    );
  }
  if (!editor && url) {
    return (
      <View style={componentStyles.wrapper}>
        <View style={{ width: "100%", height: "100%" }}>
          <WebView
            source={{ uri: videoCallURL }}
            domStorageEnabled={true}
            allowFileAccess={true}
            originWhitelist={["*"]}
            javaScriptEnabled={true}
            useWebKit={true}
            allowsInlineMediaPlayback={true}
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </View>
      </View>
    );
  }
};

const componentStyles = StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  statusWrapper: {
    backgroundColor: "#d30",
    padding: 16,
    borderRadius: 5,
    marginBottom: 16,
  },
  statusText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default DailyVideoChat;