import React from 'react';
import styled from 'styled-components/native';
import { theme } from '../../themes';

interface IProps {
  value: number;
  change: (value: number) => void;
}

const getDirection = (value: number) => {
  switch (value) {
    case 0:
      return 'LEFT TO RIGHT';
      break;
    case 2:
      return 'RIGHT TO LEFT';
      break;
    default:
      return 'STATIONARY';
      break;
  }
};

const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 25px 30px 25px;
`;

const HeaderContainer = styled.View`
  padding: 0 0 0 40px;
`;

const LabelContainer = styled.View`
  font-size: 20px;
`;

const LabelButton = styled.TouchableOpacity`
  font-size: 20px;
`;

const LabelText = styled.Text`
  font-size: 20px;
`;

const LabelControlText = styled.Text`
  font-size: 45px;
`;

export const Direction: React.FC<IProps> = props => {
  return (
    <Container>
      <LabelButton onPress={() => props.change(-1)}>
        <LabelControlText>&lt;</LabelControlText>
      </LabelButton>
      <LabelContainer>
        <LabelText>{getDirection(props.value)}</LabelText>
      </LabelContainer>
      <LabelButton onPress={() => props.change(1)}>
        <LabelControlText>&gt;</LabelControlText>
      </LabelButton>
    </Container>
  );
};