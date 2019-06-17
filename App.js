import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LoginScreen } from "./screens/LoginScreen/LoginScreen";
import { MapScreen } from "./screens/MapScreen/MapScreen";
import { MapScreenFood } from "./screens/MapScreenFood/MapScreenFood";
import { SwipeScreen } from "./screens/SwipeScreen/SwipeScreen";
import { SwipeScreenFood } from "./screens/SwipeScreenFood/SwipeScreenFood";
import { ReviewScreen } from "./screens/ReviewScreen/ReviewScreen";
import { createBottomTabNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import { AppProvider } from './AppProvider';

const TabNavigator = createBottomTabNavigator({
  map: MapScreenFood,
  swipe: SwipeScreenFood,
  review: ReviewScreen
});

const MainNavigator = createSwitchNavigator({
  auth: LoginScreen,
  main: TabNavigator
}, {
  initialRouteName: "auth"
})

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    return (
      <AppProvider>
        <AppContainer />
      </AppProvider>
    );
  }
}

