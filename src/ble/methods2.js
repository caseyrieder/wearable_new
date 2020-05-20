import React from 'react';
import {
  NativeAppEventEmitter,
  NativeEventEmitter,
  NativeModules,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import BleManager from 'react-native-ble-manager';
import { UUIDs, svcUuid } from './variables';
import { hex2Rgb, stringToBytes } from './conversions';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

// TODO: TOP LEVEL
function getPermissions() {
  let r = true;
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
            r = false;
          }
        });
      }
    });
  }
  return r;
}

function startBLE() {
  BleManager.start();
  console.log('Initialized Ble');
}

function simpleGetConnected() {
  BleManager.getConnectedPeripherals([]).then(peripheralsArray => {
    console.log('Connected peripherals: ' + peripheralsArray.length);
  });
}

// TODO: CONTEXT
function checkState() {
  let check = BleManager.checkState();
  console.log('check', check);
}
async function pair(bagId, pin) {
  let res = true;
  connectToNewBag(bagId, pin);
  getServices(bagId);
  await BleManager.write(bagId, svcUuid, UUIDs.pin, stringToBytes(pin))
    .then(() => {
      console.log(`Pin ${pin} connected`);
    })
    .catch(error => {
      console.log(`failed to pair. Please try again: ${error}`);
      res = false;
    });
  await savePinAndBagId(pin, bagId);
}

function connectToNewBag(bagId, pin) {
  BleManager.connect(bagId).then(() => {
    let bags = this.state.bags;
    let p = bags.get(bagId);
    if (p) {
      p.connected = true;
      bags.set(bagId, p);
      this.setState({
        bags,
        paired: bags[0],
      });
    }
    console.log('Connected to ' + bagId);
    console.log('pin', pin);
  });
}
/* (inside connect/pair) */
function getServices(bagId) {
  BleManager.retrieveServices(bagId)
    .then(bagInfo => {
      console.log('retrieved services');
      console.log(bagInfo.characteristics);
    })
    .catch(e => {
      console.log(`failed to retrieve services: ${e}`);
    });
}

// TODO: CONNECTIONS
function startScan() {
  BleManager.scan([], 3, true).then(results => {
    console.log('Scanning...');
  });
}

function stopScan() {
  BleManager.stopScan()
    .then(res => {
      console.log('Scanning stopped');
    })
    .catch(e => {
      console.log(`Scanning failed to stop : ${e.message}`);
    });
}

function retrieveDiscovered() {
  BleManager.getDiscoveredPeripherals([]).then(discovered => {
    if (discovered.length == 0) {
      console.log('No discovered bags');
    }
    console.log('discovered', discovered);
    let bags = new Map();
    for (var i = 0; i < discovered.length; i++) {
      let bag = discovered[i];
      bag.connected = true;
      bags.set(bag.id, bag);
    }
  });
  console.log(`bags: ${JSON.stringify(bags)}`);
  return bags;
}
async function saveBagId(dispatch, bagId) {
  dispatch({ type: 'save bagId', bagId });
  try {
    const asyncBagId = await AsyncStorage.setItem('@telekom_bag_id', bagId);
    dispatch({ type: 'bagId saved', asyncBagId });
  } catch (error) {
    dispatch({ type: 'bagId not saved', error });
  }
}
async function savePinAndBagId(pincode, bagId) {
  const pinPair = ['@wearable_bag_pin', pincode];
  const bagIdPair = ['@wearable_bag_id', bagId];
  try {
    await AsyncStorage.multiSet([pinPair, bagIdPair]);
  } catch (e) {
    // saving error
    console.log('failed to save pin', e);
  }
  console.log('saved pin & bagId to AsyncStorage');
}

// TODO: HOME
function writeToMyBag(bagData, dataObject) {
  if (bagData) {
    dataObject[0].data = bagData.pin;
    // if (!bag.connected) {
    //   connectToNewBag(bag.id, pin)
    // }
    setTimeout(() => {
      getServices(bagData.id);
      writeAll(bagData.id, dataObject);
    }, 1500);
  }
}
async function getPinAndBagId() {
  let myBag = { id: '', pin: '' };
  let values;
  try {
    values = await AsyncStorage.multiGet([
      '@wearable_bag_id',
      '@wearable_bag_pin',
    ]);
  } catch (e) {
    console.log('failed to retrieve pin & bagId from AsyncStorage');
    navigate('connections');
    return;
  }
  if (values[0][1] === '' || values[1][1] === '') {
    console.log('you have not saved pin, bagid, or both');
    navigate('connections');
    return;
  } else if (values[0][1] === null || values[1][1] === null) {
    console.log('you have no pin save or bagid saved');
    navigate('connections');
    return;
  } else {
    console.log('you retrieved your values: ', values);
  }
  myBag = { id: values[0][1], pin: values[1][1] };
  console.log('myBagfomr fxn: ', myBag);
  return myBag;
}
async function getBagId(dispatch) {
  dispatch({ type: 'get saved bagId' });
  try {
    const asyncBagId = await AsyncStorage.getItem('@telekom_bag_id');
    dispatch({ type: 'saved bagId retrieved', asyncBagId });
  } catch (error) {
    dispatch({ type: 'saved bagId not found', error });
  }
}

function retrieveConnected() {
  BleManager.getConnectedPeripherals([]).then(results => {
    if (results.length == 0) {
      console.log('No connected bags');
    }
    console.log(results);
    var bags = this.state.bags;
    for (var i = 0; i < results.length; i++) {
      var bag = results[i];
      bag.connected = true;
      bags.set(bag.id, bag);
      this.setState({
        bags,
        paired: bag,
      });
    }
  });
}

function writeAll(bagId, dataObj) {
  console.log(bagId);
  console.log(svcUuid);
  console.log(stringToBytes(dataObj[0].data));
  console.log([dataObj[0].uuid]);
  console.log(stringToBytes(dataObj[1].data));
  console.log([dataObj[1].uuid]);
  console.log(hex2Rgb(dataObj[2].data));
  console.log([dataObj[2].uuid]);
  console.log([dataObj[3].data]);
  console.log([dataObj[3].uuid]);
  console.log([dataObj[4].data]);
  console.log([dataObj[4].uuid]);
  console.log([dataObj[5].data]);
  console.log([dataObj[5].uuid]);
  setTimeout(() => {
    // const byteString = stringToBytes(newMessage);
    BleManager.write(
      bagId,
      svcUuid,
      dataObj[0].uuid,
      stringToBytes(dataObj[0].data),
    ).then(() => {
      console.log(`Wrote pin: ${pin}\n`);
      BleManager.write(
        bagId,
        svcUuid,
        dataObj[1].uuid,
        stringToBytes(dataObj[1].data),
      ).then(() => {
        console.log(`Wrote ${dataObj[1].char}: ${dataObj[1].data}\n`);
        BleManager.write(
          bagId,
          svcUuid,
          dataObj[2].uuid,
          hex2Rgb(dataObj[2].data),
        ).then(() => {
          console.log(`Wrote ${dataObj[2].char}: ${dataObj[2].data}\n`);
          BleManager.write(bagId, svcUuid, dataObj[3].uuid, [
            dataObj[3].data,
          ]).then(() => {
            console.log(`Wrote ${dataObj[3].char}: ${dataObj[3].data}\n`);
            BleManager.write(bagId, svcUuid, dataObj[4].uuid, [
              dataObj[4].data,
            ]).then(() => {
              console.log(`Wrote ${dataObj[4].char}: ${dataObj[4].data}\n`);
              BleManager.write(bagId, svcUuid, dataObj[5].uuid, [
                dataObj[5].data,
              ]).then(() => {
                console.log(`Wrote ${dataObj[5].char}: ${dataObj[5].data}\n`);
              });
            });
          });
        });
      });
    });
  }, 1500);
}

methods = {
  getPermissions,
  startBLE,
  stopScan,
  startScan,
  retrieveDiscovered,
  getServices,
  connectToNewBag,
  savePinAndBagId,
  getPinAndBagId,
  writeToMyBag,
  retrieveConnected,
  saveBagId,
  getBagId,
  pair,
  checkState,
  simpleGetConnected,
};
export default methods;
