import React, { Component } from "react";
import PropTypes from 'prop-types';
import { View} from "react-native";
import { WebView } from "react-native-webview";

class DailyRecordingWebview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recordingLink: null,
      room_name: props.room_name, 
      apikey: props.apikey
    };
  }

  componentDidMount() {
    this.getRecordingId();
  }

  componentDidUpdate(prevProps) {
    if (this.props.room_name !== prevProps.room_name) {
      this.getRecordingId();
    }
  }
  
  


  getRecordingId() {
    const {room_name, apikey } = this.props;
    const endpointurl = "https://api.daily.co/v1/";

    if (room_name) {
      const urlWithQuery = `${endpointurl}recordings/?room_name=${room_name}`;
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
    const {room_name, apikey } = this.props;
    const endpointurl = "https://api.daily.co/v1/";

    if (room_name) {
      const urlWithQuery = `${endpointurl}recordings/${recordingId}/access-link`;
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
          const link = result.download_link;
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
    const {room_name } = this.props;
    const { recordingLink } = this.state;

      return (
        <View style={{ width: "100%", height: "100%" }}>
          {recordingLink && room_name ? (
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

DailyRecordingWebview.propTypes = {
  room_name: PropTypes.string.isRequired,
  apikey: PropTypes.string.isRequired,
};

export default DailyRecordingWebview;
