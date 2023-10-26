import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const CreateRoomButton = (props) => {
  const {
    apikey,
    editor,
    privacy,
    enable_prejoin_ui,
    enable_chat,
    owner_only_broadcast,
    exp,
    nbf,
    enable_knocking,
    start_video_off,
    start_audio_off,
    createText,
    createBackgroundColor,
    createBorderColor,
    createRounding,
    roomCreated,
    styles,
    enable_cloud_recording,
    meeting_join_hook,
    eject_on_exp,
    enable_hidden_participants,
    enable_noise_cancellation_ui,
    enable_hand_raising,
    enable_emoji_reactions,
    enable_pip_ui,
    enable_people_ui,
    lang
    


  } = props;

  //Converting time to js

  const createRoomExp = Math.round(new Date(exp).getTime() / 1000);
  const createRoomNbf = Math.round(new Date(nbf).getTime() / 1000);

  //ButtonStyles
  const createButtonStyle = {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 36,
    marginTop: 0,
    padding: 4,
    borderRadius: createRounding,
    backgroundColor: createBackgroundColor,
    borderColor: createBorderColor,
    borderWidth: 2,
    display: "flex",
  };

  //starting the button onPress functions

  const endpointurl = "https://api.daily.co/v1/";

  //action for creating a room
  const createRoomAction = () => {
    if (!editor) {
      fetch(endpointurl + "rooms/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + apikey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          properties: {
            enable_network_ui: false,
            enable_prejoin_ui: enable_prejoin_ui,
            exp: createRoomExp,
            nbf: createRoomNbf,
            enable_screenshare: false,
            enable_chat: enable_chat,
            owner_only_broadcast: owner_only_broadcast,
            enable_knocking: enable_knocking,
            start_video_off: start_video_off,
            start_audio_off: start_audio_off,
            enable_recording: enable_cloud_recording,
            eject_at_room_exp: eject_on_exp,
            meeting_join_hook: meeting_join_hook,
            enable_hidden_participants: enable_hidden_participants,
            enable_noise_cancellation_ui: enable_noise_cancellation_ui,
            enable_hand_raising: enable_hand_raising,
            enable_emoji_reactions: enable_emoji_reactions,
            enable_people_ui: enable_people_ui,
            lang: lang,

          },
          privacy: privacy,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          const name = result.name;
          const roomUrl = result.url;
          const id = result.id;
          const privacy = result.privacy;

          if (roomCreated) roomCreated(name, roomUrl, id, privacy);
        })
        .catch((error) => {
          console.error("Error:", error);
          getError(error);
        });
    }
    return;
  };

  //error handling
  const errorHandling = getError();

  function getError() {
    if (!apikey)
      return 'API Key is not set in the "Create Room Button" component';
  }

  if (errorHandling && editor) {
    return (
      <View style={componentStyles.statusWrapper}>
        <Text style={componentStyles.statusText}>{errorHandling}</Text>
      </View>
    );
  }
  return (
    <TouchableOpacity style={createButtonStyle} onPress={errorHandling ? null : createRoomAction}>
      <Text style={styles.createText}>{createText}</Text>
    </TouchableOpacity>
  );
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

export default CreateRoomButton;
