import React, { Fragment, useState } from 'react';
import { View, Text, Button, Alert, TextInput } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import styled from 'styled-components/native';

import { theme } from '../../themes';
import { lang } from '../../lang/en';

import { AddEmoji } from '../button';


function makeAnAlert() {
  return Alert.alert('alert');
}

interface IProps {
  message: string;
  setMessage: (message: string) => void;
  continue: () => void;
}

const Container = styled.View`
  padding-top: 60px;
  display: flex;
  align-items: center;
`;

export const Message = (props: IProps) => {
  return (
    <Container>
      <TextInput
        onChangeText={text => props.setMessage(text)}
        value={props.message}
        maxLength={10}
      />
      <AddEmoji onPress={makeAnAlert}/>
      <Button title="Continue" onPress={props.continue} />
    </Container>
  );
};
