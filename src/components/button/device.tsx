import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

import { theme } from '../../themes';
// import { lang } from '../lang/en';

interface IProps {
  onPress: () => void;
  title: string;
}

const StyledButton = styled.TouchableOpacity`
  border: 1;
  padding: 20px 0;
`;

const StyledText = styled.Text`
  text-align: center;
`;

export const DeviceButton: React.FC<IProps> = props => {
  const { onPress, title = '' } = props;
  return (
    <StyledButton onPress={onPress}>
      <StyledText>{title}</StyledText>
    </StyledButton>
  );
};
