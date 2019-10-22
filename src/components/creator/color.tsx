import React, { Fragment, useState } from 'react';
import { View, Text, Button, Alert, TextInput } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import styled from 'styled-components/native';

import { theme } from '../../themes';
import { lang } from '../../lang/en';

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
