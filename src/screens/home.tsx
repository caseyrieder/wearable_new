import React, { Fragment, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Alert,
  FlatList,
} from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import styled from 'styled-components/native';

import { theme } from '../themes';
import { lang } from '../lang/en';
import { MessageButton } from '../components/button';
import { Creator } from '../components/creator';

const FakeData = [
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

const ButtonView = styled.View`
  padding: 10px 15px;
`;

const SectionText = styled.Text`
  padding: 10px 15px;
`;

const Home = () => {
  const { navigate } = useNavigation();
  const [editMessage, setEditMessage] = useState(false);
  const [customMessage, setCustomMessage] = useState<IMessage | null>(null);

  const sendToDevice = (data: IMessage) => {
    Alert.alert('Send to device', JSON.stringify(data));
  };

  const saveCustomMessage = (value: IMessage) => {
    setCustomMessage(value);
    setEditMessage(false);
  };

  const ButtonItem = (buttonMessage: IMessage) => (
    <ButtonView>
      <MessageButton
        {...buttonMessage}
        onPress={() => sendToDevice(buttonMessage)}
      />
    </ButtonView>
  );

  return (
    <Fragment>
      <StatusBar backgroundColor={theme.colors.primary.main} />
      <SafeAreaView>
        {editMessage ? (
          <Creator onSave={(value: IMessage) => saveCustomMessage(value)} />
        ) : (
          <View>
            <View>
              <Text>From You:</Text>
              {customMessage ? (
                <ButtonView>
                  <MessageButton
                    {...customMessage}
                    onPress={() => sendToDevice(customMessage)}
                  />
                </ButtonView>
              ) : (
                <Button
                  title="Create Your Own Message"
                  onPress={() => setEditMessage(true)}
                />
              )}
            </View>
            <View>
              <Text>From Artists:</Text>
            </View>
            <FlatList
              contentInsetAdjustmentBehavior="automatic"
              data={FakeData}
              renderItem={({ item }) => <ButtonItem {...item} />}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        )}
      </SafeAreaView>
    </Fragment>
  );
};
export default Home;
