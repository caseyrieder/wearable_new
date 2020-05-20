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
  justify-content: flex-start;
  align-items: center;
  background-color: ${props =>
    props.selected ? theme.colors.primary.dark : 'transparent'};
  border-color: ${props => (props.selected ? '#81F7FD' : 'transparent')};
  border-width: ${props => (props.selected ? 1 : 'transparent')};
  height: ${height / 10}px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-family: SuisseIntlMono;
  text-align: center;
  color: ${theme.colors.black.dark};
  font-family: SuisseIntlMono;
`;

const Empty = styled.View`
  height: 0px;
  width: ${width}px;
  background-color: transparent;
`;

const BagButton: React.FC<IProps> = props => {
  const { item, showDialog } = props;
  if (!item || !item.name.includes('ype your reply')) {
    return <Empty />;
  } else {
    return (
      <DeviceButton
        selected={item.connected ? true : false}
        onPress={() => showDialog(item.id)}>
        <Title>KonigArvida</Title>
      </DeviceButton>
    );
  }
};

export default BagButton;
