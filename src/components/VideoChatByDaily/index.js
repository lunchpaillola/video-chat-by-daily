import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import videoImage from "./editor-image.png";
import {WebView} from 'react-native-webview';

const DailyVideoChat = (props) => {
  const {
    apikey,
    editor,
    videoCall,
    createRoomButton,
    createMeetingTokenButton,
    deleteRoomButton,
    updateRoomSettingsButton,
  } = props;

  //videocallprops
  const {
    token,
    url,
  } = videoCall;

  //createRoomButton props
  const {
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
  } = createRoomButton;

  //createMeetingTokenButton props

  const {
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
  } = createMeetingTokenButton;

  //deleteRoomButton props
  const {
    room_name_d,
    deleteText,
    deleteBackgroundColor,
    deleteBorderColor,
    deleteRounding,
    room_deleted,
  } = deleteRoomButton;

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

  const createRoomExp = Math.round(new Date(exp).getTime() / 1000);
  const createRoomNbf = Math.round(new Date(nbf).getTime() / 1000);
  const updateRoomExp = Math.round(new Date(exp_u).getTime() / 1000);
  const updateRoomNbf = Math.round(new Date(nbf_u).getTime() / 1000);

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
    display: createRoomButton.enabled ? "flex" : "none",
  };

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
    display: updateRoomSettingsButton.enabled ? "flex" : "none",
  };

  const deleteButtonStyle = {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 36,
    marginTop: 0,
    padding: 4,
    borderRadius: deleteRounding,
    backgroundColor: deleteBackgroundColor,
    borderColor: deleteBorderColor,
    borderWidth: 2,
    display: deleteRoomButton.enabled ? "flex" : "none",
  };

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
    display: createMeetingTokenButton.enabled ? "flex" : "none",
  };

  const imageStyle = {
    width: "100%",
    height: 500,
    resizeMode: "contain",
    display: videoCall.enabled ? "flex" : "none",
  };

		const videoStyle ={
			display: videoCall.enabled ? "flex" : "none",
			width: "100%",
			height: "100%",
			padding: 0,
	}

  //starting the button onPress functions

  const endpointurl = "https://api.daily.co/v1/";

  //action for creating a room
  const createRoomAction = () => {
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
          enable_new_call_ui: true,
          enable_prejoin_ui: enable_prejoin_ui,
          exp: createRoomExp,
          nbf: createRoomNbf,
          enable_screenshare: false,
          enable_chat: enable_chat,
          owner_only_broadcast: owner_only_broadcast,
          enable_knocking: enable_knocking,
          start_video_off: start_video_off,
          start_audio_off: start_audio_off,
        },
        privacy: privacy,
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

        if (roomCreated) roomCreated(name, roomUrl, id, privacy);
      })
      .catch((error) => {
        console.error("Error:", error);
        getError(error);
      });
  };

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

  //action for deleting a room
  const deleteRoomAction = () => {
    fetch(endpointurl + "rooms/" + room_name_d, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + apikey,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);

        if (room_deleted) room_deleted();
      })
      .catch((error) => {
        console.error("Error:", error);
        getError(error);
      });
  };

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


  //url for the video call
  const videoCallURL = token ? url + "?t=" + token : url;
 

  //error handling
  const errorHandling = getError();

  function getError(e) {
    if (!apikey && createRoomButton.enabled && !editor)
      return "API Key is not set in the Daily video component";
    if (!apikey && deleteRoomButton.enabled && !editor)
      return "API Key is not set in the Daily video component";
    if (!apikey && updateRoomSettingsButton.enabled && !editor)
      return "API Key is not set in the Daily video component";
    if (!apikey && createMeetingTokenButton.enabled)
      return "API Key is not set in the Daily video component";
    if (!room_name_u && updateRoomSettingsButton.enabled)
      return 'Room name is not set in the "Update Room Button" tab';
    if (!room_name_d && deleteRoomButton.enabled)
      return 'Room name is not set in the "Delete Room Button" tab';
    if (!room_name && createMeetingTokenButton.enabled)
      return 'Room name is not set in the "Create Meeting Token" tab';
    if (!url && videoCall.enabled)
      return 'Room url is not set in the "Video Call" tab';
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
      <Image style={imageStyle} source={videoImage} />
      <TouchableOpacity style={createButtonStyle}>
        <Text style={createRoomButton.styles.createText}>{createText}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={deleteButtonStyle}>
        <Text style={deleteRoomButton.styles.deleteText}>{deleteText}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={updateButtonStyle}>
        <Text style={updateRoomSettingsButton.styles.updateText}>{updateText}</Text>
      </TouchableOpacity>
						<TouchableOpacity style={meetingTokenStyle}>
							<Text style={createMeetingTokenButton.styles.tokenText}>{tokenText}</Text></TouchableOpacity>
    </View>
  );
		}
		if (!editor) {
			return (
					<View style={styles.wrapper}>
						<View>
						<WebView
          source={{uri: videoCallURL}}
          domStorageEnabled={true}
          allowFileAccess={true}
          originWhitelist={['*']}
          javaScriptEnabled={true}
					useWebKit={true}
          allowsInlineMediaPlayback={true}
          style={{
            height: 600,
            width: 400,
          }}/> 
										</View>
							<TouchableOpacity style={createButtonStyle}>
									<Text style={createRoomButton.styles.createText} onPress={createRoomAction}>{createText}</Text>
							</TouchableOpacity>
							<TouchableOpacity style={deleteButtonStyle} onPress={deleteRoomAction}>
									<Text style={deleteRoomButton.styles.deleteText}>{deleteText}</Text>
							</TouchableOpacity>
							<TouchableOpacity style={updateButtonStyle} onPress={updateRoomAction}>
									<Text style={updateRoomSettingsButton.styles.updateText}>{updateText}</Text>
							</TouchableOpacity>
							<TouchableOpacity style={meetingTokenStyle} onPress={meetingTokenAction}>
								<Text style={createMeetingTokenButton.styles.tokenText}>{tokenText}</Text></TouchableOpacity>
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
		container: {
			width: "100%",
			height: "100%",
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
	text: {
			fontSize: 14,
			lineHeight: 21,
			fontWeight: "bold",
			letterSpacing: 0.25,
			color: "white",
	},
	video: {
    marginTop: 20,
    maxHeight: 200,
    width: 320,
    flex: 1
  }
});

export default DailyVideoChat;
