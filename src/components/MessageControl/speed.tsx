import React from 'react';
import { Slider } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../../themes';

interface IProps {}

const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding: 25px 0 25px;
`;

const LabelContainer = styled.View`
  font-size: 20px;
`;

const LabelText = styled.Text`
  font-size: 20px;
`;

const SliderContainer = styled.View`
  width: 220px;
  font-size: 20px;
`;

export const Speed: React.FC<IProps> = props => {
  return (
    <Container>
      <LabelContainer>
        <LabelText>SPEED &gt;</LabelText>
      </LabelContainer>
      <SliderContainer>
        <Slider
          minimumValue={1}
          maximumValue={100}
          minimumTrackTintColor={theme.colors.black.main}
          maximumTrackTintColor={theme.colors.black.main}
          thumbTintColor={theme.colors.black.main}
        />
      </SliderContainer>
      <LabelContainer>
        <LabelText>&gt;&gt;</LabelText>
      </LabelContainer>
    </Container>
  );
};
