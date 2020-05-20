/**
 * @format
 */

import React, { useEffect, useState } from 'react';
import { AppRegistry, AppState } from 'react-native';

import App from './src/App';
import { name as appName } from './app.json';
import { BleProvider } from './src/context';
import { handlers, methods } from './src/ble';
// const { changeAppSt } = handlers;
const { getPerms, start } = methods;

const Telekom = (props: any) => {
  // const [appState, setAppState] = useState('');

  useEffect(() => {
    getPerms();
    start();
    console.log('ble context: ', JSON.stringify(props.BleState));
  });

  return (
    <BleProvider>
      <App />
    </BleProvider>
  );
};
AppRegistry.registerComponent(appName, () => Telekom);
