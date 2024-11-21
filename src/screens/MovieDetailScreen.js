import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MovieDetailScreen = () => {
  return (
    <SafeAreaView>
      <Text style={styles.Title}>MovieDetailScreen</Text>
    </SafeAreaView>
  )
}

export default MovieDetailScreen

const styles = StyleSheet.create({
    Title:{
        fontFamily:'CustomFont',

    }
})