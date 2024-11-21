// src/navigation/index.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MovieListScreen from '../screens/MovieListScreen';
import MovieDetailScreen from '../screens/MovieDetailScreen';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MovieList">
        <Stack.Screen name="MovieList" component={MovieListScreen} options={{ title: 'Upcoming Movies' }} />
        <Stack.Screen name="MovieDetail" component={MovieDetailScreen} options={{ title: 'Movie Details' }} />
        {/* <Stack.Screen name="MovieSearch" component={MovieSearchScreen} options={{ title: 'Search Movies' }} />
        <Stack.Screen name="SeatMapping" component={SeatMappingScreen} options={{ title: 'Select Seats' }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
