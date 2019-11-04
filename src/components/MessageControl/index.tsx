import React, { Fragment, useState, Children } from 'react';
import { View, Text, Button, Alert, TextInput } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import styled from 'styled-components/native';

interface IProps {
  text: string;
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

export const MessageControl: React.FC<IProps> = props => {
  return (
    <Container>
      <HeaderContainer>
        <Text>From you.</Text>
      </HeaderContainer>
    </Container>
  );
};
