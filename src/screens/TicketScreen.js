import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const TicketScreen = ({ route, navigation }) => {
  const { movieTitle, releaseDate } = route.params.data; // Extract movie details

  const [selectedDate, setSelectedDate] = useState("5 Mar");
  const [selectedTime, setSelectedTime] = useState(null);

  const dates = ["5 Mar", "6 Mar", "7 Mar", "8 Mar", "9 Mar"];
  const times = [
    {
      time: "12:30",
      hall: "Cinetech + Hall 1",
      price: "50$",
      bonus: "2500 bonus",
    },
    {
      time: "13:30",
      hall: "Cinetech + Hall 2",
      price: "75$",
      bonus: "3000 bonus",
    },
  ];

  // Render date buttons
  const renderDate = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.dateButton,
        selectedDate === item && styles.selectedDateButton,
      ]}
      onPress={() => setSelectedDate(item)}
      accessibilityLabel={`Select date: ${item}`}
    >
      <Text
        style={[
          styles.dateText,
          selectedDate === item && styles.selectedDateText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  // Render time slots
  const renderTime = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.timeSlot,
        selectedTime === item.time && styles.selectedTimeSlot,
      ]}
      onPress={() => setSelectedTime(item.time)}
      accessibilityLabel={`Select time: ${item.time} at ${item.hall}`}
    >
      <Text style={styles.timeText}>{item.time}</Text>
      <Text style={styles.hallText}>{item.hall}</Text>
      <Text style={styles.priceText}>
        From {item.price} or {item.bonus}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
        >
          <Icon name="chevron-back" color="#000" size={32} />
        </TouchableOpacity>
        <Text style={styles.movieTitle} numberOfLines={1}>
          {movieTitle}
        </Text>
        <View style={styles.placeholderIcon} />
      </View>

      {/* Movie Info */}
      <Text style={styles.releaseDate}>In Theaters {releaseDate}</Text>

      {/* Date Selector */}
      <Text style={styles.sectionTitle}>Date</Text>
      <FlatList
        data={dates}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderDate}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.dateList}
      />

      {/* Time Slots */}
      <FlatList
        data={times}
        showsVerticalScrollIndicator={false}
        renderItem={renderTime}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.timeList}
      />

      {/* Select Seats Button */}
      <TouchableOpacity
        style={[
          styles.selectSeatsButton,
          !selectedTime && styles.disabledButton,
        ]}
        disabled={!selectedTime}
        accessibilityLabel="Select seats button"
      >
        <Text style={styles.selectSeatsButtonText}>Select Seats</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TicketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 16,
    paddingHorizontal: 12,
  },
  movieTitle: {
    fontSize: 20,
    fontFamily: "CustomFont-Bold",
    color: "#000",
    flex: 1,
    textAlign: "center",
    marginHorizontal: 8,
  },
  placeholderIcon: {
    width: 24,
  },
  headerContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  releaseDate: {
    fontSize: 14,
    color: "#9C27B0",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 12,
    paddingHorizontal: 12,
  },
  dateList: {
    marginBottom: 20,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  dateButton: {
    padding: 12,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedDateButton: {
    backgroundColor: "#007BFF",
  },
  dateText: {
    fontSize: 14,
    color: "#333",
  },
  selectedDateText: {
    color: "#fff",
  },
  timeList: {
    marginBottom: 20,
  },
  timeSlot: {
    marginVertical: 12,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#F9F9F9",
  },
  selectedTimeSlot: {
    borderColor: "#007BFF",
    backgroundColor: "#E3F2FD",
  },
  timeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  hallText: {
    fontSize: 14,
    color: "#757575",
    marginVertical: 4,
  },
  priceText: {
    fontSize: 14,
    color: "#333",
  },
  selectSeatsButton: {
    padding: 16,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: "#A0A0A0",
  },
  selectSeatsButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
