import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
const UpdateRoomButton = (props) => {
  const {
    apikey,
    editor,
    room_name_u,
    enable_prejoin_ui,
    enable_chat,
    owner_only_broadcast,
    exp,
    nbf,
    enable_knocking,
    start_video_off,
    start_audio_off,
    enable_hidden_participants,
    enable_noise_cancellation_ui,
    enable_hand_raising,
    enable_emoji_reactions,
    enable_pip_ui,
    lang,
    updateText,
    updateBackgroundColor,
    updateBorderColor,
    updateRounding,
    roomUpdated,
    styles,
    enable_cloud_recording,
    meeting_join_hook,
    eject_on_exp,
  } = props;

  //Converting time to js
  const updateRoomExp = Math.round(new Date(exp).getTime() / 1000);
  const updateRoomNbf = Math.round(new Date(nbf).getTime() / 1000);

  //ButtonStyles

  const updateButtonStyle = {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 36,
    marginTop: 0,
    padding: 4,
    borderRadius: updateRounding,
    backgroundColor: updateBackgroundColor,
    borderColor: updateBorderColor,
    borderWidth: 2,
    display: "flex",
  };

  //starting the button onPress functions

  const endpointurl = "https://api.daily.co/v1/";

  //action for updating a room
  const updateRoomAction = () => {
    if (!editor) {
      fetch(endpointurl + "rooms/" + room_name_u, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + apikey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          properties: {
            enable_network_ui: false,
            enable_new_call_ui: true,
            enable_prejoin_ui: enable_prejoin_ui,
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
            enable_pip_ui: enable_pip_ui,
            lang: lang,
            exp: updateRoomExp,
            nbf: updateRoomNbf,
          },
          privacy: privacy_u,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log("Success:", result);
          console.log("room name:", result.name);
          const name = result.name;
          const roomUrl = result.url;
          const id = result.id;
          const privacy = result.privacy;

          if (roomUpdated) roomUpdated(name, roomUrl, id, privacy);
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

  function getError(e) {
    if (!apikey)
      return 'API Key is not set in the "Update Room Button" component';
    if (!room_name_u)
      return 'Room name is not set in the "Update Room Button" component';
    if (e) return e;
  }

  if (errorHandling && !editor) {
    return (
      <View style={componentStyles.statusWrapper}>
        <Text style={componentStyles.statusText}>{errorHandling}</Text>
      </View>
    );
  }
  return (
    <TouchableOpacity style={updateButtonStyle} onPress={updateRoomAction}>
      <Text style={styles.updateText}>{updateText}</Text>
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

export default UpdateRoomButton;
