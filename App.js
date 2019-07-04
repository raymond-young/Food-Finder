import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LoginScreenFood } from "./screens/LoginScreenFood/LoginScreenFood";
import { MapScreenFood } from "./screens/MapScreenFood/MapScreenFood";
import { SwipeScreenFood } from "./screens/SwipeScreenFood/SwipeScreenFood";
import { ReviewScreenFood } from "./screens/ReviewScreenFood/ReviewScreenFood";
import { createBottomTabNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import { AppProvider } from './AppProvider';
import { StatusBar } from 'react-native';

const TabNavigator = createBottomTabNavigator({
  map: MapScreenFood,
  swipe: SwipeScreenFood,
  review: ReviewScreenFood
});

const MainNavigator = createSwitchNavigator({
  auth: LoginScreenFood,
  main: TabNavigator
}, {
  initialRouteName: "auth"
})

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
componentDidMount(){
  StatusBar.setHidden(true);
  // StatusBar.setTranslucent(true);
}

  render() {
    return (
      <AppProvider>
        <AppContainer />
      </AppProvider>
    );
  }
}

