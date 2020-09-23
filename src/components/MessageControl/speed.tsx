import React from 'react';
import { Slider } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../../themes';
import Icon from 'react-native-vector-icons/Ionicons';

interface IProps {
  value: number;
  setValue: (value: number) => void;
}

const Container = styled.View`
  display: flex;
  padding: -25px 0 25px;
`;

const LabelContainer = styled.View`
  font-size: 20px;
  margin-horizontal: 10px;
`;

const LabelText = styled.Text`
  font-size: 20px;
`;

const SliderContainer = styled.View`
  width: 65%;
  font-size: 20px;
  margin-top: 25px;
`;

const SectionLabel = styled.Text`
  font-size: 16px;
  margin-horizontal: 10px;
  margin-top: 30px;
  margin-bottom: 10px;
  color: ${theme.colors.grey.main};
`;

const SliderRow = styled.View`
  flex-direction: row;
  margin-top: -10px;
`;

export const Speed: React.FC<IProps> = props => {
  return (
    <Container>
      <SectionLabel>Adjust Animation Speed</SectionLabel>
      <SliderRow>
        <LabelContainer>
          <LabelText>&gt;</LabelText>
          <Icon name="walk" size={40} color={theme.colors.grey.main} />
        </LabelContainer>
        <SliderContainer>
          <Slider
            minimumValue={1}
            maximumValue={25}
            minimumTrackTintColor={theme.colors.grey.main}
            maximumTrackTintColor={theme.colors.grey.main}
            thumbTintColor={theme.colors.grey.main}
            onValueChange={props.setValue}
            value={props.value}
            step={1}
          />
        </SliderContainer>
        <LabelContainer>
          <LabelText>&gt;&gt;</LabelText>
          <Icon name="rocket" size={40} color={theme.colors.grey.main} />
        </LabelContainer>
      </SliderRow>
    </Container>
  );
};
