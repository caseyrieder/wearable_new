import React from 'react';
import { Text, Button, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../../themes';
import { emojis } from '../../images/emojis';
import { BigFace, FiveXRow, SmallFaceAndFire } from './Rows';

const Container = styled.View`
  width: 100%;
  height: 100%;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 15px;
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

export const EmojiGrid = props => {
  return (
    <Container {...props}>
      <ScrollView>
        <Text style={{ fontSize: 30 }}>This is a modal!</Text>
        {faceEmojis.map(item => {
          return <BigFace item={item} select={props.select} />;
        })}
        <SmallFaceAndFire
          items={[smallFaceEmoji, fireEmoji]}
          select={props.select}
        />
        <FiveXRow emojis={heartEmojis} select={props.select} />
        <FiveXRow emojis={brokenHeartEmojis} select={props.select} />
        <FiveXRow emojis={starEmojis} select={props.select} />
        <FiveXRow emojis={lightningEmojis} select={props.select} />
        <FiveXRow emojis={upEmojis} select={props.select} />
        <FiveXRow emojis={rightEmojis} select={props.select} />
        <FiveXRow emojis={leftEmojis} select={props.select} />
        <Button onPress={() => props.toggleModal()} title="Dismiss" />
      </ScrollView>
    </Container>
  );
};
