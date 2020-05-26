/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  AppState,
  FlatList,
  Dimensions,
  Text,
} from 'react-native';
import styled from 'styled-components/native';
import BleManager from 'react-native-ble-manager';
import { Page } from '../components/Base';
import DeviceButton from '../components/Devices/Button';
import { ConnectionHeader } from '../components/HeaderControl';
import { PinDialog } from '../components/Devices/PinDialog';
import { height, width, theme } from '../themes';
import Background from '../images/background/launch_screen.png';
import { withNavigation } from 'react-navigation';

import { methods, BleData } from '../ble';
const {
  start,
  connect,
  getSvcs,
  pairWithPin,
  findAsyncBag,
  getPerms,
  disconnect,
} = methods;

const window = Dimensions.get('window');

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const Backdrop = styled.ImageBackground`
  height: ${height}px;
  width: ${width}px;
  top: 0px;
  left: 0px;
`;

const DevicesHeader = styled.View`
  margin-top: -20px;
  height: ${height * 0.2}px;
  background-color: transparent;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DevicesTitle = styled.Text`
  text-transform: uppercase;
  text-align: center;
  font-size: ${width / 16}px;
  color: ${theme.colors.grey.light};
  font-family: SuisseIntlMono;
  letter-spacing: 0.8px;
`;

const DevicesSubTitle = styled.Text`
  padding-top: 15px;
  font-size: ${width / 25}px;
  color: ${theme.colors.grey.light};
  font-family: SuisseIntlMono;
  letter-spacing: 2;
`;

const ScanButton = styled.TouchableOpacity`
  left: ${width * 0.3}px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${width * 0.4}px;
  height: ${height * 0.05}px;
  background-color: ${theme.colors.accent.main};
  border-color: ${theme.colors.primary.dark};
  border-width: 2px;
  border-radius: 15px;
  top: ${height * 0.6}px;
`;

const DevicesList = styled.View`
  margin-top: 20px;
  width: ${width}px;
  background-color: transparent;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const BtnTitle = styled.Text`
  font-size: 20px;
  text-align: center;
  font-family: SuisseIntlMono;
  color: ${theme.colors.black.main};
  padding: 10px;
`;

class Connection extends Component {
  constructor() {
    super();

    this.state = {
      scanning: false,
      peripherals: new Map(),
      paired: {},
      appState: '',
      pin: '',
      bagId: '',
      pinDialog: false,
    };
    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
    this.handleStopScan = this.handleStopScan.bind(this);
    this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(
      this,
    );
    // this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(
    // this,
    // );
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }

  componentDidMount() {
    console.log(`props: ${JSON.stringify(this.props.navigation)}`);
    findAsyncBag();
    AppState.addEventListener('change', this.handleAppStateChange);
    // disconnect('C4:4F:33:16:C3:47');
    start();

    this.handlerDiscover = bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      this.handleDiscoverPeripheral,
    );
    this.handlerStop = bleManagerEmitter.addListener(
      'BleManagerStopScan',
      this.handleStopScan,
    );
    // this.handlerDisconnect = bleManagerEmitter.addListener(
    //   'BleManagerDisconnectPeripheral',
    //   this.handleDisconnectedPeripheral,
    // );
    this.handlerUpdate = bleManagerEmitter.addListener(
      'BleManagerDidUpdateValueForCharacteristic',
      this.handleUpdateValueForCharacteristic,
    );

    this.scan();
  }

  handleAppStateChange(nextAppState) {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
      BleManager.getConnectedPeripherals([]).then(peripheralsArray => {
        console.log('Connected peripherals: ' + peripheralsArray.length);
      });
    }
    this.setState({ appState: nextAppState });
  }

  componentWillUnmount() {
    this.handlerDiscover.remove();
    this.handlerStop.remove();
    // this.handlerDisconnect.remove();
    this.handlerUpdate.remove();
  }

  // handleDisconnectedPeripheral(data) {
  //   let peripherals = this.state.peripherals;
  //   let peripheral = peripherals.get(data.peripheral);
  //   if (peripheral) {
  //     peripheral.connected = false;
  //     peripherals.set(peripheral.id, peripheral);
  //     this.setState({ peripherals });
  //   }
  //   console.log('Disconnected from ' + data.peripheral);
  // }

  handleUpdateValueForCharacteristic(data) {
    const { peripheral, characteristic, value } = data;
    console.log(
      `Got data from ${peripheral} characteristic ${characteristic}, ${value}`,
    );
  }

  handleStopScan() {
    console.log('Scan is stopped');
    this.setState({ scanning: false });
  }

  scan() {
    if (!this.state.scanning) {
      BleManager.scan([], 3, true).then(results => {
        console.log('Scanning...');
        this.setState({ scanning: true });
      });
    }
  }

  getDiscovered() {
    BleManager.getDiscoveredPeripherals([]).then(discovered => {
      if (discovered.length == 0) {
        console.log('No discovered peripherals');
      }
      console.log('discovered', discovered);
      var peripherals = this.state.peripherals;
      for (var i = 0; i < discovered.length; i++) {
        var peripheral = discovered[i];
        peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        this.setState({
          peripherals,
        });
      }
    });
  }

  handleDiscoverPeripheral(peripheral) {
    var peripherals = this.state.peripherals;
    console.log('Got ble peripheral', peripheral);
    if (!peripheral.name) {
      peripheral.name = 'NO NAME';
    }
    peripherals.set(peripheral.id, peripheral);
    this.setState({ peripherals });
  }

  valueUpdater(data) {
    const { peripheral, characteristic, value } = data;
    console.log(
      `Got data from ${peripheral} characteristic ${characteristic}, ${value}`,
    );
  }

  retrieveConnected() {
    BleManager.getConnectedPeripherals([]).then(results => {
      if (results.length == 0) {
        console.log('No connected peripherals');
      }
      console.log(results);
      var peripherals = this.state.peripherals;
      for (var i = 0; i < results.length; i++) {
        var peripheral = results[i];
        peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        this.setState({ peripherals });
      }
    });
  }

  updatePin(pin) {
    this.setState({ pin });
  }

  showDialog(id) {
    connect(id)
      .then(() => {
        this.setState({
          pinDialog: true,
          bagId: id,
        });
        this.props.updatePeriphs(this.state.peripherals);
      })
      .catch(e => {
        console.log(`failed to connect ${e}`);
      });
  }

  hideDialog() {
    this.setState({ pinDialog: false });
  }

  submitPin(id, pin) {
    pairWithPin(id, pin)
      .then(() => {
        console.log('paired');
        this.props.updateConnected(true);
      })
      .catch(e => {
        console.log(`pairing fialed: ${e}`);
      });
    getSvcs(id)
      .then(peripheralInfo => {
        console.log(JSON.stringify(peripheralInfo));
      })
      .catch(e => {
        console.log(`failed somewhere: ${e}`);
      });
    this.props.updateBag(id, pin).then(() => {
      this.hideDialog();
      this.props.navigation.navigate('home');
    });
  }

  renderItem(item) {
    return (
      <DeviceButton item={item} showDialog={() => this.showDialog(item.id)} />
    );
  }

  render() {
    const list = Array.from(this.state.peripherals.values());
    const { pinDialog, pin, scanning } = this.state;
    return (
      <Page>
        <Backdrop source={Background}>
          <ConnectionHeader title="" />
          <DevicesHeader>
            <DevicesTitle>Connect your bag{width}</DevicesTitle>
            <DevicesSubTitle>Please find your smart bag</DevicesSubTitle>
            <DevicesSubTitle>named KonigArvida.</DevicesSubTitle>
          </DevicesHeader>
          <ScanButton onPress={() => this.scan()}>
            <BtnTitle>
              {scanning ? 'Scanning...' : 'Scan for more devices'}
            </BtnTitle>
          </ScanButton>
          {pinDialog && (
            <PinDialog
              visible={pinDialog}
              pin={pin}
              updatePin={pin => this.updatePin(pin)}
              submit={() => this.submitPin(this.state.bagId, pin)}
              close={() => this.hideDialog()}
            />
          )}
          {list.length != 0 && (
            <DevicesList>
              <FlatList
                data={list}
                renderItem={({ item }) => this.renderItem(item)}
                keyExtractor={item => item.id}
              />
            </DevicesList>
          )}
        </Backdrop>
      </Page>
    );
  }
}

export default withNavigation(Connection);
