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

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

import { Uuids } from './variables';
const { svcUU, pinUU } = Uuids;
import { stringToBytes } from './conversions';

//  HANDLERS
// const disconnector: EmitterSubscription = bleManagerEmitter.addListener(
//   'BleManagerDisconnectPeripheral',
//   hDisconnect,
// );

function changeAppSt(state: string, nextState: string) {
  if (state.match(/inactive|background/) && nextState === 'active') {
    console.log('App has come to the foreground!');
    BleManager.getConnectedPeripherals([]).then(periphsArray => {
      console.log('Connected periphs: ' + periphsArray.length);
    });
  }
}

// function hDisconnect(data: any, periphsState: any, updatePeriphs: (periphs: any) => void, updatePaired: (pairedPeriph: any) => void) {
// function hDisconnect(
//   data: any,
//   periphsState: any,
//   updatePeriphs: (periphs: any) => void,
// ) {
//   let bags = periphsState;
//   let bag = bags.get(data.bag);
//   if (bag) {
//     bag.connected = false;
//     bags.set(bag.id, bag);
//     updatePeriphs(bags);
//     // updatePaired({});
//   }
//   console.log('Disconnected from ' + data.bag);
// }

// CONTEXT
function setter(newVal: any) {
  let obj = newVal;
}

function arraySetter(newArr: any[]) {
  for (var i = 0; i < newArr.length; i++) {
    console.log(newArr[i]);
  }
}

function getter(val: any) {
  return val;
}

function connecter(id: string) {
  return BleManager.connect(id);
}
function getConnected([]) {
  return BleManager.getConnectedPeripherals([]);
}

function connect(
  periphId: string,
  periphsInState: any,
): { peripherals: any; paired: any } {
  let peripherals: any = new Map();
  let paired: any = {};
  let data: any = { peripherals: {}, paired: {} };
  BleManager.connect(periphId)
    .then(() => {
      peripherals = periphsInState;
      let p = peripherals.get(periphId);
      if (p) {
        p.connected = true;
        peripherals.set(periphId, p);
        paired = peripherals[0];
        data = { peripherals, paired };
      }
    })
    .catch(e => {
      console.log(`failed to connect to periph: ${periphId}: ${e}`);
    });
  return data;
}

function simpleConnect(periphId: string) {
  let r: boolean = true;
  BleManager.connect(periphId)
    .then(() => {
      console.log(`you are connected to ${periphId}`);
    })
    .catch(e => {
      console.log(`you failed to connect to ${periphId}`);
      r = false;
    });
  return r;
}

function disconnect(periphId: string) {
  let r: boolean = true;
  BleManager.disconnect(periphId)
    .then(() => {
      console.log(`Disconnecting from bag at id: ${periphId}`);
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

async function getServices(periphId: string) {
  let info: any;
  await BleManager.retrieveServices(periphId)
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

function write(periphId: string, data: IBleData) {
  BleManager.write(periphId, svcUU, data.uuid, data.data)
    .then(res => {
      console.log(
        `you wrote ${data.data} to ${data.char}... (at uuid:${data.uuid})`,
      );
    })
    .catch(e => {
      console.log(`failed to write ${data.data} to ${data.char}: ${e}`);
    });
}

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

// async function getAsync(setBag: (bag: any) => void): Promise<{id: string, pin: string}> {
//   let r: boolean = true
//   let myBag: {id: string, pin: string} = {id: '', pin: ''}
//   findAsyncBag().then(myBag => {
//     if (myBag == undefined || myBag.id.length < 4 || myBag.pin.length < 4) {
//       console.log(`no AsyncBag data`)
//     } else {
//       setBag(myBag);
//     }
//   }).catch(e => {
//     console.log(`failed to retrieve async bag data: ${e}`)
//   });
//   return myBag;
// }

// async function pair(bagId: string, pin: string, periphs: Map<any, any>, setPeriphs: (periphs: any) => void, setPaired: (p: any) => void)  {
async function pair(
  bagId: string,
  pin: string,
  periphs: Map<any, any>,
  setPeriphs: (periphs: any) => void,
) {
  const results = await connect(
    bagId,
    periphs,
  );
  setPeriphs(results.peripherals);
  // setPaired(results.paired)
  await getServices(bagId);
  let pinData = {
    uuid: pinUU,
    data: stringToBytes(pin),
    char: 'pin',
  };
  write(bagId, pinData);
}

// TOP LEVEL
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
  BleManager.start();
  console.log('Initialized Ble');
}

function remove(id: string) {
  let r: boolean = true;
  Platform.OS === 'ios'
    ? (r = false)
    : BleManager.removePeripheral(id)
        .then(res => {
          console.log(`successfuly removed bag ${id} from cache`);
        })
        .catch(e => {
          console.log(`failed to remove bag ${id} from cache, ${e}`);
          r = false;
        });
  return r;
}

// CONNECT
function scan(scanState: boolean, setScan: (arg: boolean) => void) {
  if (!scanState) {
    BleManager.scan([], 5, true).then(results => {
      console.log('Scanning...');
      setScan(true);
    });
  }
}

function simpleDiscover() {
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

function discover(periphsState: any, updatePeriphState: (pers: any) => void) {
  BleManager.getDiscoveredPeripherals().then(discovered => {
    if (discovered.length == 0) {
      console.log('No discovered bags');
    }
    console.log('discovered', discovered);
    var peris = periphsState;
    for (var i = 0; i < discovered.length; i++) {
      var p = discovered[i];
      p.connected = true;
      peris.set(p.id, p);
      updatePeriphState(peris);
    }
  });
}

// TODO
function reconnect(periphsState: any) {
  let peripherals: any = new Map();
  let paired: any = {};
  BleManager.getConnectedPeripherals([]).then(results => {
    if (results.length == 0) {
      console.log('No connected bags');
    }
    console.log(results);
    peripherals = periphsState;
    for (var i = 0; i < results.length; i++) {
      paired = results[i];
      paired.connected = true;
      peripherals.set(paired.id, paired);
    }
  });
  return { peripherals, paired };
}

async function pairWithPin(bagId: string, pin: string) {
  await getServices(bagId);
  if (!pin) {
    return console.log('No pin');
  }
  let pinItem = {
    uuid: pinUU,
    data: stringToBytes(pin),
    char: 'pin',
  };
  write(bagId, pinItem);
}

async function writeMsg(periphId: string, MsgArray: IBlePacket) {
  getServices(periphId)
    .then(() => {
      BleManager.write(periphId, svcUU, MsgArray[0].uuid, MsgArray[0].data)
        .then(() => {
          console.log(
            `you wrote ${MsgArray[0].data} to ${MsgArray[0].char}... (at uuid:${
              MsgArray[0].uuid
            })`,
          );
          BleManager.write(periphId, svcUU, MsgArray[1].uuid, MsgArray[1].data)
            .then(() => {
              console.log(
                `you wrote ${MsgArray[1].data} to ${
                  MsgArray[1].char
                }... (at uuid:${MsgArray[1].uuid})`,
              );
              BleManager.write(
                periphId,
                svcUU,
                MsgArray[2].uuid,
                MsgArray[2].data,
              )
                .then(() => {
                  console.log(
                    `you wrote ${MsgArray[2].data} to ${
                      MsgArray[2].char
                    }... (at uuid:${MsgArray[2].uuid})`,
                  );
                  BleManager.write(
                    periphId,
                    svcUU,
                    MsgArray[3].uuid,
                    MsgArray[3].data,
                  )
                    .then(() => {
                      console.log(
                        `you wrote ${MsgArray[3].data} to ${
                          MsgArray[3].char
                        }... (at uuid:${MsgArray[3].uuid})`,
                      );
                      BleManager.write(
                        periphId,
                        svcUU,
                        MsgArray[4].uuid,
                        MsgArray[4].data,
                      )
                        .then(() => {
                          console.log(
                            `you wrote ${MsgArray[4].data} to ${
                              MsgArray[4].char
                            }... (at uuid:${MsgArray[4].uuid})`,
                          );
                          BleManager.write(
                            periphId,
                            svcUU,
                            MsgArray[5].uuid,
                            MsgArray[5].data,
                          )
                            .then(() => {
                              console.log(
                                `you wrote ${MsgArray[5].data} to ${
                                  MsgArray[5].char
                                }... (at uuid:${MsgArray[5].uuid})`,
                              );
                            })
                            .catch(e => {
                              console.log(
                                `failed to write ${MsgArray[5].data} to ${
                                  MsgArray[5].char
                                }: ${e}`,
                              );
                            });
                        })
                        .catch(e => {
                          console.log(
                            `failed to write ${MsgArray[4].data} to ${
                              MsgArray[4].char
                            }: ${e}`,
                          );
                        });
                    })
                    .catch(e => {
                      console.log(
                        `failed to write ${MsgArray[3].data} to ${
                          MsgArray[3].char
                        }: ${e}`,
                      );
                    });
                })
                .catch(e => {
                  console.log(
                    `failed to write ${MsgArray[2].data} to ${
                      MsgArray[2].char
                    }: ${e}`,
                  );
                });
            })
            .catch(e => {
              console.log(
                `failed to write ${MsgArray[0].data} to ${
                  MsgArray[0].char
                }: ${e}`,
              );
            });
        })
        .catch(e => {
          console.log(
            `failed to write ${MsgArray[0].data} to ${MsgArray[0].char}: ${e}`,
          );
        });
    })
    .catch(e => {
      console.log(`failed to get services for ${periphId}: ${e}`);
    });
}

const methods = {
  start,
  remove,
  getPerms,
  disconnect,
  simpleConnect,
  checkConnected,
  connect,
  getServices,
  setter,
  arraySetter,
  getter,
  write,
  saveAsyncBag,
  findAsyncBag,
  pair,
  scan,
  discover,
  simpleDiscover,
  pairWithPin,
  reconnect,
  writeMsg,
};

export const handlers = { changeAppSt };
export default methods;
