import React, { Fragment, useState } from 'react';
import { View, Text, Button, Alert, TextInput, Slider } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import styled from 'styled-components/native';

import { theme } from '../../themes';
import { lang } from '../../lang/en';

interface IProps {
  brightness: number;
  setBrightness: (brightness: number) => void;
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

export const Brightness = (props: IProps) => {
  return (
    <Container>
      <SliderContainer>
        <Text>Brightness</Text>
        <StyledSlider
          minimumValue={10}
          maximumValue={150}
          step={70}
          onSlidingComplete={value => props.setBrightness(value)}
        />
      </SliderContainer>
      <View>
        <StyledButton title="Continue" onPress={props.continue} />
      </View>
    </Container>
  );
};
