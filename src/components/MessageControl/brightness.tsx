import React, { Fragment } from 'react';
import styled from 'styled-components/native';
import { theme, pink } from '../../themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';

Fontisto - day-sunny
Ionicons - sunny-outline
Ionicons - moon-outline

interface IBtnProps {
  value: number;
  setValue: (value: number) => void;
  num: number;
  iconName: string;
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
  background-color: ${props => props.selected ? pink : 'transparent'};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LabelText = styled.Text`
  font-size: 20px;
`;

const SectionLabel = styled.Text`
  font-size: 16px;
`;

const BrightnessBtn: React.FC<IBtnProps> = props => {
  const picked = props.value === props.num ? true : false;
  return (
    <ButtonContainer
      onPress={props.setValue(props.num)}
      selected={picked}
    >
      <Icon size={30} name={props.iconName} color={picked ? theme.colors.grey.light : theme.colors.grey.dark} />
    </ButtonContainer>
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
