import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MovieDetailScreen from '../../screens/MovieDetailScreen';
import MovieListScreen from '../../screens/MovieListScreen';

const Stack = createNativeStackNavigator();

const MoviesStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="MovieList">
      <Stack.Screen 
        name="MovieList"
        component={MovieListScreen}
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="MovieDetail"
        component={MovieDetailScreen}
        options={{ 
          headerShown: false, 
        }} 
      />
    </Stack.Navigator>
  );
};

export default MoviesStackNavigator;
