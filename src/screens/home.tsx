import React, { useState, useEffect, Fragment } from 'react';
import { Alert } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import styled from 'styled-components/native';
import { useNavigation } from 'react-navigation-hooks';
import { isEqual } from 'lodash';

import { theme, width } from '../themes';
import { Page } from '../components/Base';
import { HomeHeader } from '../components/HeaderControl';
import { MessageList, SingleMessageList } from '../components/MessageList';
import { MessageControl } from '../components/MessageControl';
import { methods, stringToBytes, hex2Rgb } from '../ble';
const { getSvcs, writeMessage, findAsyncBag } = methods;

import CherryBackground from '../images/background/launch_screen_new.png';

const defaultMessage = {
  id: 0,
  message: '',
  color: theme.colors.grey.main,
  speed: 30,
  direction: 2,
  brightness: 80,
};

const FakeData: IMessage[] = [
  {
    id: 1,
    message: 'HELLO  FROM  ARVIDA!!',
    color: theme.colors.primary.main,
    speed: 25,
    direction: 1,
    brightness: 80,
  },
  {
    id: 2,
    message: 'HOLA',
    color: theme.colors.accent.light,
    speed: 25,
    direction: 2,
    brightness: 80,
  },
  {
    id: 3,
    message: 'HEY!',
    color: theme.colors.primary.dark,
    speed: 25,
    direction: 0,
    brightness: 80,
  },
  {
    id: 4,
    message: 'GUTEN TAG',
    color: theme.colors.accent.main,
    speed: 5,
    direction: 1,
    brightness: 80,
  },
  {
    id: 5,
    message: 'BONJOIR',
    color: theme.colors.primary.light,
    speed: 5,
    direction: 2,
    brightness: 80,
  },
  {
    id: 6,
    message: 'ALOHA',
    color: theme.colors.accent.light,
    speed: 5,
    direction: 0,
    brightness: 80,
  },
];

// 20px
const TitleToggle = styled.Text`
  padding: 6% 0 3%;
  font-size: ${width * 0.06}px;
  color: ${theme.colors.black.dark};
`;

const Backdrop = styled.ImageBackground`
  display: flex;
  height: 100%;
  width: 100%;
`;

const Home = (props: any) => {
  const { navigate } = useNavigation();
  const [isUserEditable, setIsUserEditable] = useState(true);
  const [customMessage, setCustomMessage] = useState<IMessage>(defaultMessage);

  useEffect(() => {
    // console.log(`bag: ${JSON.stringify(props.bag)}`);
    setTimeout(() => SplashScreen.hide(), 500);
    // if (props.connected === false) {
    //   props.reconnect();
    // } else {
    //   console.log(`im connected?: ${props.connected}`);
    // }
  });

  const sendToDevice = (data: IMessage) => {
    // debugAlertMessage(data);
    setCustomMessage(data);
    debugAlertMessage(data);
    setIsUserEditable(false);
    prepMessage(data);
    return true;
  };

  const prepMessage = async (data: IMessage) => {
    const myBag = await findAsyncBag();
    console.log(`myBag.id: ${myBag.id}, myBag.pin: ${myBag.pin}`);
    let messageArray = [
      { char: 'pin', data: myBag.pin },
      { char: 'message', data: data.message },
      { char: 'color', data: data.color },
      { char: 'speed', data: data.speed },
      { char: 'direction', data: 2 },
      { char: 'brightness', data: data.brightness },
    ];
    console.log(`unconverted message: ${JSON.stringify(messageArray)}`);
    getSvcs(myBag.id).then(peripheralInfo => {
      writeMessage(myBag.id, messageArray);
      console.log(
        `get services peripheralInfo: ${JSON.stringify(peripheralInfo)}`,
      );
    });
  };

  const debugAlertMessage = () => {
    Alert.alert('Sent!', 'Your statement is sent to your device.');
  };

  return (
    <Page>
      <Backdrop source={CherryBackground}>
        <HomeHeader
          toBLE={() => navigate('connection')}
          onPress={() => navigate('about')}>
          <TitleToggle onPress={() => setIsUserEditable(!isUserEditable)}>
            {isUserEditable ? '' : ''}
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
                header={'From you.'}
                data={[customMessage]}
                onPress={() => setIsUserEditable(true)}
              />
            )}
            <MessageList
              header={'From the artist.'}
              data={FakeData}
              onPress={data => sendToDevice(data)}
              // onPress={data => prepMessage(data)}
            />
          </Fragment>
        )}
      </Backdrop>
    </Page>
  );
};

export default Home;
