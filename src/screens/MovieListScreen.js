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
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/original${item.backdrop_path}` }}

          style={styles.poster}
          resizeMode="cover" // Ensures the image fills the container
        />
        <View style={styles.overlay}>
          <Text style={styles.overlayTitle} numberOfLines={1}>
            {item.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Watch</Text>
      <TouchableOpacity onPress={() => navigation.navigate('search')}>
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
    paddingHorizontal: 24,
    paddingVertical: 34,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 16, 
    overflow: 'hidden', 
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3, 
  },
  imageContainer: {
    width: '100%',
    height: 200, 
    position: 'relative', 
    overflow: 'hidden', 
    borderRadius: 16, 
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  overlayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
