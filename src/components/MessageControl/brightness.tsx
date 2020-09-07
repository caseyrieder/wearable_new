import React, { Fragment } from 'react';
import styled from 'styled-components/native';
import { theme, pink } from '../../themes';

interface IProps {
  value: number;
  setValue: (value: number) => void;
}

const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.grey.main};
  padding: 25px 0 25px;
  `;
  
const ButtonContainer = styled.TouchableOpacity<{ selected: boolean}>`
  background-color: ${props => props.selected ? theme.pink : 'transparent'};
  flex: 1;
  justify-content: center;
  align-items: center;
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

const BrightnessBtn = (selected: boolean) => {
  return (
    <ButtonContainer
  )
}

return (
    <View style={styles.buttonContainer}>
      <Button title="Button 1"/>
    </View>
    <View style={styles.buttonContainer}>
      <Button title="Button 2"/>
    </View>
);

export const Brightness: React.FC<IProps> = props => {
  return (
    <Fragment>
      <SectionLabel>Adjust Brightness</SectionLabel>
      <Container>
        <ButtonContainer>
          <LabelText>&gt;</LabelText>
        </ButtonContainer>
        <ButtonContainer>
          <LabelText>&gt;</LabelText>
        </ButtonContainer>
        <ButtonContainer>
          <LabelText>&gt;</LabelText>
        </ButtonContainer>
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
      </Container>
    </Fragment>
  );
};
