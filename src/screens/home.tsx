import React, { useState, useEffect, Fragment } from 'react';
import { Alert } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import styled from 'styled-components/native';
import { isEqual } from 'lodash';

import { theme } from '../themes';
import { HeaderControl } from '../components/HeaderControl';
import { MessageList, SingleMessageList } from '../components/MessageList';
import { MessageControl } from '../components/MessageControl';

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

const Page = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${theme.colors.grey.main};
`;

const SectionArtist = styled.View`
  display: flex;
  padding: 50px 0 0;
  flex: 1;
  background-color: #ffffff;
`;

const Home = () => {
  const [isUserEditable, setIsUserEditable] = useState(false);
  const [customMessage, setCustomMessage] = useState<IMessage>(defaultMessage);

  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 500);
  }, []);

  const sendToDevice = (data: IMessage) => {
    debugAlertMessage(data);
    setCustomMessage(data);
    setIsUserEditable(false);

    console.log(defaultMessage);
    console.log(customMessage);
    console.log(Object.is(defaultMessage, customMessage));

    return true;
  };

  const debugAlertMessage = (data: IMessage) => {
    Alert.alert('Send to Device', JSON.stringify(data, undefined, 2));
  };

  return (
    <Page>
      <HeaderControl
        editMode={isUserEditable}
        onToggle={() => setIsUserEditable(!isUserEditable)}
      />
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
