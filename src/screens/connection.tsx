/* eslint-disable react-native/no-inline-styles */
import React, { Component, Fragment } from 'react';
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

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const DialogBox = styled.View`
  margin-top: -${height * 0.2}px;
  height: ${height * 0.3}px;
  width: ${width * 0.8}px;
  max-height: 300px;
  background-color: ${theme.colors.grey.light};
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 10px;
`;

const DevicesTitle = styled.Text`
  text-align: center;
  margin-top: 30px;
  font-weight: 500;
  font-size: ${height * 0.025}px;
  color: ${theme.colors.black.dark};
  font-family: helvetica;
  letter-spacing: 1px;
`;

const DevicesSubTitle = styled.Text`
  padding-top: 15px;
  font-size: ${height * 0.023}px;
  color: ${theme.colors.black.dark};
  letter-spacing: 1;
`;

const ScanButton = styled.TouchableOpacity`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DevicesList = styled.View`
  margin-top: 20px;
  width: ${width}px;
  background-color: transparent;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const HorizontalSpacer = styled.View`
  height: 1px;
  background-color: ${theme.colors.grey.main};
  width: 95%;
  margin-top: 30px;
`;

const BtnTitle = styled.Text`
  font-size: ${height * 0.03}px;
  text-align: center;
  font-weight: 600;
  font-family: helvetica;
  color: ${theme.colors.misc.hyperlink};
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
      <Fragment>
        <HorizontalSpacer />
        <DeviceButton
          item={item}
          showDialog={(id: string = item.id) => this.showDialog(id)}
        />
      </Fragment>
    );
  }

  renderDialog(list: any[]) {
    if (list.length !== 0) {
      return (
        <DialogBox>
          {/* <DevicesTitle>Connect Your Device</DevicesTitle> */}
          <DevicesTitle>Select Your Device</DevicesTitle>
          {/* <DevicesSubTitle>Press Scan for your Device</DevicesSubTitle> */}
          <DevicesSubTitle>
            Your device should be named tyr with four digits behind.
          </DevicesSubTitle>
          <FlatList
            data={list}
            renderItem={({ item }) => this.renderItem(item)}
            keyExtractor={item => item.id}
          />
        </DialogBox>
      );
    } else {
      return (
        <DialogBox>
          <DevicesTitle>Connect Your Device</DevicesTitle>
          <DevicesSubTitle>Press Scan for your device</DevicesSubTitle>
          <HorizontalSpacer />
          <ScanButton onPress={() => this.scan()}>
            <BtnTitle>
              {this.state.scanning ? 'Scanning...' : 'Scan for Your Device'}
            </BtnTitle>
          </ScanButton>
        </DialogBox>
      );
    }
  }

  render() {
    const list = Array.from(this.state.peripherals.values());
    let listed = list.length !== 0;
    const { pinDialog, pin, scanning } = this.state;
    return (
      <Page>
        <PageHeader title="" />
        <Container>
          {/* <DialogBox>
            <DevicesTitle>Select Your Device</DevicesTitle>
            <DevicesSubTitle>Your device should be named tyr with four digits behind.</DevicesSubTitle>
            <HorizontalSpacer />
            <ScanButton onPress={() => this.scan()}>
              <BtnTitle>
                {scanning ? 'Scanning...' : 'Scan for Your Device'}
              </BtnTitle>
            </ScanButton>
          </DialogBox> */}
          {pinDialog && (
            <PinDialog
              visible={pinDialog}
              pin={pin}
              updatePin={(pin: string) => this.updatePin(pin)}
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
          {this.renderDialog(list)}
        </Container>
      </Page>
    );
  }
  // render() {
  //   const list = Array.from(this.state.peripherals.values());
  //   const { pinDialog, pin, scanning, found } = this.state;
  //   return (
  //     <Page>
  //       <PageHeader title="" />
  //       {this.renderDialog()}
  //       {/* <ScanDialog
  //         visible={pinDialog && !scanning ? false : true}
  //         scan={() => this.scan()}
  //       /> */}
  //       {/* {pinDialog && (
  //         <PinDialog
  //           visible={pinDialog}
  //           pin={pin}
  //           updatePin={(pin: string) => this.updatePin(pin)}
  //           submit={() => this.submitPin(this.state.bagId, pin)}
  //           close={() => this.hideDialog()}
  //         />
  //       )} */}
  //       {/* {list.length != 0 && (
  //         <DevicesDialog
  //           visible={found}
  //           connect={(id: string) => this.showDialog(id)}
  //           devices={list}
  //         />
  //       )} */}
  //       {/* {list.length != 0 && (
  //         <DevicesList>
  //           <FlatList
  //             data={list}
  //             renderItem={({ item }) => this.renderItem(item)}
  //             keyExtractor={item => item.id}
  //           />
  //         </DevicesList>
  //       )} */}
  //     </Page>
  //   );
  // }
}

export default withNavigation(Connection);
