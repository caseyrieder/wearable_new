import React, { Fragment } from 'react';
import styled from 'styled-components/native';
import { theme, otherColors } from '../../themes';
import Icon from 'react-native-vector-icons/Ionicons';

interface IProps {
  value: number;
  setValue: (value: number) => void;
}

interface IBtnProps {
  num: number;
  value: number;
  iconName: string;
  select: (num: number) => void;
}

const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.grey.light};
  padding: 25px 0 25px;
`;

const ButtonContainer = styled.View`
  background-color: ${theme.colors.grey.main},
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 40px;
  padding: 5px;
`;

const Btn = styled.TouchableOpacity<{ selected: boolean }>`
  background-color: ${props =>
    props.selected ? otherColors.pink : 'transparent'};
  flex: 1;
  height: 30px;
  margin-horizontal: 2px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const SectionLabel = styled.Text`
  font-size: 16px;
`;

const BrightnessBtn: React.FC<IBtnProps> = props => {
  const picked = props.value === props.num ? true : false;
  return (
    <Btn onPress={() => props.select(props.num)} selected={picked}>
      <Icon
        size={30}
        name={props.iconName}
        color={picked ? theme.colors.grey.light : theme.colors.grey.dark}
      />
    </Btn>
  );
};

export const Brightness: React.FC<IProps> = props => {
  return (
    <Fragment>
      <SectionLabel>Adjust Brightness</SectionLabel>
      <Container>
        <ButtonContainer>
          <BrightnessBtn
            num={10}
            value={props.value}
            select={(num: number) => props.setValue(num)}
            iconName="moon-outline"
          />
          <BrightnessBtn
            num={80}
            value={props.value}
            select={(num: number) => props.setValue(num)}
            iconName="sunny-outline"
          />
          <BrightnessBtn
            num={150}
            value={props.value}
            select={(num: number) => props.setValue(num)}
            iconName="sunny"
          />
        </ButtonContainer>
      </Container>
    </Fragment>
  );
};
