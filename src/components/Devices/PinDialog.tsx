import React, { Fragment, useState } from 'react';
import { Alert, TextInput } from 'react-native';
// import { useNavigation } from 'react-navigation-hooks';
import styled from 'styled-components/native';
import Dialog from 'react-native-dialog';
// import { pairWithMyBag } from '../../ble/communications';

import { theme } from '../../themes';
import { lang } from '../../lang/en';

interface IPropsPin {
  visible: boolean;
  updatePin: (pin: string) => void;
  submit: () => void;
  pin: string;
  close: () => void;
}

const Container = styled.View`
  padding-top: 60px;
  display: flex;
  align-items: center;
`;


export const PinDialog = (props: IPropsPin) => {
    const { visible, pin, updatePin, submit, close } = props;

    return (
        <Container>
            <Dialog.Container visible={visible}>
              <Dialog.Title>Enter Pin</Dialog.Title>
              <Dialog.Description>
                It is on the back of your LED device.
              </Dialog.Description>
              <Dialog.Input label='pin' onChangeText={updatePin} value={pin} />
              <Dialog.Button label="Submit" onPress={submit} />
              <Dialog.Button label="Close" onPress={close} />
            </Dialog.Container>
        </Container>
    );
};

