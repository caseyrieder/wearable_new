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
  font-family: dotty;
  text-align: center;
  text-transform: uppercase;
  max-width: 100%;
`;

export const Message: React.FC<IProps> = props => {
  return (
    <Container>
      <StyledButton onPress={props.onPress}>
        <StyledText color={props.color} numberOfLines={1}>
          {props.message}
        </StyledText>
      </StyledButton>
    </Container>
  );
};

export default Message;
