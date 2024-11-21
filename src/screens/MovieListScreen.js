import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import { getUpcomingMovies } from '../services/Api';
import Icon from 'react-native-vector-icons/FontAwesome';

const MovieListScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getUpcomingMovies();
        setMovies(moviesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.poster}
      />
      {/* Title Overlay */}
      <View style={styles.overlay}>
        <Text style={styles.overlayTitle} numberOfLines={1}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
  

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Watch</Text>
      <TouchableOpacity>
        <Icon name="search" size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={<View style={styles.listFooter} />}
      />
    </SafeAreaView>
  );
};

export default MovieListScreen;

const styles = StyleSheet.create({

  listFooter: {
    height: 60, 
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent:'center',
    paddingHorizontal: 24,
    paddingVertical: 34,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    position: 'absolute', // Sticky behavior
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'CustomFont',
    color: '#333',
    justifyContent:'center'
  },
  listContent: {
    paddingTop: 60, // Push content below the sticky header
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  poster: {
    width: '100%',
    height: 240, // Adjust for better proportions
    resizeMode: 'cover', // Ensures the image covers its container
  },
  overlay: {
    position: 'absolute',
    bottom: 10, 
    left: 0,
    right: 0,
    // backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  overlayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'start',
    fontFamily:"CustomFont-Bold"
  },
  
});
