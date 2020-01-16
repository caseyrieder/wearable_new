import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

interface IProps {}

const Container = styled.View`
  display: flex;
  background-color: #ffffff;
  padding: 20px 0 10px;
`;

const HeaderContainer = styled.View`
  padding: 0 0 0 40px;
`;

export const Speed: React.FC<IProps> = props => {
  return (
    <Container>
      <Text>SPEED &gt; &gt;</Text>
    </Container>
  );
};
