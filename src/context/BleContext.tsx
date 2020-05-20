import React, { createContext, useState, ReactNode } from 'react';
import BleManager from 'react-native-ble-manager';
import { UUIDs, stringToBytes, methods } from '../ble';
import { BleObj } from '../types';
const { findAsyncBag, saveAsyncBag, pair } = methods;

type BleProviderProps = {
  children: ReactNode;
};

// const initialBleState: BleObj = {
//     Ble: BleManager,
//     myBag: {
//         id: '',
//         pin: '',
//     },
//     getBag: () => findAsyncBag() => any,
//     updateBag: (id: string, pin: string) => saveAsyncBag(id, pin),
//     connected: false,
//     setConnected: (r: boolean) => setter(r),
//     periphs: new Map(),
//     setPeriphs: (periphs:any) => setter(periphs),
//     reconnect: () => void
// }

const BleContext = createContext<BleObj>({});

function BleProvider({ children }: BleProviderProps) {
  const [myBag, setMyBag] = useState({});
  const [connected, setConnected] = useState(false);
  const [periphs, setPeriphs] = useState(new Map());

  function updateConnected(r: boolean) {
    setConnected(r);
  }

  function updatePeriphs(items: any) {
    setPeriphs(items);
  }

  const BleState: BleObj = {
    Ble: BleManager,
    bag: myBag,
    getBag: () =>
      findAsyncBag()
        .then((value: { id: string; pin: string }) => {
          let { id, pin } = value;
          let bag = { id, pin };
          setMyBag(bag);
          return myBag;
        })
        .catch(e => {
          console.log(`failed to find async bag ${e}`);
          return;
        }),
    updateBag: (id: string, pin: string) =>
      saveAsyncBag(id, pin).then(() => setMyBag(myBag)),
    connected: connected,
    updateConnected: (r: boolean) => updateConnected(r),
    periphs: periphs,
    updatePeriphs: (items: any) => updatePeriphs(items),
    reconnect: () =>
      findAsyncBag()
        .then((value: { id: string; pin: string }) => {
          let { id, pin } = value;
          pair(id, pin, periphs, setPeriphs);
          console.log('successful re-pair');
        })
        .catch(e => console.log(`failed to reconnect to bag ${e}`)),
  };

  return <BleContext.Provider value={BleState}>{children}</BleContext.Provider>;
}

export { BleProvider, BleContext };
