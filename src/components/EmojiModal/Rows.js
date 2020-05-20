import React from 'react';
import styled from 'styled-components/native';
import { height, width } from '../../themes';

const rowHeight = height / 14;
const rowWidth = width * 0.9;
const colWidth = (rowWidth - 30) / 5;
// interface IPropsItem {
//     code: string;
//     hex: string;
//     image: object;
//     // onPress:(code: string) => boolean;
// }

// type IPropsEmojis = IPropsItem[];

const Row = styled.View`
  display: flex;
  flex-direction: row;
  height: ${rowHeight}px;
  margin-vertical: 5px;
  padding-left: 5px;
  background-color: transparent;
  align-items: flex-start;
  justify-content: flex-start;
`;
const Item = styled.TouchableOpacity`
  align-items: flex-start;
  justify-content: flex-start;
`;

const Column = styled.View`
  width: ${colWidth}px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const Icon = styled.Image`
  align-self: center;
  flex: 1;
`;

const BigFaceIcon = styled(Icon)`
  width: ${rowWidth * 0.6}px;
`;

const SmallFaceIcon = styled(Icon)`
  width: ${rowWidth * 0.35}px;
  margin-right: 30px;
`;

const EmojiIcon = styled(Icon)`
  width: ${rowWidth * 0.15}px;
`;
const LightningIcon = styled(Icon)`
  width: ${rowWidth * 0.12}px;
`;

const FireIcon = styled(Icon)`
  width: ${rowWidth * 0.1}px;
  margin-left: 25px;
`;

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

const Emoji = props => {
  const { item, select } = props;
  return (
    <Item onPress={() => select(item)}>
      <EmojiIcon source={item.image} />
    </Item>
  );
};
const Bolt = props => {
  const { item, select } = props;
  return (
    <Item onPress={() => select(item)}>
      <LightningIcon source={item.image} />
    </Item>
  );
};

export const BigFace = props => {
  const { item, select } = props;
  return (
    <Row>
      <Item key={item.index} onPress={() => select(item)}>
        <BigFaceIcon source={item.image} />
      </Item>
    </Row>
  );
};

export const SmallFace = props => {
  const { item, select } = props;
  return (
    <Row>
      <Item key={item.index} onPress={() => select(item)}>
        <SmallFaceIcon source={item.image} />
      </Item>
    </Row>
  );
};

export const SmallFaceAndFire = props => {
  const { items, select } = props;
  return (
    <Row>
      <Item key={items[0].index} onPress={() => select(items[0])}>
        <SmallFaceIcon source={items[0].image} />
      </Item>
      <Item key={items[1].index} onPress={() => select(items[1])}>
        <FireIcon source={items[1].image} />
      </Item>
    </Row>
  );
};

export const Fire = props => {
  const { item, select } = props;
  return (
    <Row>
      <Item key={item.index} onPress={() => select(item)}>
        <FireIcon source={item.image} />
      </Item>
    </Row>
  );
};

export const FiveXRow = props => {
  const { emojis, select } = props;
  // console.log(`fiveX props ${JSON.stringify(props)}`)
  return (
    <Row>
      {emojis.map(emoji => {
        return (
          <Column key={emoji.index}>
            <Emoji item={emoji} select={select} />
          </Column>
        );
      })}
    </Row>
  );
};
export const LightningRow = props => {
  const { emojis, select } = props;
  // console.log(`fiveX props ${JSON.stringify(props)}`)
  return (
    <Row>
      {emojis.map(emoji => {
        return (
          <Column key={emoji.index}>
            <Bolt item={emoji} select={select} />
          </Column>
        );
      })}
    </Row>
  );
};
