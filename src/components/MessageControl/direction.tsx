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
      return 'STATIONARY';
      break;
    case 2:
      return 'RIGHT TO LEFT';
      break;
    default:
      return 'LEFT TO RIGHT';
      break;
  }
};

const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.colors.grey.light};
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

const SectionLabel = styled.Text`
  font-size: 16px;
`;

const LabelControlText = styled.Text`
  font-size: 45px;
`;

export const Direction: React.FC<IProps> = props => {
  return (
    <Container>
      <SectionLabel>Adjust Animation Direction</SectionLabel>
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
