
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DashboardScreen from "../../screens/DashboardScreen";
import MoviesStackNavigator from "../StackNavigation";
import MediaLibrary from "../../screens/MediaLibrary";
import More from "../../screens/More";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Movies"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let IconComponent;

          // Assign different icons and libraries based on route name
          if (route.name === "dashboard") {
            IconComponent = MaterialIcons;
            iconName = focused ? "dashboard" : "dashboard";
          } else if (route.name === "Movies") {
            IconComponent = FontAwesome;
            iconName = focused ? "youtube-play" : "youtube-play";
          } else if (route.name === "library") {
            IconComponent = Ionicons;
            iconName = focused ? "library-sharp" : "library-outline";
          } else if (route.name === "more") {
            IconComponent = FontAwesome;
            iconName = focused ? "bars" : "bars";
          }

          return <IconComponent name={iconName} size={focused ? 30 : 25} color={color} />;
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarStyle: {
            backgroundColor: "#201e3b", 
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 80, 
            position: "absolute",
            borderTopWidth: 0, 
            marginHorizontal: 5, 
          },
          tabBarIconStyle: {
           marginTop:10,  
          },
          tabBarItemStyle: {
            justifyContent: "center",
            alignItems: "center",    
          },
          tabBarLabelStyle: {
            fontSize: 12,          
            marginTop: 5,       
          },
      })}
    >
      <Tab.Screen
        name="dashboard"
        component={DashboardScreen}
        options={{ title: "Dashboard" }}
      />
      <Tab.Screen
        name="Movies"
        component={MoviesStackNavigator}
        options={{ title: "Watch" }}
      />
      <Tab.Screen
        name="library"
        component={MediaLibrary}
        options={{ title: "Media Library" }}
      />
      <Tab.Screen name="more" component={More} options={{ title: "More" }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
