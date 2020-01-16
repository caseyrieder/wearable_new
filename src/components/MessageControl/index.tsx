import React, { Fragment, useState, Children, useEffect } from 'react';
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
  padding: 20px 0 0 0;
`;

const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  padding: 0 0 10px 40px;
`;

const ControlContainer = styled.View`
  background-color: ${theme.colors.black.main};
  margin: 5px 20px 0;
  border-radius: 10px;
`;

const InputBox = styled.TextInput`
  height: 0;
`;

const SendButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  background-color: ${theme.colors.primary.main};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const SendButtonText = styled.Text`
  color: #ffffff;
  font-size: 25px;
`;

export const MessageControl: React.FC<IProps> = props => {
  const messageInputRef = React.createRef<TextInput>();
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('');
  const [speed, setSpeed] = useState(1);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    setMessage(props.message.message);
    setColor(props.message.color);
    setSpeed(props.message.speed);
    setDirection(props.message.direction);
  }, []);

  const toggleDirection = () => {
    setDirection(direction === 0 ? 1 : 0);
  };

  const sendMessage = () => {
    const data: IMessage = {
      id: props.message.id,
      message,
      color,
      speed,
      direction,
    };

    Alert.alert('data', JSON.stringify(data));
  };

  return (
    <Container>
      <HeaderContainer>
        <Text>From you.</Text>
        <InputBox
          ref={messageInputRef}
          value={message}
          onChangeText={text => setMessage(text)}
        />
      </HeaderContainer>
      <ControlContainer>
        <Message
          id={props.message.id}
          message={message}
          color={color}
          speed={speed}
          direction={direction}
          onPress={() => {
            messageInputRef.current?.focus();
          }}
        />
        <Speed />
        <Direction value={direction} toggle={() => toggleDirection()} />
        <SendButton onPress={() => sendMessage()}>
          <SendButtonText>SEND</SendButtonText>
        </SendButton>
      </ControlContainer>
    </Container>
  );
};
