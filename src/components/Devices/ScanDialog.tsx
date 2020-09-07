
import React from 'react';
import styled from 'styled-components/native';
import Dialog from 'react-native-dialog';

interface IPropsScan {
  visible: boolean;
  scan: () => void;
}

const Container = styled.View`
  padding-top: 60px;
  display: flex;
  align-items: center;
`;

export const ScanDialog = (props: IPropsScan) => {
    const { visible, scan } = props;

    return (
        <Container>
            <Dialog.Container visible={visible}>
              <Dialog.Title>Connect Your Device</Dialog.Title>
              <Dialog.Description>
                Press `Scan` for your Device.
              </Dialog.Description>
              <Dialog.Button label="Scan" onPress={scan} />
            </Dialog.Container>
        </Container>
    );
};

