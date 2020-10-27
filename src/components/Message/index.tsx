import React, { useState } from 'react';
import { Text } from 'react-native';
import TextTicker from 'react-native-text-ticker';
import styled from 'styled-components/native';
import { emojis } from '../../images/emojis';
import { theme, width, height } from '../../themes';
import Icon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';

// (AntIcon = pausecircleo), playcircleo;
// FeatherIcon = stop - circle;

// import { lang } from '../lang/en';

interface IProps extends IMessage {
  onPress: () => void;
  bordered: boolean;
  mainPage: boolean;
}

const Container = styled.View`
  padding: 3% 3% 0px;
  flex-direction: row;
`;

const StyledButton = styled.TouchableOpacity<{ bordered: boolean }>`
  background-color: ${theme.colors.black.main};
  border-radius: 10px;
  padding-top: ${height * 0.02}px;
  padding-bottom: ${height * 0.01}px;
  padding-left: ${width * 0.01}px;
  padding-right: ${width * 0.05}px;
  width: 100%;
  border-color: ${props =>
    props.bordered ? theme.colors.misc.pink : 'transparent'};
  border-width: 4px;
`;

const StyledText = styled.Text<{ color: string }>`
  color: ${props => (props.color ? props.color : theme.colors.grey.light)};
  font-family: CompleteDottyRegular;
  text-align: left;
  text-transform: uppercase;
  max-width: 100%;
  font-size: ${height / 10};
  z-index: 5;
`;

const StyledTicker = styled(TextTicker)<{ color: string }>`
  color: ${props => (props.color ? props.color : theme.colors.grey.light)};
  font-family: CompleteDottyRegular;
  font-size: ${height / 10}px;
  text-align: left;
  text-transform: uppercase;
  max-width: ${width};
  max-height: ${height / 8}px;
`;

const TickerContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: -2.5%;
`;

const TickerBtn = styled.TouchableOpacity`
  margin-left: -${width * 0.07}px;
  width: ${width * 0.08}px;
  height: ${width * 0.08}px;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
`;

const TextContainer = styled.View`
  flex: 1;
  width: 100%;
`;

const MsgBtns = styled.View`
  flex-direction: row;
  height: ${height * 0.03}px;
  width: 30%;
  margin-left: 70%;
  justify-content: center;
  align-items: center;
`;

export const Message: React.FC<IProps> = props => {
  const [isPlaying, setPlaying] = useState(false);
  const [isStopped, setStopped] = useState(true);

  function emoClr(ltr: string) {
    let item = emojis.find(e => e.ascii === ltr);
    if (!item) {
      return props.color;
    } else {
      return item.color;
    }
  }

  function togglePlaying() {
    setPlaying(!isPlaying);
    setStopped(false);
  }

  function toggleStop() {
    setStopped(true);
  }

  function renderArray(msg: string, color: string) {
    let displayedArray: JSX.Element[] = [];
    const messageArray = msg.split('');
    const letters =
      '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()<>,.;:"[{]}=+-_/?`~' + "'";
    messageArray.map(ltr => {
      let item: JSX.Element;
      if (letters.includes(ltr)) {
        item = <StyledText color={color}>{ltr}</StyledText>;
      } else {
        item = <StyledText color={emoClr(ltr)}>{ltr}</StyledText>;
      }
      displayedArray.push(item);
    });
    return displayedArray;
  }

  // const tickerStyle = {
  //   fontFamily: 'CompleteDottyRegular',
  //   fontSize: 70,
  //   textAlign: 'left',
  //   textTransform: 'uppercase',
  //   maxWidth: width,
  //   maxHeight: 95,
  //   width: 300,
  // };

  function renderText() {
    if (!isStopped) {
      return (
        <TextTicker
          isRTL={false}
          animationType="scroll"
          shouldAnimateTreshold={40}
          marqueeOnMount={true}
          duration={isPlaying ? 50000 / props.speed : 100000000}
          style={{ fontSize: 40 }}
          // eslint-disable-next-line react-native/no-inline-styles
        >
          {renderArray(props.message, props.color)}
        </TextTicker>
      );
    } else {
      return (
        <StyledText color={props.color} numberOfLines={1}>
          {renderArray(props.message, props.color)}
        </StyledText>
      );
    }
    // if (isStopped) {
    //   return (
    //     <StyledText color={props.color} numberOfLines={1}>
    //       {renderArray(props.message, props.color)}
    //     </StyledText>
    //   );
    // } else {
    // let coloredText = { color: props.color, ...tickerStyle };
    // return (
    //   <TextTicker
    //     isRTL={false}
    //     animationType="scroll"
    //     shouldAnimateTreshold={40}
    //     marqueeOnMount={true}
    //     duration={3000}>
    //     {renderArray(props.message, props.color)}
    //   </TextTicker>
    // );
    // }
  }

  return (
    <Container>
      <StyledButton bordered={props.bordered} onPress={props.onPress}>
        {renderText()}
      </StyledButton>
      {/* {props.mainPage ? (
        <MsgBtns>
          <TickerBtn onPress={() => togglePlaying()}>
            <AntIcon
              name={'playcircleo'}
              size={width * 0.04}
              color={theme.colors.misc.pink}
            />
          </TickerBtn>
          <TickerBtn onPress={() => togglePlaying()}>
            <AntIcon
              name={'pausecircleo'}
              size={width * 0.04}
              color={theme.colors.misc.pink}
            />
          </TickerBtn>
          <TickerBtn onPress={() => toggleStop()}>
            <AntIcon
              name={'stopcircle'}
              size={width * 0.04}
              color={theme.colors.misc.pink}
            />
          </TickerBtn>
        </MsgBtns>
      ) : ( */}
      <TickerContainer>
        <TickerBtn onPress={() => togglePlaying()}>
          <AntIcon
            name={isPlaying ? 'pause-circle-outline' : 'play-circle-outline'}
            size={20}
            color={theme.colors.misc.pink}
          />
        </TickerBtn>
        <TickerBtn onPress={() => toggleStop()}>
          <AntIcon
            name={'stop-circle-outline'}
            size={20}
            color={theme.colors.misc.pink}
          />
        </TickerBtn>
      </TickerContainer>
      {/* )} */}
    </Container>
  );
};
// export const Message: React.FC<IProps> = props => {
//   const letters = props.message.split('');
//   return (
//     <Container>
//       <StyledButton onPress={props.onPress}>
//         <StyledText color={props.color} numberOfLines={1}>
//           {props.message}
//         </StyledText>
//       </StyledButton>
//     </Container>
//   );
// };

export default Message;
