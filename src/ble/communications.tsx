import React from 'react';
import {
  NativeAppEventEmitter,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import { UUIDs, pin } from './constants';
import { stringToBytes, hex2Rgb } from './conversions';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

interface BLEObject {
  data: any;
  char: string;
}
type BLEArray = BLEObject[];

export function startBLE() {
  BleManager.start({ showAlert: false }).then(() => {
    // Success code
    console.log('BLE initialized');
  });
}

export function scanBLE(scanningState: boolean) {
  if (!scanningState) {
    //this.setState({peripherals: new Map()});
    BleManager.scan(UUIDs.svc, 3, true).then(res => {
      console.log('Scanning...');
      console.log(`found bags: ${JSON.stringify(res)}`);
      return true;
    });
  }
}

export function discoverBag(bag: any, bagsState: any) {
  var bags = bagsState;
  console.log(`Got ${bags.length} bags`);
  var jsonifiedMap = JSON.stringify(Array.from(bags));
  console.log(jsonifiedMap);
  if (bag.name) {
    console.log('Named: ', bag);
  }
  if (!bag.name) {
    bag.name = 'NO NAME';
  }
  bags.set(bag.id, bag);
  return bags;
}

export function getDiscoveredBags(bagsState: any) {
  BleManager.getDiscoveredPeripherals([]).then(discs => {
    if (discs.length == 0) {
      console.log('No discovered peripherals');
    }
    console.log('discovered', discs);
    var bags = bagsState;
    for (var i = 0; i < discs.length; i++) {
      var bag = discs[i];
      bag.connected = true;
      bags.set(bag.id, bag);
      return bagsState;
    }
  });
}

export function connectToBag(bagID: any, bagsState: any) {
  BleManager.connect(bagID).then(() => {
    let bags = bagsState;
    let b = bags.get(bagID);
    if (b) {
      b.connected = true;
      bags.set(bagID, b);
      console.log('Connected to ' + bagID);
      return { bags, paired: bags[0], bagID };
    }
    console.log('Connected to ' + bagID);
  });
}

export function getConnectedBags(bagsState: any) {
  BleManager.getConnectedPeripherals([]).then(res => {
    if (res.length == 0) {
      console.log('No connected bags');
    }
    console.log(res);
    var bags = bagsState;
    for (var i = 0; i < res.length; i++) {
      var bag = res[i];
      bag.connected = true;
      bags.set(bag.id, bag);
      return bags;
    }
  });
}

export function getBLEServices(bagID: any) {
  BleManager.retrieveServices(bagID).then(bagInfo => {
    console.log('retrieved services');
    console.log(bagInfo.characteristics);
  });
}

// to pair: connect -> retrieve services -> write pinCharacteristic
// export function pairWithMyBag(bagID: any, bagsState: any) {
//     let { bags, myBag, myBagID } = connectToBag(bagID, bagsState);
//     let services = getBLEServices(myBagID);
//     let sendPin = stringToBytes(pin);
//     BleManager.write(myBagID, UUIDs.svc, UUIDs.pin, sendPin).then(() => {
//         console.log(`Wrote pin: ${sendPin}}'\n`);
//     };
// }

export function writeMessage(periph: string, obj: BLEArray) {
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
                BleManager.write(periph, UUIDs.svc, UUIDs.svc, [
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
