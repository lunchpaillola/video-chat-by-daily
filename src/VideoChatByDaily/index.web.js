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

  const handleLeftMeeting = () => {
    globalCallFrame.leave();
    globalCallFrame.destroy();
  };

  const createAndJoinCallFrame = () => {
    globalCallFrame = DailyIframe.createFrame(ref.current, {});
    callFrameRef.current = globalCallFrame;
    globalCallFrame.join({
      url: url,
      token: token,
      showLeaveButton: true,
      activeSpeakerMode: false,
    });
    globalCallFrame.on("left-meeting", handleLeftMeeting);
  };

  const joinCall = useCallback(() => {
    if (editor) {
      // Check if in editor mode
      return; // Exit the function early if in editor mode
    }
    if (globalCallFrame) {
      globalCallFrame.leave();
      globalCallFrame.destroy().then(() => {
        globalCallFrame = null;
        createAndJoinCallFrame();
      });
    } else {
      createAndJoinCallFrame();
    }
  }, []);

  useEffect(() => {
    joinCall();

    return () => {
      console.log('Cleanup function start');
      // This anonymous function is the clean-up function
      globalCallFrame.off("left-meeting", handleLeftMeeting);
      if (globalCallFrame) {
        // If callFrameRef.current exists
        globalCallFrame.leave();
        globalCallFrame.destroy(); // Destroy the call frame
      }
     /* const iframeElement = ref.current.querySelector("iframe");
      if (iframeElement && iframeElement.parentNode) {
        iframeElement.parentNode.removeChild(iframeElement);
      }*/
    };
  }, [joinCall]);

  //error handling
  const errorHandling = getError();

  function getError(e) {
    if (!url) return 'Room url is not set in the "Video Chat" component';
    if (e) return e;
  }

  if (errorHandling && !editor) {
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
      <View style={{ width: "100%", height: "100%", backgroundColor: "red" }}>
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
