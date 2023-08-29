import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const DeleteRoomButton = (props) => {
  const {
    apikey,
    editor,
    room_name_d,
    deleteText,
    deleteBackgroundColor,
    deleteBorderColor,
    deleteRounding,
    room_deleted,
    styles,
  } = props;

  //ButtonStyles

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
    display: "flex",
  };

  const endpointurl = "https://api.daily.co/v1/";

  //action for deleting a room
  const deleteRoomAction = () => {
    if (!editor) {
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
          const deletedResult = result.deleted;

          if (room_deleted) room_deleted(deletedResult);
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
      return 'API Key is not set in the "Delete Room Button" component';
    if (!room_name_d)
      return 'Room name is not set in the "Delete Room Button" component';
    if (e) return e;
  }

  if (errorHandling && editor) {
    return (
      <View style={componentStyles.statusWrapper}>
        <Text style={componentStyles.statusText}>{errorHandling}</Text>
      </View>
    );
  }
  return (
    <TouchableOpacity style={deleteButtonStyle} onPress={deleteRoomAction}>
      <Text style={styles.deleteText}>{deleteText}</Text>
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

export default DeleteRoomButton;
