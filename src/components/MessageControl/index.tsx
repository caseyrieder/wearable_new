import React, { Fragment, useState, Children } from 'react';
import { View, Text, Button, Alert, TextInput } from 'react-native';
import styled from 'styled-components/native';

import { theme } from '../../themes';
import { Message } from '../Message';
import { Direction } from './direction';
import { Speed } from './speed';
import { Color } from './color';

interface IProps {
  message: IMessage;
  send: (message: IMessage) => boolean;
}

const Container = styled.View`
  display: flex;
  color: #ffffff;
  padding: 20px 0 10px;
`;

const HeaderContainer = styled.View`
  padding: 0 0 0 40px;
`;

const ControlContainer = styled.View`
  background-color: ${theme.colors.black.main};
  margin: 5px 20px 0;
  border-radius: 10px;
`;

export const MessageControl: React.FC<IProps> = props => {
  return (
    <Container>
      <HeaderContainer>
        <Text>From you.</Text>
      </HeaderContainer>
      <ControlContainer>
        <Message {...props.message} onPress={() => {}} />
        <Color />
        <Speed />
        <Direction />
      </ControlContainer>
    </Container>
  );
};
