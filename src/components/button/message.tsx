import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../../themes';
// import { lang } from '../lang/en';

interface IProps extends IMessage {
  onPress: () => void;
}

const StyledButton = styled.TouchableOpacity`
  background-color: ${theme.colors.primary.main};
  border-radius: 10px;
  padding: 10px 0;
`;

const StyledText = styled.Text<{ color: string }>`
  color: ${props => (props.color ? props.color : '#fff')};
  font-size: 80px;
  text-align: center;
  text-transform: uppercase;
  font-family: 'dotty';
`;

export const MessageButton: React.FC<IProps> = props => {
  // const { onPress, title = '' } = props;
  return (
    <StyledButton onPress={props.onPress}>
      <StyledText color={props.color}>{props.message}</StyledText>
    </StyledButton>
  );
};
