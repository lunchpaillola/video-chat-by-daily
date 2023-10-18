import React, { useEffect, useRef, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import DailyIframe from "@daily-co/daily-js";
import videoImage from "./editor-image.png";

let globalCallFrame = null;

const DailyVideoChat = (props) => {
  //props
  const { editor, token, url } = props;
  const ref = useRef(null);
  const callFrameRef = useRef(null);


  const createAndJoinCallFrame = () => {
    if(ref.current){
    globalCallFrame = DailyIframe.createFrame(ref.current, {});
    callFrameRef.current = globalCallFrame;
    const joinOptions = {
      url: url,
      showLeaveButton: true,
      activeSpeakerMode: false,
    };
    // Only add token if it exists
  if (token) {
    joinOptions.token = token;
  }
    globalCallFrame.join(joinOptions);
  
  }};

  const joinCall = useCallback(() => {
    if (editor || !url) {
      // Check if in editor mode
      return; // Exit the function early if in editor mode
    }
    if (globalCallFrame) {
      globalCallFrame.leave();
      globalCallFrame.destroy().then(() => {
      globalCallFrame = null;
      createAndJoinCallFrame();
      }).catch((err) => {
      });
    } else {
      createAndJoinCallFrame();
    }
  }, [url]);

  useEffect(() => {
    joinCall();

    return () => {
      if (globalCallFrame) {
      globalCallFrame.leave();
      globalCallFrame.destroy();
      }
    };
  }, [joinCall, url]);

  //error handling
  const errorHandling = getError();

  function getError() {
    if (!url) return 'Room url is not set in the "Video Chat" component';
  }

  if (errorHandling && editor) {
    return (
      <View style={componentStyles.statusWrapper}>
        <Text style={componentStyles.statusText}> {errorHandling}</Text>
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
      <View style={{ width: "100%", height: "100%"}}>
        <div
          ref={ref}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            padding: 0,
          }}
        ></div>
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