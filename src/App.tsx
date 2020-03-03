import React, { Fragment } from 'react';
import { SafeAreaView, ScrollView, View, Text, StatusBar, Button } from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
// import { Transition } from 'react-native-reanimated';

import AboutScreen from './screens/about';
import ConnectionScreen from './screens/connection';
import HomeScreen from './screens/home';
import SettingsScreen from './screens/settings';

// const AppNavigator = createAnimatedSwitchNavigator(

const AppNavigator = createSwitchNavigator(
  {
    about: AboutScreen,
    connection: ConnectionScreen,
    home: HomeScreen,
    settings: SettingsScreen,
  },
  {
    initialRouteName: 'home',
    backBehavior: 'history',
  },
);

export default createAppContainer(AppNavigator);
