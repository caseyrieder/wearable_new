import React, { useState, useEffect, Fragment } from 'react';
import { Alert } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import styled from 'styled-components/native';
import { useNavigation } from 'react-navigation-hooks';
import { isEqual } from 'lodash';

import { theme } from '../themes';
import { Page } from '../components/Base';
import { HomeHeader } from '../components/HeaderControl';
import { MessageList, SingleMessageList } from '../components/MessageList';
import { MessageControl } from '../components/MessageControl';
import { methods, stringToBytes, hex2Rgb } from '../ble';
const { getSvcs, writeMessage, findAsyncBag } = methods;

const defaultMessage = {
  id: 0,
  message: '',
  color: '#ffffff',
  speed: 10,
  direction: 0,
};

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

const TitleToggle = styled.Text`
  padding: 30px 0 15px;
  font-size: 20px;
  color: #ffffff;
`;

const Home = (props: any) => {
  const { navigate } = useNavigation();
  const [isUserEditable, setIsUserEditable] = useState(false);
  const [customMessage, setCustomMessage] = useState<IMessage>(defaultMessage);

  useEffect(() => {
    // console.log(`bag: ${JSON.stringify(props.bag)}`);
    setTimeout(() => SplashScreen.hide(), 500);
    if (!props.connected) {
      props.reconnect();
    } else {
      console.log(`im conneted?: ${props.connected}`);
    }
  });

  const sendToDevice = (data: IMessage) => {
    debugAlertMessage(data);
    setCustomMessage(data);
    setIsUserEditable(false);
    prepMessage(data);
    return true;
  };

  const prepMessage = async (data: IMessage) => {
    const myBag = await findAsyncBag();
    let messageArray = [
      { char: 'pin', data: myBag.pin },
      { char: 'message', data: data.message },
      { char: 'color', data: data.color },
      { char: 'speed', data: data.speed },
      { char: 'direction', data: data.direction },
      { char: 'brightness', data: 25 },
    ];
    getSvcs(myBag.id).then(peripheralInfo => {
      writeMessage(myBag.id, messageArray);
    });
  };

  const debugAlertMessage = (data: IMessage) => {
    Alert.alert('Send to Device', JSON.stringify(data, undefined, 2));
  };

  return (
    <Page>
      <HomeHeader
        toBLE={() => navigate('connection')}
        onPress={() => navigate('about')}>
        <TitleToggle onPress={() => setIsUserEditable(!isUserEditable)}>
          {isUserEditable ? 'Select artist message' : 'Enter your own text |'}
        </TitleToggle>
      </HomeHeader>
      {isUserEditable ? (
        <MessageControl
          message={customMessage}
          send={data => sendToDevice(data)}
        />
      ) : (
        <Fragment>
          {isEqual(defaultMessage, customMessage) ? null : (
            <SingleMessageList
              header={'From the user:'}
              data={[customMessage]}
              onPress={() => setIsUserEditable(true)}
            />
          )}
          <MessageList
            header={'From the artist:'}
            data={FakeData}
            onPress={data => debugAlertMessage(data)}
          />
        </Fragment>
      )}
    </Page>
  );
};

export default Home;
