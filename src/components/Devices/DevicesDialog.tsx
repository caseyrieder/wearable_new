import React from 'react';
import styled from 'styled-components/native';
import Dialog from 'react-native-dialog';

interface IPropsScan {
  visible: boolean;
  connect: (id: string) => void;
  devices: any[];
}

const Container = styled.View`
  padding-top: 60px;
  display: flex;
  align-items: center;
`;

export const DevicesDialog = (props: IPropsScan) => {
  const { visible, connect, devices } = props;

  function renderBtns() {
    devices.map(d => {
      return (
        <Dialog.Button
          label={d.name}
          key={d.id}
          onPress={() => connect(d.id)}
        />
      );
    });
  }
  // <Dialog.Button label="Scan For Your Device" onPress={connect} />

  return (
    <Container>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Select Your Device</Dialog.Title>
        <Dialog.Description>
          Your device should be named `tyr` with four digits behind.
        </Dialog.Description>
        {renderBtns}
      </Dialog.Container>
    </Container>
  );
};
