import React from 'react';
import { ImageProps, View, Text, Button } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../../themes';
import { emojis } from '../../images/emojis';
import { SingleRow, FiveXRow } from './Rows'

interface IProps {
  close: () => void;
}

const IconContainer = styled.View`
  padding: 5px;
  height: 25px;
`;

const EmojiGrid: React.FC<IProps> = props => {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#202020' }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <SingleRow code={emojis[5].code} image={emojis[5].image} />
      <Button onPress={props.close} title="Dismiss" />
    </View>
  );
};

export default EmojiGrid;
