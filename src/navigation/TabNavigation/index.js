import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DashboardScreen from '../../screens/DashboardScreen';
import MoviesStackNavigator from '../StackNavigation';
import MediaLibrary from '../../screens/MediaLibrary';
import More from '../../screens/More';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const getTabBarStyle = (route) => {
    // Get the current focused route name
    const routeName = getFocusedRouteNameFromRoute(route) || 'Movies';

    // Hide tab bar for MovieDetail
    if (routeName === 'MovieDetail') {
      return { display: 'none' };
    }
    return {
      backgroundColor: '#201e3b',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      height: 67,
      position: 'absolute',
      borderTopWidth: 0,
      marginHorizontal: 5,
    };
  };

  return (
    <Tab.Navigator
      initialRouteName="Movies"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let IconComponent;

          if (route.name === 'dashboard') {
            IconComponent = MaterialIcons;
            iconName = 'dashboard';
          } else if (route.name === 'Movies') {
            IconComponent = FontAwesome;
            iconName = 'youtube-play';
          } else if (route.name === 'library') {
            IconComponent = Ionicons;
            iconName = focused ? 'library-sharp' : 'library-outline';
          } else if (route.name === 'more') {
            IconComponent = FontAwesome;
            iconName = 'bars';
          }

          return <IconComponent name={iconName} size={focused ? 30 : 25} color={color} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: getTabBarStyle(route),
      })}
    >
      <Tab.Screen name="dashboard" component={DashboardScreen} options={{ title: 'Dashboard' }} />
      <Tab.Screen name="Movies" component={MoviesStackNavigator} options={{ title: 'Watch' }} />
      <Tab.Screen name="library" component={MediaLibrary} options={{ title: 'Media Library' }} />
      <Tab.Screen name="more" component={More} options={{ title: 'More' }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
