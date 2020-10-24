import React from 'react';
import { Slider } from 'react-native';
import styled from 'styled-components/native';
import { theme, width, height } from '../../themes';
import Icon from 'react-native-vector-icons/Entypo';

interface IProps {
  value: number;
  setValue: (value: number) => void;
}

const Container = styled.View`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.grey.light};
  margin-top: ${height*0.015}px;
  margin-bottom: ${height*0.015}px;
  height: 15%;
  width: 100%;
  padding-horizontal: 5%;
`;

const SectionLabel = styled.Text`
  font-size: ${width * 0.03}px;
  margin-left: ${width * 0.01}px;
  margin-top: ${height * 0.02}px;
  margin-bottom: 0px;
  height: ${height * 0.03}px;
  color: ${theme.colors.black.dark};
`;

const LabelContainer = styled.TouchableOpacity`
  font-size: 20px;
  margin-horizontal: ${width*0.015}px;
`;

const LabelText = styled.Text`
  font-size: 20px;
`;

const SliderContainer = styled.View`
  width: 70%;
  font-size: 20px;
  align-items: center;
  justify-content: center;
`;

const StyledSlider = styled.Slider`
  width: 100%;
  height: 10px;
`;

const SliderRow = styled.View`
  flex-direction: row;
  margin-top: -10px;
  width: 95%;
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
          <Icon
            name="controller-play"
            size={40}
            color={theme.colors.grey.dark}
          />
        </LabelContainer>
        <SliderContainer>
          <StyledSlider
            value={props.value}
            step={1}
            minimumValue={1}
            maximumValue={25}
            minimumTrackTintColor={theme.colors.misc.pink}
            maximumTrackTintColor={theme.colors.grey.dark}
            thumbTintColor={theme.colors.misc.pink}
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
          <Icon
            name="controller-fast-forward"
            size={40}
            color={theme.colors.grey.dark}
          />
        </LabelContainer>
      </SliderRow>
    </Container>
  );
};
