import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import DailyIframe from "@daily-co/daily-js";
import videoImage from "./editor-image.png";

const DailyVideoChat = (props) => {
  const ref = useRef(null); 
   //function for joining a call
   function JoinCall() {
    useEffect(() => {
      const parentElement = ref.current;
      const callFrame = DailyIframe.createFrame(parentElement, {});
      if (token) {
        callFrame.join({
          url: url,
          token: token,
          showLeaveButton: true,
          activeSpeakerMode: false,
        });
      }
      if (!token) {
        callFrame.join({
          url: url,
          showLeaveButton: true,
          activeSpeakerMode: false,
        });
      }
    }, []);
  };
  const {
    editor,
    videoCall,
  } = props;

  //videocallprops
  const { token, url } = videoCall;

  

  //error handling
  const errorHandling = getError();


  function getError(e) {
    if (!url)
      return 'Room url is not set in the "Video Call" tab';
    if (e) return e;
  }

  if (errorHandling && !editor) {
    return (
      <View style={styles.statusWrapper}>
        <Text style={styles.statusText}> {errorHandling}</Text>
      </View>
    );
  }

  //Styles and rendering
  if (editor) {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <img
          src={videoImage}
          style={{
            display: "block",
            objectFit: "fill",
            width: "100%",
            height: "100%",
            padding: 0,
          }}
        />
      </View>
    );
  }

  if (!editor) {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <div
          ref={ref}
          style={{
            display:"block",
            width: "100%",
            height: "100%",
            padding: 0,
          }}
        >
          {JoinCall()}
        </div>
      </View>
    );
  }
};

const styles = StyleSheet.create({
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