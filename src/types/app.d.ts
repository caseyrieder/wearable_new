declare module '*.png'; // allows image imports
declare module 'react-native-vector-icons/Ionicons';

interface IMessage {
  message: string;
  color: string;
  speed: number;
  brightness: number;
  rgb: number[];
  direction?: number;
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
  data: any;
  char: string;
}
type IBlePacket = IBleData[];

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
