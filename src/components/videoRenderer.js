import React, { useState, useCallback } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

const { height, width } = Dimensions.get("window");

export default function VideoScreen({ url, onClose }) {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback(
    (state) => {
      if (state === "ended") {
        setPlaying(false);
        onClose(); // Call the parent's close function
      }
    },
    [onClose]
  );

  // Extract YouTube video ID from the URL
  const videoId = url.split("v=")[1]?.split("&")[0];

  return (
    <View style={styles.container}>
      <YoutubePlayer
        height={height * 0.3}
        width={width}
        play={playing}
        videoId={videoId}
        onChangeState={onStateChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
  },
});
