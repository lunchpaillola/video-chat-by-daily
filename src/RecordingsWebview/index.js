import React, { Component } from "react";
import PropTypes from 'prop-types';
import { View, Image} from "react-native";
import videoImage from "./editor-image.png";
import { WebView } from "react-native-webview";

class DailyRecordingWebview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recordingLink: null,
    };
  }

  componentDidMount() {
    this.getRecordingId();
  }

  getRecordingId() {
    const { editor, room_name, apikey } = this.props;
    const endpointurl = "https://api.daily.co/v1/";

    if (!editor) {
      const urlWithQuery = `${endpointurl}recordings/?room_name=${room_name}`;
      console.log('urlWithQuery', urlWithQuery);
      fetch(urlWithQuery, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + apikey,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          console.log('recordID', result, result.data[0].id);
          const recordingId = result.data[0].id;
          this.getRecordingAccessLink(recordingId);
        })
        .catch((error) => {
          console.error("Error:", error);
          this.getError(error);
        });
    }
  }

  getRecordingAccessLink(recordingId) {
    const { editor, apikey } = this.props;
    const endpointurl = "https://api.daily.co/v1/";

    if (!editor) {
      const urlWithQuery = `${endpointurl}recordings/${recordingId}/access-link`;
      console.log('urlWithQuery', urlWithQuery);
      fetch(urlWithQuery, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + apikey,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          const accessLink = result;
          console.log('accessLink', accessLink);
          const link = result.download_link;
          console.log('recordingLink', link);
          this.setState({ recordingLink: link });
        })
        .catch((error) => {
          console.error("Error:", error);
          this.getError(error);
        });
    }
  }

  getError() {
    const { room_name } = this.props;
    if (!room_name) return 'Room name is not set in the "recording" component';
  }

  render() {
    const { editor } = this.props;
    const { recordingLink } = this.state;

    /*if (errorHandling && editor) {
      return (
        <View style={componentStyles.statusWrapper}>
          <Text style={componentStyles.statusText}> {errorHandling}</Text>
        </View>
      ); 
    }*/

    if (editor) {
      return (
        <View style={{ width: "100%", height: "100%" }}>
          <Image
            source={videoImage}
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              resizeMode: "cover",
            }}
          />
        </View>
      );
    }

    if (!editor) {
      return (
        <View style={{ width: "100%", height: "100%" }}>
          {recordingLink ? (
            <WebView
              source={{ uri: recordingLink }}
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
          ) : (
            null
          )}
        </View>
      );
    }
  }
}

DailyRecordingWebview.propTypes = {
  editor: PropTypes.bool.isRequired,
  room_name: PropTypes.string.isRequired,
  apikey: PropTypes.string.isRequired,
};

export default DailyRecordingWebview;
