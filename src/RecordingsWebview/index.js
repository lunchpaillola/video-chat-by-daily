import React, { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import videoImage from "./editor-image.png";
import { WebView } from "react-native-webview";

const DailyRecordingWebview = (props) => {
  const { editor, room_name, apikey } = props;

  const imageStyle = {
    width: "100%",
    height: 500,
    resizeMode: "contain",
    display: "flex",
  };


  const endpointurl = "https://api.daily.co/v1/";


  let recordingId; // Declare a variable to store the recording ID
  const [recordingLink, setRecordingLink] = useState(null); // Declare recordingLink state

  //action for recording a room
  const getRecordingId = () => {
    if (!editor) {
      const urlWithQuery = `${endpointurl}recordings/?room_name=${room_name}`;
      console.log('urlWithQury', urlWithQuery);
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
          console.log('recordID',result, result.data[0].id);
          recordingId = result.data[0].id
          getRecordingAccessLink();
        })
        .catch((error) => {
          console.error("Error:", error);
          getError(error);
        });
        
    }
  };

  //action for recording a room
  const getRecordingAccessLink = () => {
    if (!editor) {
      const urlWithQuery = `${endpointurl}recordings/${recordingId}/access-link`;
      console.log('urlWithQury', urlWithQuery);
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
          const accessLink = result
          console.log('accessLink', accessLink);
          const link = result.download_link;
          console.log('recordingLink', link);
          setRecordingLink(link);
        })
        .catch((error) => {
          console.error("Error:", error);
          getError(error);
        });
        
    }
  };
  //error handling
  const errorHandling = getError();


// Usage in useEffect
useEffect(() => {
  getRecordingId(); // Call the function to fetch and store the recording ID
}, []);

  function getError() {
    if (!room_name) return 'Room name is not set in the "recording" component';
  }


  if (errorHandling && editor) {
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
  if (!editor) {
    return (
      <View style={componentStyles.wrapper}>
        <View style={{ width: "100%", height: "100%" }}>
          { room_name ? (
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
          ) : null }
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

export default DailyRecordingWebview;