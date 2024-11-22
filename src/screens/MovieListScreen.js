import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  TextInput,
} from "react-native";
import { getUpcomingMovies } from "../services/Api";
import Icon from "react-native-vector-icons/FontAwesome";
import IconFeather from "react-native-vector-icons/Feather";
import Search from "./Search";

const MovieListScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

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

  // Filter movies based on searchText
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("MovieDetail", { movieId: item.id })}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/original${item.backdrop_path}`,
          }}
          style={styles.poster}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          <Text style={styles.overlayTitle} numberOfLines={1}>
            {item.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSearchResults = () => (
    <View style={styles.resultsContainer}>
      <Text style={styles.resultsTitle}>Top Results</Text>
      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.resultCard}
            onPress={() =>
              navigation.navigate("MovieDetail", { movieId: item.id })
            }
          >
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/original${item.backdrop_path}`,
              }}
              style={styles.resultImage}
            />
            <View style={styles.resultDetails}>
              <Text style={styles.resultTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.releaseDate} numberOfLines={1}>
                {item.release_date}
              </Text>
            </View>
            <TouchableOpacity>
              <Icon name="ellipsis-h" size={20} color="gray" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.resultsList}
      />
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {isSearch ? (
        <View style={styles.searchContainer}>
          {/* Search icon inside the input on the left */}
          <Icon
            name="search"
            size={20}
            color="gray"
            style={styles.inputLeftIcon}
          />
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search movie"
          />
          {/* Clear icon inside the input on the right */}
          {isSearch ? (
            <TouchableOpacity
              onPress={() => {
                if (searchText) {
                  setSearchText("");
                } else {
                  setIsSearch(false);
                }
              }}
            >
              <IconFeather
                name="x"
                size={20}
                color="gray"
                style={styles.clearIcon}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      ) : (
        <Text style={styles.headerTitle}>Watch</Text>
      )}
      {!isSearch && (
        <TouchableOpacity onPress={() => setIsSearch(true)}>
          <Icon name="search" size={24} color="gray" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {isSearch && searchText ? (
        renderSearchResults()
      ) : isSearch && !searchText ? (
        <Search />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListFooterComponent={<View style={styles.listFooter} />}
        />
      )}
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
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    position: "relative",
    overflow: "hidden",
    borderRadius: 16,
  },
  poster: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  overlayTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 15,
    marginLeft: 10,
    fontSize: 16,
  },
  inputLeftIcon: {
    marginRight: 10,
  },
  clearIcon: {
    marginLeft: 10,
  },
  resultsContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  resultsList: {
    paddingBottom: 16,
  },
  resultCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    height: 115,
  },
  resultImage: {
    width: 110,
    height: 110,
    borderRadius: 8,
    marginRight: 10,
  },
  resultDetails: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  releaseDate: {
    fontSize: 14,
  },
});
