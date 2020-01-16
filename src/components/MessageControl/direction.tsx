import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

interface IProps {}

const Container = styled.View`
  display: flex;
  color: #ffffff;
  padding: 20px 0 10px;
`;

const HeaderContainer = styled.View`
  padding: 0 0 0 40px;
`;

export const Direction: React.FC<IProps> = props => {
  return (
    <Container>
      <Text>&gt; DIRECTION &lt;</Text>
    </Container>
  );
};
