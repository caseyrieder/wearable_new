import React from 'react';
import styled from 'styled-components/native';
import { height, width } from '../../themes';

const emojiHeight = height / 30;
const heartWidth = emojiHeight * (100 / 70);
const brokenHeartWidth = emojiHeight * (120 / 75);
const lightningWidth = emojiHeight * (110 / 100);
const fireWidth = emojiHeight * (55.3 / 77.8) + 5;
const starWidth = emojiHeight * (120 / 70);
const arrowWidth = emojiHeight * (120 / 70);
const bigFaceWidth = emojiHeight * (700 / 100);
const dimplesWidth = emojiHeight * (400 / 100);

const rowHeight = height / 16;
const rowWidth = width * 0.9;
const colWidth = (width * 0.9) / 5;
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
  height: ${emojiHeight + 10}px;
  margin-vertical: ${height * 0.01}px;
  padding-left: ${width * 0.01}px;
  background-color: transparent;
  align-items: flex-start;
  justify-content: space-between;
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
  width: ${bigFaceWidth}px;
`;
const SmallFaceIcon = styled(Icon)`
  width: ${dimplesWidth}px;
`;

const LightningIcon = styled(Icon)`
  width: ${lightningWidth}px;
`;
const HeartIcon = styled(Icon)`
  width: ${heartWidth}px;
`;
const BrokenHeartIcon = styled(Icon)`
  width: ${brokenHeartWidth}px;
`;

const StarIcon = styled(Icon)`
  width: ${starWidth}px;
`;
const ArrowIcon = styled(Icon)`
  width: ${arrowWidth}px;
`;
const FireIcon = styled(Icon)`
  width: ${fireWidth}px;
`;

const EmojiIcon = styled(Icon)`
  width: ${rowWidth * 0.15}px;
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

const Heart = props => {
  const { item, select } = props;
  return (
    <Item onPress={() => select(item)}>
      <HeartIcon source={item.image} />
    </Item>
  );
};

const BrokenHeart = props => {
  const { item, select } = props;
  return (
    <Item onPress={() => select(item)}>
      <BrokenHeartIcon source={item.image} />
    </Item>
  );
};

const Star = props => {
  const { item, select } = props;
  return (
    <Item onPress={() => select(item)}>
      <StarIcon source={item.image} />
    </Item>
  );
};

const Arrow = props => {
  const { item, select } = props;
  return (
    <Item onPress={() => select(item)}>
      <ArrowIcon source={item.image} />
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
export const HeartsRow = props => {
  const { emojis, select } = props;
  // console.log(`fiveX props ${JSON.stringify(props)}`)
  return (
    <Row>
      {emojis.map(emoji => {
        return (
          <Column key={emoji.index}>
            <Heart item={emoji} select={select} />
          </Column>
        );
      })}
    </Row>
  );
};
export const BrokenHeartsRow = props => {
  const { emojis, select } = props;
  // console.log(`fiveX props ${JSON.stringify(props)}`)
  return (
    <Row>
      {emojis.map(emoji => {
        return (
          <Column key={emoji.index}>
            <BrokenHeart item={emoji} select={select} />
          </Column>
        );
      })}
    </Row>
  );
};
export const StarsRow = props => {
  const { emojis, select } = props;
  // console.log(`fiveX props ${JSON.stringify(props)}`)
  return (
    <Row>
      {emojis.map(emoji => {
        return (
          <Column key={emoji.index}>
            <Star item={emoji} select={select} />
          </Column>
        );
      })}
    </Row>
  );
};
export const ArrowsRow = props => {
  const { emojis, select } = props;
  // console.log(`fiveX props ${JSON.stringify(props)}`)
  return (
    <Row>
      {emojis.map(emoji => {
        return (
          <Column key={emoji.index}>
            <Arrow item={emoji} select={select} />
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
