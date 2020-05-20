const UUPre = '23511812-719';
const UUSuf = '-ba07-abc4-b20a119cd05b';
const svcUU = `${UUPre}2${UUSuf}`;
const pinUU = `${UUPre}3${UUSuf}`;
const messageUU = `${UUPre}5${UUSuf}`;
const colorUU = `${UUPre}6${UUSuf}`;
const speedUU = `${UUPre}7${UUSuf}`;
const directionUU = `${UUPre}8${UUSuf}`;
const brightnessUU = `${UUPre}9${UUSuf}`;

const UUIDs = {
  svc: svcUU,
  pin: pinUU,
  msg: messageUU,
  clr: colorUU,
  spd: speedUU,
  dir: directionUU,
  brt: brightnessUU,
};

const brightness = 25;

const messagePack: IBlePacket = [
  { data: '', char: 'pin' },
  { data: '', char: 'message' },
  { data: '', char: 'color' },
  { data: 0, char: 'speed' },
  { data: 0, char: 'direction' },
  { data: 0, char: 'brightness' },
];

const defaultMessage = {
  id: 0,
  message: '',
  color: '#ffffff',
  speed: 10,
  direction: 0,
};

const ArtistData: IMessage[] = [
  {
    message: 'hello !!!',
    color: '#ffffff',
    speed: 25,
    direction: 1,
  },
  {
    message: 'hello !!!',
    color: '#ffffff',
    speed: 25,
    direction: 1,
  },
  {
    message: 'hello !!!',
    color: '#ffffff',
    speed: 25,
    direction: 1,
  },
  {
    message: 'hello !!!',
    color: '#ffffff',
    speed: 25,
    direction: 1,
  },
  {
    message: 'hello !!!',
    color: '#ffffff',
    speed: 25,
    direction: 1,
  },
  {
    message: 'hello !!!',
    color: '#ffffff',
    speed: 25,
    direction: 1,
  },
];

const BleData = {
  packet: messagePack,
  defaultMessage,
  ArtistData,
  brightness,
};

export { UUIDs, BleData };
