import React from 'react';
import { Slider } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../../themes';
import Icon from 'react-native-vector-icons/Entypo';

interface IProps {
  value: number;
  setValue: (value: number) => void;
}

const Container = styled.View`
  display: flex;
  padding: -25px 0 25px;
`;

const LabelContainer = styled.TouchableOpacity`
  font-size: 20px;
  margin-horizontal: 10px;
`;

const LabelText = styled.Text`
  font-size: 20px;
`;

const SliderContainer = styled.View`
  width: 65%;
  font-size: 20px;
  align-items: center;
  justify-content: center;
`;

const StyledSlider = styled.Slider`
  width: 100%;
  height: 10px;
  margin-top: 20px;
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

const IconBtn = styled.TouchableOpacity`
  margin-horizontal: 0px;
  justify-content: center;
  aligbn-items: center;
`;

export const Speed: React.FC<IProps> = props => {
  function slower() {
    if (props.value > 1) {
      props.setValue(props.value - 1);
    }
  }
  function faster() {
    if (props.value < 25) {
      props.setValue(props.value + 1);
    }
  }

  return (
    <Container>
      <SectionLabel>Adjust Animation Speed</SectionLabel>
      <SliderRow>
        <LabelContainer onPress={() => slower()}>
          <LabelText>&gt;</LabelText>
          <Icon
            name="controller-play"
            size={40}
            color={theme.colors.grey.main}
          />
        </LabelContainer>
        <SliderContainer>
          <StyledSlider
            value={props.value}
            step={1}
            minimumValue={1}
            maximumValue={25}
            minimumTrackTintColor={theme.colors.grey.main}
            maximumTrackTintColor={theme.colors.grey.main}
            thumbTintColor={theme.colors.grey.main}
            onValueChange={(val: number) => props.setValue(val)}
          />
          {/* <Slider
            minimumValue={1}
            maximumValue={25}
            minimumTrackTintColor={theme.colors.grey.main}
            maximumTrackTintColor={theme.colors.grey.main}
            thumbTintColor={theme.colors.grey.main}
            onValueChange={props.setValue}
            value={props.value}
            step={1}
          /> */}
        </SliderContainer>
        <LabelContainer onPress={() => faster()}>
          <LabelText>&gt;&gt;</LabelText>
          <Icon
            name="controller-fast-forward"
            size={40}
            color={theme.colors.grey.main}
          />
        </LabelContainer>
      </SliderRow>
    </Container>
  );
};
