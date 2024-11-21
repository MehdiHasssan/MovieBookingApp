import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const MovieListScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <Text>MovieListScreen</Text>
      <TouchableOpacity onPress={()=>navigation.navigate('MovieDetail')}>
        <Text>Detail</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default MovieListScreen

const styles = StyleSheet.create({})