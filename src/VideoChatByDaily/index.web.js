import React, { useEffect, useRef, useCallback } from "react";
import DailyIframe from "@daily-co/daily-js";
import videoImage from "./editor-image.png";
import PropTypes from "prop-types";

let globalCallFrame = null;

const DailyVideoChat = (props) => {
  //props
  const { editor, token, url, _height } = props;
  const ref = useRef(null);
  const callFrameRef = useRef(null);
  


  const createAndJoinCallFrame = () => {
    if (ref.current) {
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
    }
  };

  const joinCall = useCallback(() => {
    if (editor || !url) {
      // Check if in editor mode
      return; // Exit the function early if in editor mode
    }
    if (globalCallFrame) {
      globalCallFrame.leave();
      globalCallFrame
        .destroy()
        .then(() => {
          globalCallFrame = null;
          createAndJoinCallFrame();
        })
        .catch(() => {});
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
      <div style={componentStyles.statusWrapper}>
        <p style={componentStyles.statusText}> {errorHandling}</p>
      </div>
    );
  }

  //Styles and rendering
  if (editor) {
    return (
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
    );
  }

  if (!editor) {
    return (
      <div
        ref={ref}
        style={{
          display: "block",
          width: "100%",
          height: _height,
          padding: 0,
        }}
      ></div>
    );
  }
};

const componentStyles = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  statusWrapper: {
    backgroundColor: "#d30",
    padding: "16px",
    borderRadius: "5px",
    marginBottom: "16px",
  },
  statusText: {
    color: "#fff",
    fontSize: "14px",
    fontWeight: "600",
  },
};

DailyVideoChat.propTypes = {
  editor: PropTypes.bool.isRequired,
  token: PropTypes.string,
  url: PropTypes.string.isRequired,
  _height: PropTypes.number.isRequired,
};

export default DailyVideoChat;
