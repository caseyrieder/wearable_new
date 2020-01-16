import React from 'react';
import styled from 'styled-components/native';
import { theme } from '../../themes';

interface IProps {
  value: number;
  toggle: () => void;
}

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
      <LabelButton onPress={props.toggle}>
        <LabelControlText>&lt;</LabelControlText>
      </LabelButton>
      <LabelContainer>
        <LabelText>
          {props.value === 0 ? 'LEFT TO RIGHT' : 'RIGHT TO LEFT'}
        </LabelText>
      </LabelContainer>
      <LabelButton onPress={props.toggle}>
        <LabelControlText>&gt;</LabelControlText>
      </LabelButton>
    </Container>
  );
};
