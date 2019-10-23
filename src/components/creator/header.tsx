import React, { Fragment, useState, Children } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import styled from 'styled-components/native';

import { theme } from '../../themes';
import { lang } from '../../lang/en';

interface IProps {
  selectedItem: number;
}

interface IStepItemProps {
  selected: boolean;
}

const Container = styled.View`
  display: flex;
  flex-direction: row;
  padding: 20px;
`;

const Step = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;

const StepItem = styled.View<IStepItemProps>`
  flex: 1;
  padding: 20px;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.selected ? theme.colors.secondary.dark : theme.colors.secondary.main};
  border-radius: 8px;
`;

const StepItemText = styled.Text`
  color: #fff;
`;

const StepNumber: React.FC<{ selected: boolean }> = props => {
  return (
    <Step>
      <StepItem selected={props.selected}>
        <StepItemText>{props.children}</StepItemText>
      </StepItem>
    </Step>
  );
};

export const Header = ({ selectedItem }: IProps) => {
  return (
    <Container>
      <StepNumber selected={selectedItem === 0}>1</StepNumber>
      <StepNumber selected={selectedItem === 1}>2</StepNumber>
      <StepNumber selected={selectedItem === 2}>3</StepNumber>
    </Container>
  );
};
