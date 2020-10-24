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
import styled from 'styled-components/native';
import { theme, width, height } from './src/themes';
import Background from './src/images/background/launch_screen_new.png';

console.disableYellowBox = true;

const Backdrop = styled.ImageBackground`
  height: ${height}px;
  width: ${width}px;
  top: 0px;
  left: 0px;
`;

const Telekom = (props: any) => {
  // const [appState, setAppState] = useState('');

  useEffect(() => {
    getPerms();
    start();
    console.log('ble context: ', JSON.stringify(props.BleState));
  });

  return (
    <BleProvider>
      <Backdrop source={Background}>
        <App />
      </Backdrop>
    </BleProvider>
  );
};
AppRegistry.registerComponent(appName, () => Telekom);
