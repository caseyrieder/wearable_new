import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { useNavigation } from 'react-navigation-hooks';
import styled from 'styled-components/native';

import { HeaderControl } from '../components/HeaderControl';
import { ArtistList } from '../components/ArtistList';
import { MessageControl } from '../components/MessageControl';

const FakeData: IMessage[] = [
  {
    id: 1,
    message: 'hello !!!',
    color: '#ffffff',
    speed: 25,
    direction: 1,
  },
  {
    id: 2,
    message: 'hello !!!',
    color: '#ffffff',
    speed: 25,
    direction: 1,
  },
  {
    id: 3,
    message: 'hello !!!',
    color: '#ffffff',
    speed: 25,
    direction: 1,
  },
  {
    id: 4,
    message: 'hello !!!',
    color: '#ffffff',
    speed: 25,
    direction: 1,
  },
  {
    id: 5,
    message: 'hello !!!',
    color: '#ffffff',
    speed: 25,
    direction: 1,
  },
  {
    id: 6,
    message: 'hello !!!',
    color: '#ffffff',
    speed: 25,
    direction: 1,
  },
];

const Page = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const SectionArtist = styled.View`
  display: flex;
  padding: 50px 0 0;
  flex: 1;
  background-color: #ffffff;
`;

const Home = () => {
  const { navigate } = useNavigation();
  const [editMessage, setEditMessage] = useState(false);
  const [customMessage, setCustomMessage] = useState<IMessage | null>(null);

  const [message, setMessage] = useState<string>('');

  const sendToDevice = (data: IMessage) => {
    Alert.alert('Send to device', JSON.stringify(data));

    return true;
  };

  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 1500);
  }, []);

  return (
    <Page>
      <HeaderControl onChangeText={text => setMessage(text)} />
      {message === '' ? (
        <ArtistList data={FakeData} />
      ) : (
        <MessageControl text={message} send={data => sendToDevice(data)} />
      )}
    </Page>
  );
};

export default Home;
