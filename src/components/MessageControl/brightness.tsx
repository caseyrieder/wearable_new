import React, { Fragment } from 'react';
import styled from 'styled-components/native';
import { theme, otherColors, width, height } from '../../themes';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
  flex-direction: column;
  background-color: ${theme.colors.grey.light};
  margin-top: 0px;
  margin-bottom: 15px;
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

const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: ${height / 20}px;
  padding: 0px;
  margin-vertical: ${height * 0.01}px;
  margin-horizontal: ${width * 0.01}px;
  background-color: ${theme.colors.grey.main};
  border-radius: 5px;
`;

const Spacer = styled.View`
  width: 1px;
  height: ${height / 35}px;
  margin: 0px;
  background-color: ${theme.colors.grey.dark};
`;

const Btn = styled.TouchableOpacity<{ selected: boolean }>`
  background-color: ${props =>
    props.selected ? theme.colors.misc.pink : 'transparent'};
  flex: 1;
  height: ${height / 25}px;
  margin-horizontal: 0px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const WhiteFrag = styled(Fragment)`
  background-color: ${theme.colors.grey.light};
`;

const BrightnessBtn: React.FC<IBtnProps> = props => {
  const picked = props.value === props.num ? true : false;
  return (
    <Btn onPress={() => props.select(props.num)} selected={picked}>
      <Icon
        size={width * 0.065}
        name={props.iconName}
        color={picked ? theme.colors.grey.light : theme.colors.grey.dark}
      />
    </Btn>
  );
};

export const Brightness: React.FC<IProps> = props => {
  return (
    <WhiteFrag>
      <Container>
        <SectionLabel>Adjust Brightness</SectionLabel>
        <ButtonContainer>
          <BrightnessBtn
            num={10}
            value={props.value}
            select={(num: number) => props.setValue(num)}
            iconName="brightness-3"
          />
          <Spacer />
          <BrightnessBtn
            num={80}
            value={props.value}
            select={(num: number) => props.setValue(num)}
            iconName="brightness-2"
          />
          <Spacer />
          <BrightnessBtn
            num={150}
            value={props.value}
            select={(num: number) => props.setValue(num)}
            iconName="brightness-1"
          />
        </ButtonContainer>
      </Container>
    </WhiteFrag>
  );
};
