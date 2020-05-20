import React from 'react';
import { Button, TextInput } from 'react-native';
import styled from 'styled-components/native';

interface IProps {
  color: string;
  setColor: (color: string) => void;
  continue: () => void;
}

const Container = styled.View`
  padding-top: 60px;
  display: flex;
  align-items: center;
`;

export const Color = (props: IProps) => {
  return (
    <Container>
      <TextInput
        onChangeText={text => props.setColor(text)}
        value={props.color}
        maxLength={10}
      />
      <Button title="Continue" onPress={props.continue} />
    </Container>
  );
};
