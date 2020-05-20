import React, { Component } from 'react';
import {
  FlatList,
  NativeAppEventEmitter,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import styled from 'styled-components/native';
import BleManager from 'react-native-ble-manager';
import { theme, height, width } from '../themes';
import { Page } from '../components/Base';
import { HomeHeader } from '../components/HeaderControl';
import { PinDialog } from '../components/Devices/PinDialog';
import { stringToBytes, Uuids, methods } from '../ble';
import LaunchScreen from '../images/background/launch_screen.png';

const BleModule = NativeModules.BleManager;
const bleEmitter = new NativeEventEmitter(BleModule);

const { pinUU } = Uuids;
const { saveAsyncBag, write } = methods;

interface Props {
  navigation: any;
  discoverer: NativeEventEmitter;
  stopper: NativeEventEmitter;
}

interface State {
  scanning: boolean;
  bags: any;
  bagId: string;
  pin: string;
  pinDialog: boolean;
  paired: any;
}

const Background = styled.ImageBackground`
  width: 100%;
  height: 100%;
  z-index: -5;
`;

const Title = styled.Text`
  padding: 30px 0 15px;
  font-size: 20px;
  color: ${theme.colors.grey.light};
  font-family: SuisseIntlMono;
`;

const HeadView = styled.View`
  flex-direction: column;
  width: ${width}px;
  top: ${height / 6}px;
`;

const Header = styled.Text`
  text-transform: uppercase;
  text-align: center;
  font-size: 35px;
  color: ${theme.colors.grey.light};
  font-family: SuisseIntlMono;
`;

const DevicesList = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${theme.colors.grey.light};
  width: ${width}px;
  top: ${height / 3}px;
`;

const Device = styled.TouchableOpacity<{ selected: boolean }>`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${props =>
    props.selected ? theme.colors.primary.dark : 'transparent'};
  border-color: ${props => (props.selected ? '#81F7FD' : 'transparent')};
  border-width: ${props => (props.selected ? 1 : 0)}px;
  height: ${height / 10}px;
`;

const DeviceName = styled.Text`
  font-size: 20px;
  font-family: SuisseIntlMono;
  text-align: center;
  color: ${theme.colors.black.dark};
`;

const BlankDevice = styled.View`
  height: 0px;
  width: ${width}px;
  background-color: transparent;
`;

class Connection extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      scanning: false,
      bags: new Map(),
      bagId: '',
      pin: '',
      pinDialog: false,
      paired: {},
    };
    this.discover = this.discover.bind(this);
    this.saveMyBag = this.saveMyBag.bind(this);
    this.showDialog = this.showDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.stop = this.stop.bind(this);
  }

  scan() {
    if (!this.state.scanning) {
      BleManager.scan([], 5, true).then(results => {
        console.log('Scanning...');
        console.log(results);
        this.setState({
          scanning: true,
        });
      });
    }
    // this.getConnected();
  }

  componentDidMount() {
    // this.discoverer = bleEmitter.addListener("BleManagerDiscoverPeripheral",this.discover);
    // this.stopper = bleEmitter.addListener("BleManagerStopScan",this.stop);
    this.discoverer;
    this.stopper;
    console.log(`log state: ${JSON.stringify(this.state)}`);
    this.scan();
    // this.getConnected();
  }

  discoverer = bleEmitter.addListener(
    'BleManagerDiscoverPeripheral',
    this.discover,
  );
  stopper = bleEmitter.addListener('BleManagerStopScan', this.stop);

  discover(bag: any) {
    var bags = this.state.bags;
    console.log('Got ble bags, total:');
    var jsonifiedMap = JSON.stringify(Array.from(bags));
    console.log(jsonifiedMap);
    if (!bag.name) {
      return;
    } else {
      console.log('Named: ', bag);
    }
    bags.set(bag.id, bag);
    this.setState({ bags });
  }

  getDiscovered() {
    BleManager.getDiscoveredPeripherals([]).then(
      (discovered: string | any[]) => {
        if (discovered.length == 0) {
          console.log('No discovered bags');
        }
        console.log('discovered', discovered);
        var bags = this.state.bags;
        for (var i = 0; i < discovered.length; i++) {
          var bag = discovered[i];
          bag.connected = true;
          bags.set(bag.id, bag);
          this.setState({ bags });
        }
      },
    );
  }

  getConnected() {
    BleManager.getConnectedPeripherals([]).then(results => {
      console.log({ Bags: results });
      let bags = this.state.bags;
      for (var i = 0; i < results.length; i++) {
        var bag = results[i];
        bag.connected = true;
        bags.set(bag.id, bag);
        this.setState({ bags });
      }
    });
  }

  stop() {
    console.log('Scan is stopped');
    this.setState({
      scanning: false,
    });
  }

  showDialog(id: string) {
    this.setState({
      pinDialog: true,
      bagId: id,
    });
  }

  saveMyBag(id: string, pin: string) {
    saveAsyncBag(id, pin)
      .then(() => {
        this.closeDialog();
      })
      .catch(e => console.log(`failed to save bag info to asyncStorage, ${e}`));
  }

  closeDialog() {
    this.setState({ pinDialog: false });
    this.props.navigation.navigate('home');
  }

  submitPin(id: string, pin: string) {
    const pinData = {
      uuid: pinUU,
      data: stringToBytes(pin),
      char: 'pin',
    };
    write(id, pinData);
    this.saveMyBag(id, pin);
  }

  connect(id: string, pin: string) {
    BleManager.connect(id)
      .then(() => {
        let bags = this.state.bags;
        let p = bags.get(id);
        if (p) {
          p.connected = true;
          bags.set(id, p);
          this.setState({
            bags,
            paired: bags[0],
          });
        }
        this.submitPin(id, pin);
      })
      .catch(e => console.log(`failed to connect, ${e}`));
  }

  renderItem(item: any) {
    if (!item) {
      return <BlankDevice />;
    }
    if (!item.name.includes('your reply')) {
      return <BlankDevice />;
    } else {
      return (
        <Device
          selected={item.connected ? true : false}
          onPress={() =>
            item.connected
              ? this.props.navigation.navigate('home')
              : this.showDialog(item.id)
          }>
          <DeviceName> KonigArvida </DeviceName>
        </Device>
      );
    }
  }

  render() {
    const { bags, bagId, pin, pinDialog } = this.state;
    const list = bags.values() ? Array.from(bags.values()) : [];
    return (
      <Page>
        <Background source={LaunchScreen} />
        <HomeHeader
          onPress={() => this.props.navigation.navigate('about')}
          toBLE={() => this.props.navigation.navigate('connection')}>
          <Title>type your reply</Title>
        </HomeHeader>
        <HeadView>
          <Header>CONNECT YOUR BAG</Header>
          <Title>Please find your smart bag named KonigArvida</Title>
        </HeadView>
        {pinDialog && (
          <PinDialog
            visible={pinDialog}
            pin={pin}
            updatePin={(pin: string) => this.setState({ pin })}
            submit={() => this.connect(bagId, pin)}
            close={() => this.closeDialog()}
          />
        )}
        <DevicesList>
          <FlatList
            contentInsetAdjustmentBehavior="never"
            data={list}
            renderItem={({ item }) => this.renderItem(item)}
            keyExtractor={item => item.id}
          />
        </DevicesList>
      </Page>
    );
  }
}

export default Connection;

// export class Scanner extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       scanning: false,
//       bleState: '',
//       appState: '',
//       devicesIds: [],
//       devices: [],
//       devicesConnectedIds: [],
//       devicesConnected: [],
//     };
//     this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
//   }

//   handleDiscoverPeripheral(device) {
//     if (!this.state.devicesIds.includes(device.id)) {
//       console.log({ DeviceFound: device });
//       this.setState({ devicesIds: [...this.state.devicesIds, device.id] });
//       // Añadimos el dispositivo completo a la lista
//       this.setState({
//         devices: [...this.state.devices, device],
//       });
//     }
//   }

//   componentDidMount() {
//     // We set listeners to our events to our api events
//     this.setListeners();
//     //Comprobamos el BLE (nos pide permisos) y lo arrancamos
//     startManager();
//     //Actualizamos los dispositivos conectados
//     this.retrieveConnected();
//   }

//   retrieveConnected() {
//     BleManager.getConnectedPeripherals([]).then(results => {
//       console.log({ ConnectedDevices: results });
//       for (var i = 0; i < results.length; i++) {
//         var device = results[i];
//         device.connected = true;
//         this.setState({ devicesConnected: results });
//       }
//     });
//   }

//   resetDevices() {
//     // Reseteamos los devices y los ids
//     this.setState({ devicesIds: [] });
//     this.setState({ devices: [] });
//     this.setState({ devicesConnectedIds: [] });
//     this.setState({ devicesConnected: [] });
//   }

//   startStop() {
//     // Limpiamos y empezamos nuevo escaner o detenemos el actual
//     if (this.state.scanning) {
//       console.log('Stoped scanner');
//       BleManager.stopScan().then(() => {
//         // Success code
//         console.log('Scan stopped');
//       });
//       this.setState({ scanning: false });
//     } else {
//       BleManager.scan([], 5, true).then(console.log('Scan started'));
//       this.setState({ scanning: true });
//       this.resetDevices();
//     }
//     this.retrieveConnected();
//   }

//   setListeners = () => {
//     this.handlerDiscover = bleManagerEmitter.addListener(
//       'BleManagerDiscoverPeripheral',
//       this.handleDiscoverPeripheral,
//     );
//   };

//   render() {
//     const stop = I18n.t('stop');
//     const start = I18n.t('start');
//     return (
//       <View style={{ backgroundColor: theme().bgColor, flex: 1 }}>
//         <View>
//           <View style={{ paddingTop: 10, paddingBottom: 10 }}>
//             <Button
//               color={theme().buttonColor}
//               title={this.state.scanning ? stop : start}
//               onPress={() => {
//                 this.startStop();
//               }}
//             />
//           </View>

//           {this.state.devicesConnected.length > 0 ? (
//             <Card
//               containerStyle={[
//                 styles.titles,
//                 {
//                   backgroundColor: theme().bgLightColor,
//                 },
//               ]}>
//               <Text style={[{ fontSize: 18 }, { color: theme().textColor }]}>
//                 {I18n.t('connected')} {this.state.devicesConnected.length}
//               </Text>
//             </Card>
//           ) : null}
//           <View>
//             <ScrollView style={styles.container}>
//               <FlatList
//                 // Recogemos el array de dispositivos conectados de nuetro estado
//                 data={this.state.devicesConnected}
//                 renderItem={({ item }) => (
//                   <DeviceItem
//                     device={item}
//                     navigation={this.props.navigation}
//                     parent={this}
//                   />
//                 )}
//               />
//             </ScrollView>
//           </View>

//           <Card
//             containerStyle={[
//               styles.titles,
//               {
//                 backgroundColor: theme().bgLightColor,
//               },
//             ]}>
//             <Text style={[{ fontSize: 18 }, { color: theme().textColor }]}>
//               {I18n.t('found')} {this.state.devicesIds.length}
//             </Text>
//           </Card>
//           <View>
//             <ScrollView style={styles.container}>
//               <FlatList
//                 // Recogemos el array de dispositivos encontrados de nuetro estado
//                 data={this.state.devices}
//                 renderItem={({ item }) => (
//                   <DeviceItem
//                     device={item}
//                     navigation={this.props.navigation}
//                     parent={this}
//                   />
//                 )}
//               />
//             </ScrollView>
//           </View>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 0,
//     borderColor: '#d6d7da',
//   },
//   titles: {
//     margin: 0,
//     marginLeft: -3,
//     marginRight: -3,
//     padding: 5,
//     paddingLeft: 15,
//   },
// });

// startManager = () => {
//   BleManager.enableBluetooth()
//     .then(() => {
//       // Success code
//       console.log('The bluetooth is already enabled or the user confirm');
//     })
//     .catch(error => {
//       // Failure code
//       console.warn({ error });
//       console.log('The user refuse to enable bluetooth');
//     });
//   BleManager.start();
// };
