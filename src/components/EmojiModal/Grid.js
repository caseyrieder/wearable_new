import React from 'react';
import { Button, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { theme, height, width } from '../../themes';
import { emojis } from '../../images/emojis';
import {
  BigFace,
  SmallFace,
  Fire,
  LightningRow,
  HeartsRow,
  BrokenHeartsRow,
  StarsRow,
  ArrowsRow,
} from './Rows';

const Container = styled.View`
  width: ${width}px;
  height: ${height}px;
  flex-direction: column;
  align-items: flex-start;
  top: 17px;
  left: -19px;
  justify-content: center;
  background-color: ${theme.colors.black.dark};
`;

const faceEmojis = emojis.slice(0, 4);
const smallFaceEmoji = emojis[4];
const fireEmoji = emojis[5];
const heartEmojis = emojis.slice(6, 11);
const brokenHeartEmojis = emojis.slice(11, 16);
const starEmojis = emojis.slice(16, 21);
const lightningEmojis = emojis.slice(21, 26);
const upEmojis = emojis.slice(26, 31);
const rightEmojis = emojis.slice(31, 36);
const leftEmojis = emojis.slice(36, 41);
const downEmojis = emojis.slice(41, 46);

const emojiHeight = height / 20;
const heartWidth = emojiHeight * (78 / 77.8);
const brokenHeartWidth = emojiHeight * (89.3 / 77.8);
const starWidth = emojiHeight * (100.6 / 77.8);
const lightningWidth = emojiHeight * (66.6 / 77.8);
const fireWidth = emojiHeight * (55.3 / 77.8);
const arrowWidth = emojiHeight * (100.6 / 77.8);
const bigFaceWidth = emojiHeight * (384.1 / 77.8);
const dimplesWidth = emojiHeight * (225.4 / 77.8);

const wBH = 100.6 / 77.8;

export const EmojiGrid = props => {
  return (
    <Container {...props}>
      <ScrollView>
        {faceEmojis.map(item => {
          return <BigFace item={item} select={props.select} />;
        })}
        <SmallFace item={smallFaceEmoji} select={props.select} />
        <Fire item={fireEmoji} select={props.select} />
        {/* <StarBlue width={50} height={39} /> */}
        <HeartsRow emojis={heartEmojis} select={props.select} />
        <BrokenHeartsRow emojis={brokenHeartEmojis} select={props.select} />
        <StarsRow emojis={starEmojis} select={props.select} />
        <LightningRow emojis={lightningEmojis} select={props.select} />
        <ArrowsRow emojis={upEmojis} select={props.select} />
        <ArrowsRow emojis={downEmojis} select={props.select} />
        <ArrowsRow emojis={leftEmojis} select={props.select} />
        <ArrowsRow emojis={rightEmojis} select={props.select} />
        <Button onPress={() => props.toggleModal()} title="Dismiss" />
      </ScrollView>
    </Container>
  );
};
