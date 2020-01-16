import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

import { theme } from '../../themes';
// import { lang } from '../lang/en';

interface IProps extends IMessage {
  onPress: () => void;
}

const Container = styled.View`
  padding: 15px 20px 0px;
`;

const StyledButton = styled.TouchableOpacity`
  background-color: ${theme.colors.black.main};
  border-radius: 10px;
  padding: 10px 0;
`;

const StyledText = styled.Text<{ color: string }>`
  color: ${props => (props.color ? props.color : '#fff')};
  font-size: 80px;
  text-align: center;
  text-transform: uppercase;
`;

export const Message: React.FC<IProps> = props => {
  return (
    <Container>
      <StyledButton onPress={props.onPress}>
        <StyledText color={props.color}>{props.message}</StyledText>
      </StyledButton>
    </Container>
  );
};

export default Message;
