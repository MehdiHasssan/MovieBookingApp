import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import { getMovieDetails, getMovieTrailers } from "../services/Api";
import Icon from "react-native-vector-icons/Ionicons";

const { height } = Dimensions.get("window"); // Get the screen height

const MovieDetailScreen = ({ route, navigation }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieData = await getMovieDetails(movieId);
        setMovie(movieData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleWatchTrailer = async () => {
    try {
      const trailers = await getMovieTrailers(movieId);
      const trailer = trailers.find((video) => video.type === "Trailer");
      if (trailer) {
        navigation.navigate("Trailer", {
          videoUrl: `https://www.youtube.com/watch?v=${trailer.key}`,
        });
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  if (!movie) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Movie Poster */}
        <View style={styles.header}>
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="chevron-back" color="#fff" size={24} />
            <Text style={styles.buttonText}>Watch</Text>
          </TouchableOpacity>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`,
            }}
            style={styles.poster}
          />

          {/* Title and Buttons Positioned Over the Image */}
          <View style={[styles.overlayContainer, { top: height * 0.2 }]}>
            <Text style={styles.movieTitle}>{movie.title}</Text>
            <Text style={styles.releaseDate}>
              In Theaters {movie.release_date}
            </Text>
            <TouchableOpacity style={styles.getTicketsButton}>
              <Text style={styles.getTicketsButtonText}>Get Tickets</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.watchTrailerButton}
              onPress={handleWatchTrailer}
            >
              <Text style={styles.watchTrailerButtonText}>▶ Watch Trailer</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Genres */}
        <View style={styles.genresContainer}>
          <Text style={styles.sectionTitle}>Genres</Text>
          <View style={styles.genres}>
            {movie.genres.map((genre, index) => {
              const genreColors = [
                "#007BFF", // Blue
                "#28A745", // Green
                "#FFC107", // Yellow
                "#DC3545", // Red
                "#6F42C1", // Purple
                "#17A2B8", // Teal
              ];
              const backgroundColor = genreColors[index % genreColors.length]; 
              return (
                <View
                  key={genre.id}
                  style={[styles.genreTag, { backgroundColor }]} 
                >
                  <Text style={styles.genreText}>{genre.name}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.horizontalLine}></View>

        {/* Overview */}
        <View style={styles.overviewContainer}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.overviewText}>{movie.overview}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    position: "relative",
    backgroundColor: "#000",
    alignItems: "center",
    paddingBottom: 16,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
  poster: {
    width: "100%",
    height: 350,
  },
  overlayContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },
  releaseDate: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 20,
  },
  getTicketsButton: {
    backgroundColor: "#007BFF",
    width: "70%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  getTicketsButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  watchTrailerButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#007BFF",
    width: "70%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  watchTrailerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  genresContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  genres: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  genreTag: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff", 
  },
  overviewContainer: {
    paddingHorizontal: 16,
  },
  overviewText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: "gray",
    marginHorizontal: 16,
    marginVertical: 16,
  },
});
