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
    speed: 15,
    direction: 2,
    brightness: 150,
  },
  {
    id: 2,
    message:
      "MAYBE SHE'S BORN WITH IT, MAYBE SHE WATCHED ALOT OF YOUTUBE TUTORIALS",
    color: theme.colors.accent.light,
    speed: 8,
    direction: 2,
    brightness: 80,
  },
  {
    id: 3,
    message:
      'YOU TAKE PHOTOS OF A WOMAN BECAUSE YOU ENJOY LOOKING AT HER, YOU GIVE HER A SELFIE CAM AND YOU CALL IT VANITY',
    color: theme.colors.misc.pink,
    speed: 18,
    direction: 2,
    brightness: 80,
  },
  {
    id: 4,
    message: 'A MEDIUM AND A MESSAGE',
    color: theme.colors.accent.main,
    speed: 10,
    direction: 2,
    brightness: 80,
  },
];

// 20px
const EditToggle = styled.TouchableOpacity`
  padding: 0;
  right: -60%;
`;
const TitleToggle = styled.Text`
  font-size: ${width * 0.06}px;
  color: ${theme.colors.misc.pink};
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
          {/* <TitleToggle onPress={() => setIsUserEditable(!isUserEditable)}> */}
        </HomeHeader>
        <EditToggle onPress={() => setIsUserEditable(!isUserEditable)}>
          <TitleToggle>
            {isUserEditable ? "ARVIDA'S" : 'YOUR MESSAGE'}
          </TitleToggle>
        </EditToggle>
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
