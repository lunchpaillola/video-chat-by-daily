import React, { useEffect } from "react";
import {View,Text,TouchableOpacity,StyleSheet } from 'react-native';
import DailyIframe from "@daily-co/daily-js";
import videoImage from "./editor-image.png";


const DailyVideoChat = (props) => {


	const { 
		apikey,
		editor,
		videoCall,
		createRoomButton,
		createMeetingTokenButton,
		deleteRoomButton,
		updateRoomSettingsButton } = props;

	//videocallprops
	const {token, 
		url, 
		accent,
		accentText,
		background,
		backgroundAccent,
		baseText,
		border,
		mainAreaBg,
		mainAreaBgAccent,
		mainAreaText,
		supportiveText,
		joinedMeeting,
		leftMeeting} = videoCall;


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
		roomCreated} = createRoomButton;

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
			meeting_token_created} = createMeetingTokenButton;

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
		roomUpdated
	} = updateRoomSettingsButton;

	//Converting time to js

	const createRoomExp = Math.round(new Date(exp).getTime() / 1000);
	const createRoomNbf = Math.round(new Date(nbf).getTime() / 1000);
	const updateRoomExp = Math.round(new Date(exp_u).getTime() / 1000);
	const updateRoomNbf = Math.round(new Date(nbf_u).getTime() / 1000);

	//ButtonStyles
	const createButtonStyle = {
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: 36,
		marginTop: 0,
		padding: 4,
		borderRadius: createRounding,
		backgroundColor: createBackgroundColor,
		borderColor: createBorderColor,
		borderWidth: 2,
			};

	const updateButtonStyle = {
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				height: 36,
				marginTop: 0,
				padding: 4,
				borderRadius: updateRounding,
				backgroundColor: updateBackgroundColor,
				borderColor: updateBorderColor,
				borderWidth: 2,
					};

		const deleteButtonStyle = {
						alignItems: 'center',
						justifyContent: 'center',
						width: '100%',
						height: 36,
						marginTop: 0,
						padding: 4,
						borderRadius: deleteRounding,
						backgroundColor: deleteBackgroundColor,
						borderColor: deleteBorderColor,
						borderWidth: 2,
							};

		const meetingTokenStyle = {
								alignItems: 'center',
								justifyContent: 'center',
								width: '100%',
								height: 36,
								marginTop: 0,
								padding: 4,
								borderRadius: tokenRounding,
								backgroundColor: tokenBackgroundColor,
								borderColor: tokenBorderColor,
								borderWidth: 2,
									};

		


//starting the button onPress functions

	const endpointurl = "https://api.daily.co/v1/";

	//action for creating a room
	const createRoomAction = () => {
	
		fetch(endpointurl + "rooms/", { 
		method: "POST",
		headers: {
			 Accept: "application/json",
				Authorization: "Bearer " + apikey,
				"Content-Type": "application/json"
		},
		body: JSON.stringify({properties: {
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
	privacy: privacy}),
})
				.then((response) => response.json())
				.then(result => {
					console.log('Success:', result);
					console.log('room name:', result.name)
						const name = result.name;
			   const roomUrl = result.url;
						const id = result.id;
					

			   if (roomCreated) roomCreated(name,roomUrl, id);

			})
			.catch(error => {
					console.error('Error:', error);
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
				"Content-Type": "application/json"
		},
		body: JSON.stringify({properties: {
			room_name: room_name,
			is_owner: is_owner,
			username: username,
			start_video_off: start_video_off_t,
			start_audio_off: start_audio_off_t,
 }}),
})
				.then((response) => response.json())
				.then(result => {
					console.log('Success:', result);
					console.log('token', result.token)
						const token = result.token;

			   if (meeting_token_created) meeting_token_created(token);

			})
			.catch(error => {
					console.error('Error:', error);
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
				"Content-Type": "application/json"
		},
})
				.then((response) => response.json())
				.then(result => {
					console.log('Success:', result);

			   if (room_deleted) room_deleted();

			})
			.catch(error => {
					console.error('Error:', error);
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
				"Content-Type": "application/json"
		},
		body: JSON.stringify({properties: {
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
	privacy: privacy_u}),
})
				.then((response) => response.json())
				.then(result => {
					console.log('Success:', result);
					console.log('room name:', result.name)
						const name = result.name;
			   const roomUrl = result.url;
						const id = result.id;
					

			   if (roomUpdated) roomUpdated(name,roomUrl, id);

			})
			.catch(error => {
					console.error('Error:', error);
					getError(error);
			});

};

//error handling
const errorHandling = getError();

function getError(e) {
	
	if (!apikey && createRoomButton.enabled && !editor) return 'API Key is not set in the Daily video component';
	if (!apikey && deleteRoomButton.enabled && !editor) return 'API Key is not set in the Daily video component';
	if (!apikey && updateRoomSettingsButton.enabled && !editor) return 'API Key is not set in the Daily video component';
	if (!apikey && createMeetingTokenButton.enabled) return 'API Key is not set in the Daily video component';
	if (!room_name_u && updateRoomSettingsButton.enabled) return 'Room name is not set in the "Update Room Button" tab';
	if (!room_name_d && deleteRoomButton.enabled) return 'Room name is not set in the "Delete Room Button" tab';
	if (!room_name && createMeetingTokenButton.enabled) return 'Room name is not set in the "Create Meeting Token" tab';
	if (!url &&  videoCall.enabled) return 'Room url is not set in the "Video Call" tab';
	if (e) return e;
}

if(errorHandling && !editor){
	return(
		<View style={styles.statusWrapper}>
							<Text style={styles.statusText}> {errorHandling}</Text>
	</View> 
) 
};


	
//function for joining a call
	function JoinCall() {

				useEffect(() => {
					
					const parentElement = document.querySelector('.daily-call-element');
								const callFrame = DailyIframe.createFrame(parentElement, {
								}); 

								//events
								callFrame.on('left-meeting', ()=> {
									if (leftMeeting) leftMeeting();
									console.log('hey left-meeting', leftMeeting);
								});

								callFrame.on('joined-meeting', ()=> {
									if (joinedMeeting) joinedMeeting();
									console.log('hey joined-meeting', joinedMeeting);
								});

								callFrame.setTheme({
									colors: {
										accent: accent,
										accentText: accentText,
										background: background,
										backgroundAccent: backgroundAccent,
										baseText: baseText,
										border: border,
										mainAreaBg: mainAreaBg,
										mainAreaBgAccent: mainAreaBgAccent,
										mainAreaText: mainAreaText,
										supportiveText:supportiveText,
									},
							});
							 if (token && videoCall.enabled){
								callFrame.join({
										url: url,
										token: token,
										showLeaveButton: true,
										activeSpeakerMode: false,
								})
							};
								if (!token && videoCall.enabled){
									callFrame.join({
											url: url,
											showLeaveButton: true,
											activeSpeakerMode: false,
									})};

				}, [])};
 
				//Styles and rendering
	if ( editor ) {
		return (
				<View style={{ width: '100%', height: '100%' }}>
					<img
            src={videoImage}
            style={{ display: videoCall.enabled ? "block" : "none", objectFit: 'fill', width: '100%', height: '100%', padding: 0 }}
          />
										<div style={{display: createRoomButton.enabled ? "block" : "none" }}><TouchableOpacity style={createButtonStyle}><Text style={createRoomButton.styles.createText}>{createText}</Text></TouchableOpacity></div>
										<div style={{display: deleteRoomButton.enabled ? "block" : "none" }}><TouchableOpacity style={deleteButtonStyle}><Text style={deleteRoomButton.styles.deleteText}>{deleteText}</Text></TouchableOpacity></div>
										<div style={{display: updateRoomSettingsButton.enabled ? "block" : "none" }}><TouchableOpacity style={updateButtonStyle}><Text style={updateRoomSettingsButton.styles.updateText}>{updateText}</Text></TouchableOpacity></div>
										<div style={{display: createMeetingTokenButton.enabled ? "block" : "none" }}><TouchableOpacity style={meetingTokenStyle}><Text style={createMeetingTokenButton.styles.tokenText}>{tokenText}</Text></TouchableOpacity></div>
				</View>
		)
	};
	
	if (!editor) {
	return(
		 <View style={styles.container}>
        <div class="daily-call-element" style={{ display: videoCall.enabled ? "block" : "none", width: '100%', height: '100%', padding: 0}}> {JoinCall()} </div> 
							<div style={{display: createRoomButton.enabled ? "block" : "none" }}><TouchableOpacity style={createButtonStyle} onPress={createRoomAction}><Text style={createRoomButton.styles.createText}> {createText}</Text></TouchableOpacity></div>	
							<div style={{display: deleteRoomButton.enabled ? "block" : "none" }}><TouchableOpacity style={deleteButtonStyle} onPress={deleteRoomAction}><Text style={deleteRoomButton.styles.deleteText}>{deleteText}</Text></TouchableOpacity></div>
							<div style={{display: updateRoomSettingsButton.enabled ? "block" : "none" }}><TouchableOpacity style={updateButtonStyle} onPress={updateRoomAction}><Text style={updateRoomSettingsButton.styles.updateText}>{updateText}</Text></TouchableOpacity></div>
							<div style={{display: createMeetingTokenButton.enabled ? "block" : "none" }}><TouchableOpacity style={meetingTokenStyle} onPress={meetingTokenAction}><Text style={createMeetingTokenButton.styles.tokenText}>{tokenText}</Text></TouchableOpacity></div>
		</View> 
	) }
};



const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	container: {
		width: '100%',
		height: '100%',
},
statusWrapper: {
	backgroundColor: '#d30',
	padding: 16,
	borderRadius: 5,
	marginBottom: 16,
},
statusText: {
	color: '#fff',
	fontSize: 14,
	fontWeight: '600',
},
	text:{
		fontSize: "@body",
		lineHeight: 21,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'white',
}
})

export default DailyVideoChat