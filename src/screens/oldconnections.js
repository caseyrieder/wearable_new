/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  NativeAppEventEmitter,
  NativeEventEmitter,
  NativeModules,
  Platform,
  PermissionsAndroid,
  AppState,
  FlatList,
  Dimensions,
} from 'react-native';
import styled from 'styled-components/native';
import BleManager from 'react-native-ble-manager';
import { Page } from '../components/Base';
import DeviceButton from '../components/Devices/Button';
import { PinDialog } from '../components/Devices/PinDialog';
import { height, width, theme } from '../themes';
import Background from '../images/background/launch_screen.png';

import { methods, BleData } from '../ble';
const { connect, getSvcs, pairWithPin, findAsyncBag } = methods;

const window = Dimensions.get('window');

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const Backdrop = styled.ImageBackground`
  height: ${height}px;
  width: ${width}px;
  top: 0px;
  left: 0px;
`;

const TitleBox = styled.View`
  height: ${height / 8};
  align-items: center;
  padding: 20px;
  justify-content: flex-start;
`;
const TitleText = styled.Text`
  font-size: 20px;
  color: #ffffff;
`;

const DevicesHeader = styled.View`
  height: ${height * 0.25}px;
  background-color: transparent;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DevicesTitle = styled.Text`
  text-transform: uppercase;
  text-align: center;
  font-size: 35px;
  color: ${theme.colors.grey.light};
  font-family: SuisseIntlMono;
`;

const DevicesSubTitle = styled.Text`
  padding-top: 20px;
  font-size: 20px;
  color: ${theme.colors.grey.light};
  font-family: SuisseIntlMono;
  text-transform: uppercase;
`;

const ScanButton = styled.TouchableOpacity`
  left: ${width * 0.15}px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${width * 0.7}px;
  height: ${height * 0.075}px;
  background-color: ${theme.colors.primary.dark};
  border-color: #81f7fd;
  border-width: 2px;
  border-radius: 15px;
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

class BLEMang extends Component {
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
    this.disconnector = this.disconnector.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.discoverBag = this.discoverBag.bind(this);
    this.stop = this.stop.bind(this);
    this.valueUpdater = this.valueUpdater.bind(this);
  }

  componentDidMount() {
    findAsyncBag();
    // console.log(`state: ${JSON.stringify(this.state)}`);
    // console.log(`Ble ${JSON.stringify(this.props.Ble)}`);
    // console.log(`bag ${this.props.bag}`);
    // console.log(`getBag ${this.props.getBag}`);
    // console.log(`updateBag ${this.props.updateBag}`);
    // console.log(`connected ${this.props.connected}`);
    // console.log(`updateConnected ${this.props.updateConnected}`);
    // console.log(`periphs ${this.props.periphs}`);
    // console.log(`updatePeriphs ${this.props.updatePeriphs}`);
    // console.log(`reconnect ${this.props.reconnect}`);
    AppState.addEventListener('change', this.handleAppStateChange);
    this.startScan();
    this.handlerDisconnect = bleManagerEmitter.addListener(
      'BleManagerDisconnectPeripheral',
      this.disconnector,
    );

    this.discoverer = bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      this.discoverBag,
    );
    this.handlerStop = bleManagerEmitter.addListener(
      'BleManagerStopScan',
      this.stop,
    );

    this.handlerUpdate = bleManagerEmitter.addListener(
      'BleManagerDidUpdateValueForCharacteristic',
      this.valueUpdater,
    );
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
    this.setState({
      appState: nextAppState,
    });
  }

  componentWillUnmount() {
    this.handlerDisconnect.remove();
    this.discoverer.remove();
    this.handlerStop.remove();
    this.handlerUpdate.remove();
  }

  disconnector(data) {
    let peripherals = this.state.peripherals;
    let peripheral = peripherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      peripherals.set(peripheral.id, peripheral);
      this.setState({
        peripherals,
        paired: {},
      });
    }
    console.log('Disconnected from ' + data.peripheral);
  }

  stop() {
    console.log('Scan is stopped');
    this.setState({
      scanning: false,
    });
  }

  startScan() {
    if (!this.state.scanning) {
      BleManager.scan([], 3, true).then(results => {
        console.log('Scanning...');
        this.setState({
          scanning: true,
        });
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

  discoverBag(peripheral) {
    var peripherals = this.state.peripherals;
    console.log('Got ble peripherals, total:');
    var jsonifiedMap = JSON.stringify(Array.from(peripherals));
    console.log(jsonifiedMap);
    if (peripheral.name) {
      console.log('Named: ', peripheral);
    }
    if (!peripheral.name) {
      peripheral.name = 'NO NAME';
    }

    peripherals.set(peripheral.id, peripheral);
    this.setState({
      peripherals,
    });
  }

  valueUpdater(data) {
    const { peripheral, characteristic, value } = data;
    console.log(
      `Got data from ${peripheral} characteristic ${characteristic}, ${value}`,
    );
  }

  retrieveConnected() {
    BleManager.getConnectedPeripherals([]).then(res => {
      if (res.length === 0) {
        console.log('No connected bags');
      }
      console.log(res);
      var peripherals = this.state.peripherals;
      for (var i = 0; i < res.length; i++) {
        var peripheral = res[i];
        peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        this.setState({
          peripherals,
        });
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
    return <DeviceButton item={item} showDialog={this.showDialog(item.id)} />;
  }

  render() {
    const list = Array.from(this.state.peripherals.values());
    const { pinDialog, pin, scanning } = this.state;
    return (
      <Page>
        <Backdrop source={Background}>
          <TitleBox>
            <TitleText>type your reply</TitleText>
          </TitleBox>
          <DevicesHeader>
            <DevicesTitle>Connect your bag</DevicesTitle>
            <DevicesSubTitle>
              Please find your smart bag named KonigArvida.
            </DevicesSubTitle>
          </DevicesHeader>
          <ScanButton onPress={() => this.startScan()}>
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

export default BLEMang;
