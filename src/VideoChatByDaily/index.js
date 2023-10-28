import React from "react";
import { Image, View} from "react-native";
import videoImage from "./editor-image.png";
import { WebView } from "react-native-webview";
import PropTypes from "prop-types";

const DailyVideoChat = (props) => {
  const { editor, token, url, _height } = props;
  const imageStyle = {
    width: "100%",
    height: 500,
    resizeMode: "contain",
    display: "flex",
  };

  //url for the video call
  const videoCallURL = token ? url + "?t=" + token : url;

  if (editor) {
    return (
      <View style={{ height: _height, width: "100%"}}>
        <Image style={imageStyle} source={videoImage} />
      </View>
    );
  }  

  if (url) {
    return (
      <View style={{ height: _height, width: "100%"}}>
      <WebView
        source={{ uri: videoCallURL }}
        domStorageEnabled={true}
        allowFileAccess={true}
        originWhitelist={["*"]}
        javaScriptEnabled={true}
        useWebKit={true}
        allowsInlineMediaPlayback={true}
      />
      </View>
    );
  }
  return null;
};

DailyVideoChat.propTypes = {
  editor: PropTypes.bool,
  token: PropTypes.string,
  url: PropTypes.string.isRequired,
  _height: PropTypes.number.isRequired,
};

export default DailyVideoChat;