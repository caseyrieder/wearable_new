import React from 'react';
import {
  NativeAppEventEmitter,
  EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import AsyncStorage from '@react-native-community/async-storage';
import { stringToBytes, hex2Rgb } from './conversions';
import { UUIDs, BleData } from './variables';
const { packet, brightness } = BleData;

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

function getPerms() {
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
}

function start() {
  BleManager.enableBluetooth()
    .then(() => {
      // Success code
      console.log('The bluetooth is already enabled or the user confirm');
    })
    .catch(error => {
      // Failure code
      console.warn({ error });
      console.log('The user refuse to enable bluetooth');
    });
  BleManager.start();
  console.log('Initialized Ble');
}

function scan() {
  BleManager.scan([], 5, true).then(results => {
    console.log('Scanning...');
  });
}

function getDiscovered() {
  let disced: any = [];
  BleManager.getDiscoveredPeripherals()
    .then(discovered => {
      if (discovered.length == 0) {
        console.log('No discovered bags');
      }
      console.log('discovered', discovered);
      disced = discovered;
    })
    .catch(e => {
      console.log(`error with discovery: ${e}`);
    });
  return disced;
}

function connect(id: string) {
  return BleManager.connect(id);
}

function getConnected([]) {
  return BleManager.getConnectedPeripherals([]);
}

async function getSvcs(id: string) {
  let info: any;
  await BleManager.retrieveServices(id)
    .then(periphInfo => {
      console.log('retrieved services');
      console.log(JSON.stringify(periphInfo));
      info = periphInfo;
    })
    .catch(e => {
      console.log(`failed to retrieve services: ${e}`);
      info = 'nope';
    });
  return info;
}

async function pairWithPin(bagId: string, pin: string) {
  await getSvcs(bagId);
  if (!pin) {
    return console.log('No pin');
  }
  let pinItem = {
    uuid: UUIDs.pin,
    data: stringToBytes(pin),
    char: 'pin',
  };
  write(bagId, pinItem);
}

function write(id: string, data: IBleData) {
  BleManager.write(id, UUIDs.svc, data.uuid, data.data)
    .then(res => {
      console.log(
        `you wrote ${data.data} to ${data.char}... (at uuid:${data.uuid})`,
      );
    })
    .catch(e => {
      console.log(`failed to write ${data.data} to ${data.char}: ${e}`);
    });
}

function prepBleData(pin: string, messageData: IMessage) {
  packet[0].data = stringToBytes(pin);
  packet[1].data = stringToBytes(messageData.message);
  packet[2].data = hex2Rgb(messageData.color);
  packet[3].data = [messageData.speed];
  packet[4].data = [messageData.direction];
  packet[5].data = [brightness];
  return packet;
}

function writeMessage(periph: string, obj: IBlePacket) {
  setTimeout(() => {
    BleManager.write(
      periph,
      UUIDs.svc,
      UUIDs.pin,
      stringToBytes(obj[0].data),
    ).then(() => {
      console.log(`Wrote ${obj[0].char}: ${obj[0].data}}'\n`);
      BleManager.write(
        periph,
        UUIDs.svc,
        UUIDs.msg,
        stringToBytes(obj[1].data),
      ).then(() => {
        console.log(`Wrote ${obj[1].char}: ${obj[1].data}}'\n`);
        BleManager.write(
          periph,
          UUIDs.svc,
          UUIDs.clr,
          hex2Rgb(obj[2].data),
        ).then(() => {
          console.log(`Wrote ${obj[2].char}: ${obj[2].data}}'\n`);
          BleManager.write(periph, UUIDs.svc, UUIDs.spd, [obj[3].data]).then(
            () => {
              console.log(`Wrote ${obj[3].char}: ${obj[3].data}}'\n`);
              BleManager.write(periph, UUIDs.svc, UUIDs.dir, [
                obj[4].data,
              ]).then(() => {
                console.log(`Wrote ${obj[4].char}: ${obj[4].data}}'\n`);
                BleManager.write(periph, UUIDs.svc, UUIDs.brt, [
                  obj[5].data,
                ]).then(() => {
                  console.log(`Wrote ${obj[5].char}: ${obj[5].data}}'\n`);
                });
              });
            },
          );
        });
      });
    });
  }, 1500);
}

// const writePromise = (id: string, entry: IBleData) => {
//   return new Promise((resolve, reject) => {
//     BleManager.write(id, svcUU, entry.uuid, entry.data)
//       .then(res => {
//         console.log(
//           `you wrote ${entry.data} to ${entry.char}... (at uuid:${entry.uuid})`,
//         );
//         resolve(true);
//       })
//       .catch(e => {
//         console.log(`failed to write ${entry.data} to ${entry.char}: ${e}`);
//         reject(false);
//       });
//   });
// };

// function chainWrite(id: string, msgArray: IBlePacket) {
//   let promises: any[] = [];
//   msgArray.map(entry => {
//     promises.push(writePromise(id, entry));
//   });
//   Promise.all(promises)
//     .then(response => console.log(response)) // Promise.all cannot be resolved, as one of the promises passed got rejected.
//     .catch(error => console.log(`Error in executing ${error}`)); // Promise.all throws an error.
// }

async function saveAsyncBag(id: string, pin: string) {
  const idPair = ['@telekom_bag_id', id];
  const pinPair = ['@telekom_bag_pin', pin];
  try {
    await AsyncStorage.multiSet([idPair, pinPair]);
  } catch (e) {
    console.log(`failed to save pin or id: ${e}`);
  }
  console.log('saved pin & id to AsyncStorage');
}

async function findAsyncBag() {
  let myBag = { id: '', pin: '' };
  let values: any;
  try {
    values = await AsyncStorage.multiGet([
      '@telekom_bag_id',
      '@telekom_bag_pin',
    ]);
  } catch (e) {
    console.log('failed to retrieve pin & bagId from AsyncStorage');
  }
  if (values[0][1] === '' || values[1][1] === '') {
    console.log('you have not saved pin, bagid, or both');
  } else if (values[0][1] === null || values[1][1] === null) {
    console.log('you have no pin save or bagid saved');
  } else {
    myBag = { id: values[0][1], pin: values[1][1] };
    console.log('you retrieved your values: ', myBag);
  }
  return myBag;
}

function disconnect(id: string) {
  let r: boolean = true;
  BleManager.disconnect(id)
    .then(() => {
      console.log(`Disconnecting from bag at id: ${id}`);
    })
    .catch(e => {
      console.log(`Failed to disconnect: ${e}`);
      r = false;
    });
  return r;
}

function checkConnected(periphId: string) {
  let r: boolean = true;
  return new Promise((resolve, reject) => {
    BleManager.isPeripheralConnected(periphId, [])
      .then(isConnected => {
        if (isConnected === true) {
          console.log(`Peripheral ${periphId} is connected`);
          resolve(true);
        } else {
          console.log(`Peripheral ${periphId} is not connected`);
          reject(false);
        }
      })
      .catch(e => {
        console.log(`Peripheral ${periphId} is not connected: ${e}`);
        reject(false);
      });
  });
}

async function pair(id: string, pin: string) {
  connect(id)
    .then(() => {
      pairWithPin(id, pin);
    })
    .catch(e => {
      console.log('failed to connect prior to pin pair attempt');
    });
}

const functions = {
  getPerms,
  start,
  scan,
  getDiscovered,
  connect,
  getConnected,
  pairWithPin,
  pair,
  getSvcs,
  write,
  prepBleData,
  writeMessage,
  saveAsyncBag,
  findAsyncBag,
  disconnect,
  checkConnected,
};

export default functions;
// function reconnect(periphsState: any) {
//     let peripherals: any = new Map()
//     let paired: any = {}
//     BleManager.getConnectedPeripherals([]).then(results => {
//         if (results.length == 0) {
//             console.log('No connected bags');
//         }
//         console.log(results);
//         peripherals = periphsState;
//         for (var i = 0; i < results.length; i++) {
//             paired = results[i];
//             paired.connected = true;
//             peripherals.set(paired.id, paired);
//         }
//     });
//     return { peripherals, paired }
// }
