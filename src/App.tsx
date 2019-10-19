import React, { Fragment } from 'react';
import { SafeAreaView, ScrollView, View, Text, StatusBar } from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
// import { Transition } from 'react-native-reanimated';

import AboutScreen from './screens/about';
import ConnectionScreen from './screens/connection';
import HomeScreen from './screens/home';
import SettingsScreen from './screens/settings';

const AppNavigator = createAnimatedSwitchNavigator(
  // const AppNavigator = createSwitchNavigator(
  {
    about: AboutScreen,
    connection: ConnectionScreen,
    home: HomeScreen,
    settings: SettingsScreen,
  },
  {
    initialRouteName: 'connection',
    backBehavior: 'history',
  },
);

export default createAppContainer(AppNavigator);
