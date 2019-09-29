import React, { Fragment } from 'react';
import { SafeAreaView, ScrollView, View, Text, StatusBar } from 'react-native';

import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
// import { Transition } from 'react-native-reanimated';

import HomeScreen from './screens/home';
import SettingsScreen from './screens/settings';

const AppNavigator = createAnimatedSwitchNavigator(
  {
    Home: HomeScreen,
    Settings: SettingsScreen,
  },
  {
    initialRouteName: 'Settings',
    backBehavior: 'history',
  },
);

export default createAppContainer(AppNavigator);
