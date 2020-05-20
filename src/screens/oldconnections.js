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
import { HomeHeader } from '../components/HeaderControl';
import { PinDialog } from '../components/Devices/PinDialog';
import { height, width, theme } from '../themes';
import Background from '../images/background/launch_screen.png';

import { methods, BleData } from '../ble';
const {
  connect,
  getSvcs,
  pairWithPin,
  saveAsyncBag,
  writeMessage,
  findAsyncBag,
} = methods;

const fakeMessage = {
  pin: '1003-123456',
  message: 'Hey Chen!!',
  color: '#fe91ed',
  speed: 25,
  direction: 2,
  brightness: 25,
};

const fakePacket = [
  { char: 'pin', data: '1003-123456' },
  { char: 'message', data: 'HEY CHEN!!' },
  { char: 'color', data: '#fe91ed' },
  { char: 'speed', data: 50 },
  { char: 'direction', data: 1 },
  { char: 'brightness', data: 25 },
];

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
`;

const Row = styled.View`
  margin: 10px;
`;

const RowTitle = styled.Text`
  font-size: 20;
  text-align: center;
  color: #333333;
  padding: 10px;
`;

const RowSubtitle = styled.Text`
  font-size: 14;
  text-align: center;
  color: #333333;
  padding: 2px;
  padding-bottom: 20px;
`;

const BtnBasic = styled.TouchableOpacity`
  margin: 20px;
  padding: 20px;
  background-color: #cccccc;
`;

const Btn = styled(BtnBasic)`
  margin-top: 0px;
`;

const BtnOne = styled(BtnBasic)`
  margin-top: 40px;
`;

class BLEMang extends Component {
  constructor() {
    super();

    this.state = {
      scanning: false, // TODO: CONNECTIONS
      peripherals: new Map(), // TODO: TOP LEVEL
      paired: {}, // TODO: TOP LEVEL
      appState: '', // TODO: TOP LEVEL
      pin: '',
      bagId: '',
      pinDialog: false,
      // TODO: TOP LEVEL ( bagId, pin, svcUUID )( updateBag & id, pair(), getsvcs, disconnect, checkconnected, writePin-reconnect(w/pin) )
      // todo: connections ( save async bag & id, pipndialogstate, scan, discover )
      // todo: home ( grabsync bag & id, writeAll, getconnected )
    };
    // TODO: TOP LEVEL
    this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(
      this,
    );
    this.handleAppStateChange = this.handleAppStateChange.bind(this);

    // TODO: CONNECTIONS
    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
    this.handleStopScan = this.handleStopScan.bind(this);

    // TODO: HOME
    this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(
      this,
    );
  }

  componentDidMount() {
    // TODO: TOP LEVEL
    findAsyncBag();
    console.log(`state: ${JSON.stringify(this.state)}`);
    console.log(`Ble ${JSON.stringify(this.props.Ble)}`);
    console.log(`bag ${this.props.bag}`);
    console.log(`getBag ${this.props.getBag}`);
    console.log(`updateBag ${this.props.updateBag}`);
    console.log(`connected ${this.props.connected}`);
    console.log(`updateConnected ${this.props.updateConnected}`);
    console.log(`periphs ${this.props.periphs}`);
    console.log(`updatePeriphs ${this.props.updatePeriphs}`);
    console.log(`reconnect ${this.props.reconnect}`);
    AppState.addEventListener('change', this.handleAppStateChange);
    BleManager.start({
      showAlert: false,
    });
    this.handlerDisconnect = bleManagerEmitter.addListener(
      'BleManagerDisconnectPeripheral',
      this.handleDisconnectedPeripheral,
    );
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ).then(result => {
        if (result) {
          console.log('Permission is OK');
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          ).then(res => {
            if (res) {
              console.log('User accept');
            } else {
              console.log('User refuse');
            }
          });
        }
      });
    }

    // TODO: CONNECTIONS
    this.handlerDiscover = bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      this.handleDiscoverPeripheral,
    );
    this.handlerStop = bleManagerEmitter.addListener(
      'BleManagerStopScan',
      this.handleStopScan,
    );

    // TODO: HOME
    this.handlerUpdate = bleManagerEmitter.addListener(
      'BleManagerDidUpdateValueForCharacteristic',
      this.handleUpdateValueForCharacteristic,
    );
  }

  // TODO: TOP LEVEL
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
    // TODO: TOP LEVEL
    this.handlerDisconnect.remove();

    // TODO: CONNECTIONS
    this.handlerDiscover.remove();
    this.handlerStop.remove();

    // TODO: HOME
    this.handlerUpdate.remove();
  }

  // TODO: TOP LEVEL
  handleDisconnectedPeripheral(data) {
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

  // TODO: CONNECTIONS
  handleStopScan() {
    console.log('Scan is stopped');
    this.setState({
      scanning: false,
    });
  }
  startScan() {
    if (!this.state.scanning) {
      //this.setState({peripherals: new Map()});
      BleManager.scan([], 3, true).then(results => {
        console.log('Scanning...');
        this.setState({
          scanning: true,
        });
      });
    }
  }
  retrieveDiscovered() {
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

  // TODO: HOME
  handleUpdateValueForCharacteristic(data) {
    console.log(
      'Received data from ' +
        data.peripheral +
        ' characteristic ' +
        data.characteristic,
      data.value,
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
        writeMessage(id, fakePacket);
      })
      .catch(e => {
        console.log(`failed somewhere: ${e}`);
      });
    this.props.updateBag(id, pin).then(() => {
      this.hideDialog();
      this.props.navigation.navigate('home');
    });
  }

  // TODO: CONNECTIONS
  renderItem(item) {
    if (!item) {
      return (
        <View>
          <Text>None</Text>
        </View>
      );
    }
    if (
      !item.name.includes('type your reply') &&
      !item.name.includes('Type your reply')
    ) {
      return <View />;
    } else {
      const color = item.connected ? 'green' : '#fff';
      return (
        <TouchableHighlight
          onPress={() =>
            item.connected ? this.submitPin() : this.showDialog(item.id)
          }>
          <View
            style={[
              styles.row,
              {
                backgroundColor: color,
              },
            ]}>
            <Text
              style={{
                fontSize: 12,
                textAlign: 'center',
                color: '#333333',
                padding: 10,
              }}>
              {item.name}
            </Text>
            <Text
              style={{
                fontSize: 10,
                textAlign: 'center',
                color: '#333333',
                padding: 2,
              }}>
              RSSI: {item.rssi}
            </Text>
            <Text
              style={{
                fontSize: 8,
                textAlign: 'center',
                color: '#333333',
                padding: 2,
                paddingBottom: 20,
              }}>
              {item.id}
            </Text>
            <Text
              style={{
                fontSize: 6,
                textAlign: 'center',
                color: '#aaaaaa',
                padding: 2,
                paddingBottom: 5,
              }}>
              {JSON.stringify(item)}
            </Text>
          </View>
        </TouchableHighlight>
      );
    }
  }
  render() {
    const list = Array.from(this.state.peripherals.values());
    const { pinDialog, pin } = this.state;
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
          <TouchableHighlight
            style={{
              marginTop: 40,
              margin: 20,
              padding: 20,
              backgroundColor: '#ccc',
            }}
            onPress={() => this.startScan()}>
            <Text> Scan Bluetooth({this.state.scanning ? 'on' : 'off'}) </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{
              marginTop: 0,
              margin: 20,
              padding: 20,
              backgroundColor: '#ccc',
            }}
            onPress={() => this.retrieveConnected()}>
            <Text> Retrieve connected peripherals </Text>
          </TouchableHighlight>
          {pinDialog && (
            <PinDialog
              visible={pinDialog}
              pin={pin}
              updatePin={pin => this.updatePin(pin)}
              submit={() => this.submitPin(this.state.bagId, pin)}
              // submit={() => this.connectToBag(bagId, bags, pin, this.props.navigation.navigate)}
              close={() => this.hideDialog()}
            />
          )}
          {list.length != 0 && (
            <View style={styles.scroll}>
              <FlatList
                data={list}
                renderItem={({ item }) => this.renderItem(item)}
                keyExtractor={item => item.id}
              />
            </View>
          )}
          {list.length === 0 && (
            <View>
              <View
                style={{
                  flex: 1,
                  margin: 20,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                  }}>
                  No peripherals
                </Text>
              </View>
              <View>
                <Text>
                  periphs: {Array.from(this.state.peripherals.values())}
                  ...paired: {JSON.stringify(this.state.paired)}
                </Text>
              </View>
            </View>
          )}
        </Backdrop>
      </Page>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    width: window.width,
    height: window.height,
  },
  scroll: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    margin: 10,
  },
  row: {
    margin: 10,
  },
});

export default BLEMang;
