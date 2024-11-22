import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import apiClient from '../services/Api';

const Search = ({ navigation }) => {
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [genresWithImages, setGenresWithImages] = useState([]);

  // Fetch genres and movies
  useEffect(() => {
    const fetchGenresAndMovies = async () => {
      try {
        // Fetch genres
        const genreResponse = await apiClient.get('/genre/movie/list');
        const genreList = genreResponse.data.genres;

        // Fetch upcoming movies
        const movieResponse = await apiClient.get('/movie/upcoming');
        const movies = movieResponse.data.results;

        // Categorize movies by genre
        const categorizedMovies = {};
        genreList.forEach((genre) => {
          categorizedMovies[genre.name] = [];
        });

        movies.forEach((movie) => {
          movie.genre_ids.forEach((id) => {
            const genre = genreList.find((g) => g.id === id);
            if (genre) {
              categorizedMovies[genre.name].push(movie);
            }
          });
        });

        // Filter out genres without valid images and remove "Thriller"
        const uniqueImages = new Set();
        const genresWithImagesTemp = genreList.filter((genre) => {
          if (genre.name === 'Thriller') {
            return false; // Exclude "Thriller"
          }
          const movies = categorizedMovies[genre.name];
          if (movies && movies.length > 0) {
            // Find a movie with a valid image
            const validMovie = movies.find(
              (m) => (m.backdrop_path || m.poster_path) && !uniqueImages.has(m.backdrop_path || m.poster_path)
            );
            if (validMovie) {
              const imagePath = validMovie.backdrop_path || validMovie.poster_path;
              uniqueImages.add(imagePath);
              genre.image = `https://image.tmdb.org/t/p/w500${imagePath}`; // Attach unique image to the genre
              return true; // Keep this genre
            }
          }
          return false; // Exclude genres without valid images
        });

        setMoviesByGenre(categorizedMovies); // Save categorized movies
        setGenresWithImages(genresWithImagesTemp); // Save genres with valid images
      } catch (error) {
        console.error('Error fetching genres or movies:', error);
      }
    };

    fetchGenresAndMovies();
  }, []);

  // Render a single genre card
  const renderGenreItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.genreCard}
        onPress={() =>
          navigation.navigate('MoviesByGenre', { genreName: item.name, movies: moviesByGenre[item.name] })
        }
      >
        <Image style={styles.genreImage} source={{ uri: item.image }} resizeMode="cover" />
        <View style={styles.genreOverlay}>
          <Text style={styles.genreTitle}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={genresWithImages} // Only genres with images
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderGenreItem}
        numColumns={2}
        contentContainerStyle={styles.genreList}
      />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingHorizontal:16
  },
  genreList: {
    justifyContent: 'space-between',
  },
  genreCard: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    height: 150,
    position: 'relative',
  },
  genreImage: {
    width: '100%',
    height: '100%',
  },
  genreOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  genreTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
