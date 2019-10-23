import React, { Fragment } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Text,
  Alert,
} from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import styled from 'styled-components/native';
import { DeviceButton } from '../components/button';

import { theme } from '../themes';
import { lang } from '../lang/en';

interface IDeviceItems {
  name: string;
  settings: string;
}

const Header = styled.View`
  background-color: ${theme.colors.primary.main};
  padding: 60px 0;
`;

const HeaderTitle = styled.Text`
  text-align: center;
  text-transform: uppercase;
  font-size: 30px;
`;

const HeaderDescription = styled.Text`
  text-align: center;
  font-size: 18px;
`;

const ItemContainer = styled.View`
  padding: 30px 30px 0;
`;

const FakeData = [
  { name: 'Device Number 1', settings: 'blah' },
  { name: 'Device Number 2', settings: 'blah' },
  { name: 'Device Number 3', settings: 'blah' },
  { name: 'Device Number 4', settings: 'blah' },
  { name: 'Device Number 5', settings: 'blah' },
  { name: 'Device Number 6', settings: 'blah' },
  { name: 'Device Number 7', settings: 'blah' },
  { name: 'Device Number 8', settings: 'blah' },
  { name: 'Device Number 9', settings: 'blah' },
  { name: 'Device Number 10', settings: 'blah' },
  { name: 'Device Number 11', settings: 'blah' },
  { name: 'Device Number 12', settings: 'blah' },
  { name: 'Device Number 13', settings: 'blah' },
];

const Connection = () => {
  const { navigate } = useNavigation();

  const Item = ({ name, settings }: IDeviceItems) => (
    <ItemContainer>
      <DeviceButton title={name} onPress={() => navigate('home')} />
    </ItemContainer>
  );

  const demoData = {
    message: 'genau!!!',
    color: '#57fe5a',
    speed: 25,
    direction: 1,
  };

  const demo = () => {
    Alert.alert('data sent to bag', JSON.stringify(demoData));
  };

  return (
    <Fragment>
      <StatusBar backgroundColor={theme.colors.primary.main} />
      <SafeAreaView>
        <Header>
          <HeaderTitle>{lang.screen.connect.title}</HeaderTitle>
          <HeaderDescription>
            {lang.screen.connect.instructionsLine1}
          </HeaderDescription>
          <HeaderDescription>
            {lang.screen.connect.instructionsLine2}{' '}
            {lang.screen.connect.deviceName}
          </HeaderDescription>
        </Header>
        <FlatList
          contentInsetAdjustmentBehavior="automatic"
          data={FakeData}
          renderItem={({ item }) => <Item {...item} />}
          keyExtractor={item => item.name}
        />
      </SafeAreaView>
    </Fragment>
  );
};

export default Connection;
