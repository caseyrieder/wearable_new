import React from 'react';
import { Slider } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../../themes';
import Fontisto from 'react-native-vector-icons/MaterialCommunityIcons';

MaterialCommunityIcons - rabbit;

interface IProps {
  value: number;
  setValue: (value: number) => void;
}

const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.grey.light};
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

const SectionLabel = styled.Text`
  font-size: 16px;
`;

export const Speed: React.FC<IProps> = props => {
  return (
    <Container>
      <SectionLabel>Adjust Animation Speed</SectionLabel>
      <LabelContainer>
        <LabelText>&gt;</LabelText>
      </LabelContainer>
      <SliderContainer>
        <Slider
          minimumValue={1}
          maximumValue={50}
          minimumTrackTintColor={theme.colors.black.main}
          maximumTrackTintColor={theme.colors.black.main}
          thumbTintColor={theme.colors.black.main}
          onValueChange={props.setValue}
          value={props.value}
          step={1}
        />
      </SliderContainer>
      <LabelContainer>
        <LabelText>&gt;&gt;</LabelText>
      </LabelContainer>
    </Container>
  );
};
