import React, { Fragment, useState, Children, useEffect } from 'react';
import { Text, View, Alert, TextInput } from 'react-native';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';

import { EmojiModal, AddEmojiBtn } from '../EmojiModal';

import { stringToChars, stringToBytes, letterToChar } from '../../ble/conversions'

import { theme } from '../../themes';
import { Message } from '../Message';
import { Brightness } from './brightness';
import { Speed } from './speed';
import { Color } from './color';

interface IProps {
  message: IMessage;
  send: (message: IMessage) => boolean;
}

const Container = styled.View`
  display: flex;
  color: ${theme.colors.grey.light};
  padding: 20px 0 0 0;
`;

const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  padding: 0 0 10px 40px;
`;

const ControlContainer = styled.View`
  background-color: ${theme.colors.black.main};
  margin: 5px 20px 0;
  padding: 5px;
  border-radius: 10px;
`;

const InputBox = styled.TextInput`
  height: 0;
`;

const SendButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  background-color: ${theme.colors.primary.main};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const SendButtonText = styled.Text`
  color: ${theme.colors.grey.light};
  font-size: 25px;
`;

export const MessageControl: React.FC<IProps> = props => {
  const messageInputRef = React.createRef<TextInput>();
  const [message, setMessage] = useState('');
  const [messageforBLE, setMessageforBLE] = useState(['']);
  const [color, setColor] = useState('');
  const [speed, setSpeed] = useState(1);
  const [brightness, setBrightness] = useState(80);
  const [areEmojisVisible, setEmojisVisible] = useState(false);
  const [emoji, setEmoji] = useState({});

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
      color: '#00FF55',
      speed,
      brightness,
    };
    props.send(data);
  };

  return (
    <Container>
      <HeaderContainer>
        <Text>From you.</Text>
        <InputBox
          ref={messageInputRef}
          value={message}
          onChangeText={(text) => addLetter(text)}
        />
      </HeaderContainer>
      <ControlContainer>
        <View style={{ flexDirection: 'row'}}>
          <Message
            id={props.message.id}
            message={message}
            color={color}
            speed={speed}
            brightness={brightness}
            onPress={() => {
              messageInputRef.current?.focus();
            }}
          />
          {/* <InlineImage source={emoji} onPress={() => removeEmoji()} /> */}
        </View>
        <AddEmojiBtn onPress={() => showEmojis()} />
        <EmojiModal
          isVisible={areEmojisVisible}
          onDismiss={() => hideEmojis()}
          onSelectEmoji={(item) => addEmoji(item)}
        />
        <Text style={{color: color}}>Color: {color} | Brightness: {brightness} | Speed: {speed}</Text>
        <Color change={value => setColor(value)} />
        <Brightness value={brightness} setValue={(val: number) => setBrightness(val)} />
        <Speed value={speed} setValue={value => setSpeed(value)} />
        <SendButton onPress={() => sendMessage()}>
          <SendButtonText>SEND</SendButtonText>
        </SendButton>
      </ControlContainer>
    </Container>
  );
};
