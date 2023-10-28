import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import videoImage from "./editor-image.png";
import PropTypes from 'prop-types';

const DailyRecordingWebview = (props) => {
  //props
  const { editor, room_name, apikey, _height } = props;

  const endpointurl = "https://api.daily.co/v1/";

  let recordingId; // Declare a variable to store the recording ID
  const [recordingLink, setRecordingLink] = useState(null); // Declare recordingLink state

  // Conditionally fetch the recording ID and access link only if room_name is not null
  useEffect(() => {
    if (!editor && room_name) {
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
          recordingId = result.data[0].id;
          getRecordingAccessLink();
        })
        .catch((error) => {
          console.error("Error:", error);
          getError(error);
        });
    }
  }, [room_name, editor, apikey]);

  // Action for getting recording access link
  const getRecordingAccessLink = () => {
    if (!editor && recordingId) {
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
          setRecordingLink(link);
        })
        .catch((error) => {
          console.error("Error:", error);
          getError(error);
        });
    }
  };

  // Error handling
  const errorHandling = getError();

  function getError() {
    if (!room_name) return 'Room name is not set in the "recording" component';
    return null;
  }

  if (errorHandling && editor) {
    return (
      <View style={componentStyles.statusWrapper}>
        <Text style={componentStyles.statusText}>{errorHandling}</Text>
      </View>
    );
  }

  // Styles and rendering
  if (editor) {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <img
          src={videoImage}
          style={{
            display: "block",
            objectFit: "fill",
            width: "100%",
            height: _height,
            padding: 0,
          }}
        />
      </View>
    );
  }

  if (!editor) {
    return (
      <View style={{ width: "100%", height: _height }}>
        {recordingLink ? (
          <iframe
            style={{ 
              width :"100%",
              height :_height,
              border:  "none",
            }}
            src={recordingLink}
            allowFullScreen
          ></iframe>
        ) : null}
      </View>
    );
  }
};

DailyRecordingWebview.propTypes = {
  editor: PropTypes.bool,
  room_name: PropTypes.string.isRequired,
  apikey: PropTypes.string.isRequired,
  _height: PropTypes.string.isRequired
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

export default DailyRecordingWebview;
