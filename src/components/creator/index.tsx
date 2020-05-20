import React, { Fragment, useState, Children } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import styled from 'styled-components/native';

import { theme } from '../../themes';
import { lang } from '../../lang/en';

import { Header } from './header';
import { Message } from './message';
import { Color } from './color';
import { Movement } from './movement';

interface IProps {
  onSave: (value: IMessage) => void;
}

const StepDescription = [
  'Enter the text you would like to appear on device',
  'Select the color for your text',
  'Select the direction and speed for your text to move',
];

const DescriptionContainer = styled.View`
  padding: 10px 0;
  display: flex;
  align-items: center;
`;

const DisplayTextContainer = styled.View`
  padding-top: 60px;
  display: flex;
  align-items: center;
`;

// text-transform: uppercase;
const DisplayText = styled.Text<{ color: string }>`
  font-size: 60px;
  font-family: dotty;
  color: ${props =>
    props.color.length === 7 ? props.color : theme.colors.black.dark};
`;

export const Creator: React.FC<IProps> = props => {
  const { onSave } = props;
  const [step, setStep] = useState(0);
  const [message, setMessage] = useState('sample');
  const [color, setColor] = useState(theme.colors.black.dark);
  const [speed, setSpeed] = useState(0);
  const [direction, setDirection] = useState(0);

  const saveSettings = () => {
    onSave({
      id: 0,
      message,
      color,
      speed,
      direction,
    });

    setStep(0);
  };

  return (
    <View>
      <Header selectedItem={step} />
      <DescriptionContainer>
        <Text>{StepDescription[step]}</Text>
      </DescriptionContainer>
      <DisplayTextContainer>
        <DisplayText color={color}>{message}</DisplayText>
      </DisplayTextContainer>
      {step === 0 ? (
        <Message
          message={message}
          setMessage={value => setMessage(value)}
          continue={() => setStep(1)}
        />
      ) : null}
      {step === 1 ? (
        <Color
          color={color}
          setColor={value => setColor(value)}
          continue={() => setStep(2)}
        />
      ) : null}
      {step === 2 ? (
        <Movement
          direction={direction}
          speed={speed}
          setDirection={value => setDirection(value)}
          setSpeed={value => setSpeed(value)}
          continue={() => saveSettings()}
        />
      ) : null}
    </View>
  );
};
