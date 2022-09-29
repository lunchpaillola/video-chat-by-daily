import React from "react";
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";


const Token = (props) => {
  const {
    apikey,
    editor,
    room_name,
    username,
    is_owner,
    start_video_off_t,
    start_audio_off_t,
    tokenText,
    tokenBackgroundColor,
    tokenBorderColor,
    tokenRounding,
    meeting_token_created,
    styles,
  } = props;

  //ButtonStyles

  const meetingTokenStyle = {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 36,
    marginTop: 0,
    padding: 4,
    borderRadius: tokenRounding,
    backgroundColor: tokenBackgroundColor,
    borderColor: tokenBorderColor,
    borderWidth: 2,
    display:"flex",
  };


  //starting the button onPress functions

  const endpointurl = "https://api.daily.co/v1/";


  //action for creating a meeting token
  const meetingTokenAction = () => {
    fetch(endpointurl + "meeting-tokens", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + apikey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties: {
          room_name: room_name,
          is_owner: is_owner,
          user_name: username,
          start_video_off: start_video_off_t,
          start_audio_off: start_audio_off_t,
        },
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        const token = result.token;

        if (meeting_token_created) meeting_token_created(token);
      })
      .catch((error) => {
        console.error("Error:", error);
        getError(error);
      });
  };


  //error handling
  const errorHandling = getError();

  function getError(e) {
    if (!apikey)
      return 'API Key is not set in the "meeting token" component';
    if (!room_name)
      return 'Room name is not set in the "meeting token" component';
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
						<TouchableOpacity style={meetingTokenStyle}>
							<Text style={styles.tokenText}>{tokenText}</Text></TouchableOpacity>
    </View>
  );
		}

    if (!editor) {
			return (
        <TouchableOpacity style={meetingTokenStyle} onPress={meetingTokenAction}>
								<Text style={styles.tokenText}>{tokenText}</Text></TouchableOpacity>
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
	}
});

export default Token;