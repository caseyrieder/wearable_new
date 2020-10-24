/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  AppState,
  FlatList,
} from 'react-native';
import styled from 'styled-components/native';
import BleManager from 'react-native-ble-manager';
import { Page } from '../components/Base';
import DeviceButton from '../components/Devices/Button';
import { PageHeader } from '../components/HeaderControl';
import { PinDialog } from '../components/Devices/PinDialog';
import { ScanDialog } from '../components/Devices/ScanDialog';
import { DevicesDialog } from '../components/Devices/DevicesDialog';
import { height, width, theme } from '../themes';
import { withNavigation } from 'react-navigation';
import { methods } from '../ble';

const { start, connect, getSvcs, pairWithPin, findAsyncBag } = methods;

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

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

type ConnectionProps = {
  navigation: any;
  updatePeriphs: any;
  updateConnected: any;
  updateBag: any;
};

interface ConnectionState {
  scanning: boolean;
  found: boolean;
  peripherals: Map<string, any>;
  paired: any;
  appState: string;
  pin: string;
  bagId: string;
  pinDialog: boolean;
}

class Connection extends Component<ConnectionProps, ConnectionState> {
  handlerDiscover: any;
  handlerStop: any;
  handlerUpdate: any;

  constructor(props: ConnectionProps) {
    super(props);

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
    this.handlerUpdate = bleManagerEmitter.addListener(
      'BleManagerDidUpdateValueForCharacteristic',
      this.handleUpdateValueForCharacteristic,
    );

    this.scan();
  }

  handleAppStateChange(nextAppState: any) {
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

  handleUpdateValueForCharacteristic(data: any) {
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
      BleManager.scan([], 3, true).then((results: any) => {
        console.log('Scanning...');
        console.log('results:', results);
        this.setState({ scanning: true });
      });
    }
  }

  getDiscovered() {
    BleManager.getDiscoveredPeripherals([]).then(discovered => {
      if (discovered.length === 0) {
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

  handleDiscoverPeripheral(peripheral: any) {
    var peripherals = this.state.peripherals;
    console.log('Got ble peripheral', peripheral);
    if (!peripheral.name) {
      peripheral.name = 'NO NAME';
    }
    peripherals.set(peripheral.id, peripheral);
    this.setState({
      peripherals,
      found: true,
    });
  }

  valueUpdater(data: any) {
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
        this.setState({
          peripherals,
        });
      }
    });
  }

  updatePin(pin: string) {
    this.setState({
      pin,
    });
  }

  showDialog(id: string) {
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
    this.setState({
      pinDialog: false,
    });
  }

  submitPin(id: string, pin: string) {
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

  renderItem(item: any) {
    return (
      <DeviceButton
        item={item}
        showDialog={(id: string = item.id) => this.showDialog(id)}
      />
    );
  }

  renderDialog() {
    let list = Array.from(this.state.peripherals.values());
    let pD = this.state.pinDialog;
    if (pD) {
      return (
        <PinDialog
          visible={pD}
          pin={this.state.pin}
          updatePin={(pin: string) => this.updatePin(pin)}
          submit={() => this.submitPin(this.state.bagId, this.state.pin)}
          close={() => this.hideDialog()}
        />
      );
    } else if (this.state.scanning || list.length != 0) {
      return (
        <DevicesDialog
          visible={this.state.found || this.state.scanning}
          connect={(id: string) => this.showDialog(id)}
          devices={list}
        />
      );
    } else {
      return (
        <ScanDialog visible={pD ? false : true} scan={() => this.scan()} />
      );
    }
  }

  render() {
    const list = Array.from(this.state.peripherals.values());
    const { pinDialog, pin, scanning, found } = this.state;
    return (
      <Page>
        <PageHeader title="" />
        {this.renderDialog()}
        {/* <ScanDialog
          visible={pinDialog && !scanning ? false : true}
          scan={() => this.scan()}
        /> */}
        {/* {pinDialog && (
          <PinDialog
            visible={pinDialog}
            pin={pin}
            updatePin={(pin: string) => this.updatePin(pin)}
            submit={() => this.submitPin(this.state.bagId, pin)}
            close={() => this.hideDialog()}
          />
        )} */}
        {/* {list.length != 0 && (
          <DevicesDialog
            visible={found}
            connect={(id: string) => this.showDialog(id)}
            devices={list}
          />
        )} */}
        {/* {list.length != 0 && (
          <DevicesList>
            <FlatList
              data={list}
              renderItem={({ item }) => this.renderItem(item)}
              keyExtractor={item => item.id}
            />
          </DevicesList>
        )} */}
      </Page>
    );
  }
}

export default withNavigation(Connection);
