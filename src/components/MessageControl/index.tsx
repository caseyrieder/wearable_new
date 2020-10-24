import React, { Fragment, useState, Children, useEffect } from 'react';
import { Text, View, Alert, TextInput } from 'react-native';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import TextTicker from 'react-native-text-ticker';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { EmojiModal, AddEmojiBtn } from '../EmojiModal';

import { stringToChars, stringToBytes, letterToChar } from '../../ble/conversions'

import { theme, width, height } from '../../themes';
import { Message } from '../Message';
import { Brightness } from './brightness';
import { Speed } from './speed';
import { Color } from './color';
import { rgb2Hex } from '../../utils/color';

interface IProps {
  message: IMessage;
  send: (message: IMessage) => boolean;
}

const Container = styled.View`
  display: flex;
  color: ${theme.colors.grey.light};
  padding: 0 0 0 0;
  height: 80%;
`;

const HeaderContainer = styled.View`
  display: flex;
  padding-left: ${width * 0.04}px;
  padding-bottom: ${height * 0.015}px;
`;

const ControlContainer = styled.View`
  background-color: ${theme.colors.grey.light};
  margin: ${height*0.008}px ${width*0.04}px;
  padding: 5px;
  border-radius: ${height*0.02}px;
  border-width: 4px;
  border-color: ${theme.colors.misc.pink};
  height: ${height*0.75}px;
`;

const InputBox = styled.TextInput`
  height: 0;
  color: transparent;
`;

const MessageBox = styled.View`
  background-color: ${theme.colors.black.dark};
  height: ${height*0.15}px;
  margin-top: -1.5%;
  margin-left: -1.5%;
  width: 103%;
  border-top-left-radius: ${height*0.015}px;
  border-top-right-radius: ${height*0.015}px;
`;

const SendButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -2%;
  height: ${height*0.095}px;
  margin-bottom: -1.5%;
  margin-left: -1.5%;
  width: 103%;
  background-color: ${theme.colors.misc.pink};
  border-bottom-left-radius: ${height*0.01}px;
  border-bottom-right-radius: ${height*0.01}px;
`;

const SendButtonText = styled.Text`
  color: ${theme.colors.grey.light};
  font-size: 25px;
`;

const HeaderText = styled.Text`
  color: ${theme.colors.black.dark};
  font-family: Helvetica;
  font-size: 18px;
`;
const Subhead = styled.Text`
  color: ${theme.colors.black.dark};
  font-family: Helvetica;
  font-size: 13px;
`;

const MsgBtns = styled.View`
  flex-direction: row;
  height: ${height*0.03}px;
  width: 35%;
  margin-top: -2%;
  margin-left: 60%;
  justify-content: space-around;
  align-items: center;
`;

const defaultRGB = [128, 128, 128];

export const MessageControl: React.FC<IProps> = props => {
  const messageInputRef = React.createRef<TextInput>();
  const [message, setMessage] = useState('');
  const [messageforBLE, setMessageforBLE] = useState(['']);
  const [color, setColor] = useState('');
  const [speed, setSpeed] = useState(1);
  const [brightness, setBrightness] = useState(80);
  const [areEmojisVisible, setEmojisVisible] = useState(false);
  const [emoji, setEmoji] = useState({});
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    setMessage(props.message.message);
    setColor(props.message.color);
    setSpeed(props.message.speed);
    setBrightness(props.message.brightness);
    messageInputRef.current?.focus();
  }, []);

  const showEmojis = () => {
    setEmojisVisible(true);
  }
  const hideEmojis = () => {
    setEmojisVisible(!areEmojisVisible);
  }

  const toggleTyping = () => {
    messageInputRef.current?.focus();
  }

  const addEmoji = (item: any) => {
    // setEmoji(item.image);
    console.log(`message: ${message}`);
    console.log(`emoji: ${JSON.stringify(item)}`);
    let emojiAscii = item.ascii;
    console.log(`emoji ascii: ${emojiAscii}`)
    let emojiColor = item.color;
    console.log(`emoji color: ${emojiColor}`)
    let emojiAsciiChar = stringToChars(emojiAscii);
    console.log(`emoji asciiChar: ${emojiAsciiChar}`)
    let emojiCode = item.code;
    console.log(`emoji code: ${emojiCode}`);
    let newMsg = message + emojiAscii;
    console.log(`new message: ${newMsg}`)
    messageforBLE.push(item.code);
    let newBytes = stringToBytes(message+item.code);
    console.log('message bytes:', newBytes);
    setMessage(newMsg);
    setMessageforBLE(messageforBLE);
    let charArray = stringToChars(newMsg);
    const intCharArray = (chars: string[]) => {
      let ints: number[] = [];
      chars.forEach(c => {
        let n = parseInt(c);
        ints.push(n)
      })
      return ints;
    }
    console.log('message:', newMsg);
    console.log('message chars:',charArray);
    console.log('message Ints:',intCharArray(charArray));
    console.log('messageforBLE:', messageforBLE);
    let blechars = messageforBLE.map(i => { return stringToChars(i)});
    console.log('messageforBLE chars:', blechars);
    hideEmojis();
  }

  const addLetter = (message: string) => {
    let msgLen = message.length;
    let oldmessage = message.substring(0,msgLen-1).toUpperCase();
    let lastLetter = message.substring(msgLen-1).toUpperCase();
    console.log('message length: ', msgLen);
    console.log('message except latest: ', oldmessage);
    console.log('last message letter:', lastLetter);
    console.log('last message letter code:', lastLetter.charCodeAt(0));
    let newChar = letterToChar(lastLetter);
    console.log(`newChar: ${newChar}`);
    let newInt = parseInt(newChar);
    console.log(`newInt: ${newInt}`);
    let charInt = (newInt >= 97 && newInt <=122) ? newInt-32 : newInt;
    console.log(`charInt: ${charInt}`);
    let ch = charInt.toString();
    console.log(`ch: ${ch}`);
    messageforBLE.push(ch);
    console.log('new array: ', messageforBLE)
    let blechars = messageforBLE.map(i => { return stringToChars(i)});
    console.log('messageforBLE chars:', blechars);
    setMessage(message);
    // let bleMessage = [];
    //  message;
    // console.log('messageforBLE: ', bleMessage);
    // console.log('messageforBLE chars:', stringToChars(bleMessage));
    setMessageforBLE(messageforBLE);
  }

  const removeEmoji = () => {
    setEmoji({});
  }

  const sendMessage = () => {
    const data: IMessage = {
      id: props.message.id,
      message,
      color,
      speed,
      brightness,
      direction: 2,
    };
    props.send(data);
  };

  return (
    <Container>
      <HeaderContainer>
        <HeaderText>From you.</HeaderText>
        <Subhead>Press to upload to your device</Subhead>
        <InputBox
          ref={messageInputRef}
          value={message}
          onChangeText={(text: string) => addLetter(text)}
        />
      </HeaderContainer>
      <ControlContainer>
        <MessageBox>
          <Message
            id={props.message.id}
            message={message}
            color={color}
            speed={speed}
            brightness={brightness}
            onPress={() => toggleTyping()}
            mainPage={true}
          />
          <MsgBtns>
            {/* <AddEmojiBtn onPress={() => showEmojis()} /> */}
            <MCIcon
              name="play-circle-outline"
              size={width * 0.07}
              color={theme.colors.misc.pink}
            />
            <MCIcon
              name="pause-circle-outline"
              size={width * 0.07}
              color={theme.colors.misc.pink}
            />
            <MCIcon
              name="stop-circle-outline"
              size={width * 0.07}
              color={theme.colors.misc.pink}
            />
          </MsgBtns>
        </MessageBox>
        <EmojiModal
          isVisible={areEmojisVisible}
          onDismiss={() => hideEmojis()}
          onSelectEmoji={(item) => addEmoji(item)}
        />
        <TextTicker
          isRTL={false}
          animationType='scroll'
          shouldAnimateTreshold={40}
          marqueeOnMount={true}
          duration={50000/speed}
          style={{color: color, width:300}}
        >
          {message}
        </TextTicker>
        <Color change={value => setColor(value)} value={color} />
        <Brightness value={brightness} setValue={(val: number) => setBrightness(val)} />
        <Speed value={speed} setValue={value => setSpeed(value)} />
        <SendButton onPress={() => sendMessage()}>
          <SendButtonText>SEND</SendButtonText>
        </SendButton>
      </ControlContainer>
    </Container>
  );
};

// Color: {color}/({rgb[0]}, {rgb[1]}, {rgb[2]}) | Brightness: {brightness} | Speed: {speed}
