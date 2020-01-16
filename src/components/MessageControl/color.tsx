import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

import { theme } from '../../themes';

interface IProps {}

const Container = styled.View`
  display: flex;
  color: ${theme.colors.black.main};
  padding: 20px 0 10px;
`;

const HeaderContainer = styled.View`
  padding: 0 0 0 40px;
`;

export const Color: React.FC<IProps> = props => {
  return (
    <Container>
      <Text>Color Placeholder</Text>
    </Container>
  );
};
