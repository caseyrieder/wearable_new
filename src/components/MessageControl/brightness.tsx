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
  padding: 25px 0 10px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 50px;
  padding: 0px;
  margin: 5px;
`;

const Spacer = styled.View`
  width: 1px;
  height: 30px;
  margin: 0px;
  background-color: ${theme.colors.grey.dark};
`;

const Btn = styled.TouchableOpacity<{ selected: boolean }>`
  background-color: ${props =>
    props.selected ? otherColors.pink : 'transparent'};
  flex: 1;
  height: 50px;
  margin-horizontal: 0px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const SectionLabel = styled.Text`
  font-size: 16px;
  margin-left: 10px;
  margin-top: 30px;
  margin-bottom: -10px;
  color: ${theme.colors.grey.main};
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
            iconName="moon"
          />
          <Spacer />
          <BrightnessBtn
            num={80}
            value={props.value}
            select={(num: number) => props.setValue(num)}
            iconName="partly-sunny"
          />
          <Spacer />
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
