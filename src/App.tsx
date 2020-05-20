import React, { Fragment } from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
// import { Transition } from 'react-native-reanimated';
import { BleContext } from './context';

import AboutScreen from './screens/about';
import ConnectionScreen from './screens/connection';
import HomeScreen from './screens/home';
import SettingsScreen from './screens/settings';

// const AppNavigator = createAnimatedSwitchNavigator(

const Home = () => (
  <BleContext.Consumer>
    {({ Ble, bag, getBag, connected, updateConnected, periphs, reconnect }) => (
      <HomeScreen
        // Ble={Ble}
        bag={bag}
        getBag={getBag}
        connected={connected}
        updateConnected={updateConnected}
        periphs={periphs}
        reconnect={reconnect}
      />
    )}
  </BleContext.Consumer>
);

const Connection = () => (
  <BleContext.Consumer>
    {({ Ble, updateBag, updateConnected, updatePeriphs }) => (
      <ConnectionScreen
        // Ble={Ble}
        updateBag={updateBag}
        updateConnected={updateConnected}
        updatePeriphs={updatePeriphs}
      />
    )}
  </BleContext.Consumer>
);

const AppNavigator = createSwitchNavigator(
  {
    about: AboutScreen,
    connection: Connection,
    home: Home,
    settings: SettingsScreen,
  },
  {
    initialRouteName: 'home',
    backBehavior: 'history',
  },
);

export default createAppContainer(AppNavigator);
