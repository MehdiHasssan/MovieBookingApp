import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MovieDetailScreen = () => {
  return (
    <View>
      <Text style={styles.Title}>MovieDetailScreen</Text>
    </View>
  )
}

export default MovieDetailScreen

const styles = StyleSheet.create({
    Title:{
        fontFamily:'CustomFont',

    }
})