declare module '*.png'; // allows image imports

interface IMessage {
  id: number;
  message: string;
  color: string;
  speed: number;
  direction: number;
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
