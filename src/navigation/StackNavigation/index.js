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
        options={{ title: 'Movies' }}
      />
     
      <Stack.Screen 
        name="MovieDetail" 
        component={MovieDetailScreen} 
        options={{ title: 'Movie Details' }} 
      />
      
    </Stack.Navigator>
  );
};

export default MoviesStackNavigator;
