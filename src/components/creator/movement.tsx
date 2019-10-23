import React, { Fragment, useState } from 'react';
import { View, Text, Button, Alert, TextInput, Slider } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import styled from 'styled-components/native';

import { theme } from '../../themes';
import { lang } from '../../lang/en';

interface IProps {
  direction: number;
  speed: number;
  setDirection: (direction: number) => void;
  setSpeed: (speed: number) => void;
  continue: () => void;
}

const Container = styled.View`
  padding-top: 60px;
  display: flex;
  align-items: center;
  width: 100%;
`;

const SliderContainer = styled.View`
  padding: 20px 0 50px;
  display: flex;
  align-items: center;
  width: 100%;
`;

const StyledSlider = styled.Slider`
  width: 200px;
`;

const StyledButton = styled.Button`
  padding 60px;
`;

export const Movement = (props: IProps) => {
  return (
    <Container>
      <SliderContainer>
        <Text>Direction</Text>
        <StyledSlider
          minimumValue={0}
          maximumValue={1}
          step={1}
          onSlidingComplete={value => props.setDirection(value)}
        />
      </SliderContainer>
      <SliderContainer>
        <Text>Speed ({props.speed})</Text>
        <StyledSlider
          minimumValue={0}
          maximumValue={15}
          step={1}
          onSlidingComplete={value => props.setSpeed(value)}
        />
      </SliderContainer>
      <View>
        <StyledButton title="Continue" onPress={props.continue} />
      </View>
    </Container>
  );
};
