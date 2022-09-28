import { Image, Text, View, StyleSheet, TouchableOpacity, Alert} from "react-native";
const EditRoomButton = (props) => {
  const {
    apikey,
    editor,
    updateRoomSettingsButton,
  } = props;

  //updateRoomSettingsButton props
  const {
    room_name_u,
    privacy_u,
    enable_chat_u,
    owner_only_broadcast_u,
    exp_u,
    nbf_u,
    enable_knocking_u,
    start_video_off_u,
    start_audio_off_u,
    updateText,
    updateBackgroundColor,
    updateBorderColor,
    updateRounding,
    roomUpdated,
  } = updateRoomSettingsButton;

  //Converting time to js
  const updateRoomExp = Math.round(new Date(exp_u).getTime() / 1000);
  const updateRoomNbf = Math.round(new Date(nbf_u).getTime() / 1000);

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
          enable_prejoin_ui: true,
          enable_screenshare: false,
          enable_chat: enable_chat_u,
          owner_only_broadcast: owner_only_broadcast_u,
          exp: updateRoomExp,
          nbf: updateRoomNbf,
          enable_knocking: enable_knocking_u,
          start_video_off: start_video_off_u,
          start_audio_off: start_audio_off_u,
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
      <View style={styles.statusWrapper}>
        <Text style={styles.statusText}>{errorHandling}</Text>
      </View>
    );
  }
		

  if (editor) {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={updateButtonStyle}>
        <Text style={updateRoomSettingsButton.styles.updateText}>{updateText}</Text>
      </TouchableOpacity>
    </View>
  );
		}

    if (!editor) {
			return (
        <TouchableOpacity style={updateButtonStyle} onPress={updateRoomAction}>
        <Text style={updateRoomSettingsButton.styles.updateText}>{updateText}</Text>
        </TouchableOpacity>
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
	}
});

export default EditRoomButton;