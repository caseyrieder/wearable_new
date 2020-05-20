declare module '*.png'; // allows image imports

interface IMessage {
  message: string;
  color: string;
  speed: number;
  direction: number;
  brightness?: number;
  id?: number;
}

interface IBrand {
  image: import('react-native').ImageProps;
  name: string;
  line1: string;
  line2: string;
  linkInstagram: string;
  linkTwitter: string;
  linkWebsite: string;
}

interface IBag {
  id: string;
  pin: string;
}

interface IBleData {
  uuid: string;
  data: any;
  char: string;
}
interface IBlePacket extends Array<IBleData> {}

type BleObj = {
  Ble: any;
  bag: IBag;
  getBag: () => { id: string; pin: string };
  updateBag: (id: string, pin: string) => void;
  connected: boolean;
  updateConnected: (r: boolean) => void;
  periphs: any;
  updatePeriphs: (items: any) => void;
  reconnect: () => void;
};
