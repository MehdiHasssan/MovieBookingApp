import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const MovieListScreen = ({navigation}) => {
  return (
    <View>
      <Text>MovieListScreen</Text>
      <TouchableOpacity onPress={()=>navigation.navigate('MovieDetail')}>
        <Text>Detail</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MovieListScreen

const styles = StyleSheet.create({})