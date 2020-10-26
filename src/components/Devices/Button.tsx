import React from 'react';
import styled from 'styled-components/native';

import { theme, height, width } from '../../themes';
// import { lang } from '../lang/en';

interface IProps {
  showDialog: (id: string) => void;
  item: any;
}

const DeviceButton = styled.TouchableOpacity<{ selected: boolean }>`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: ${height * 0.03}px;
  text-align: center;
  font-weight: 600;
  font-family: helvetica;
  color: ${theme.colors.misc.hyperlink};
  padding: 10px;
`;

const Empty = styled.View`
  height: 0px;
  width: ${width}px;
  background-color: transparent;
`;

const BagButton: React.FC<IProps> = props => {
  const { item, showDialog } = props;
  if (!item || !item.name.includes('tyr')) {
    return <Empty />;
  } else {
    return (
      <DeviceButton
        selected={item.connected ? true : false}
        onPress={() => showDialog(item.id)}>
        <Title>item.name</Title>
      </DeviceButton>
    );
  }
};

export default BagButton;
