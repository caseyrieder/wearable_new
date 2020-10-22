import React, { useState } from 'react';
import { Text } from 'react-native';
import TextTicker from 'react-native-text-ticker';
import styled from 'styled-components/native';
import { emojis } from '../../images/emojis';
import Icon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';

// (AntIcon = pausecircleo), playcircleo;
// FeatherIcon = stop - circle;

import { theme, width, height } from '../../themes';
// import { lang } from '../lang/en';

interface IProps extends IMessage {
  onPress: () => void;
  bordered: boolean;
}

const Container = styled.View`
  padding: 15px 20px 0px;
  flex-direction: row;
`;

const StyledButton = styled.TouchableOpacity<{ bordered: boolean }>`
  background-color: ${theme.colors.black.main};
  border-radius: 10px;
  padding-top: ${height * 0.01}px;
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
  font-size: 70px;
  text-align: left;
  text-transform: uppercase;
  max-width: 100%;
  max-height: 95px;
  z-index: 5;
`;

const StyledTicker = styled(TextTicker)<{ color: string }>`
  color: ${props => (props.color ? props.color : theme.colors.grey.light)};
  font-family: CompleteDottyRegular;
  font-size: 70px;
  text-align: left;
  text-transform: uppercase;
  max-width: ${width};
  max-height: 95px;
`;

const TickerContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TickerBtn = styled.TouchableOpacity`
  margin-left: -${width * 0.1}px;
  width: ${width * 0.06}px;
  height: ${width * 0.06}px;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
`;

const TextContainer = styled.View`
  flex: 1;
  width: 100%;
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
    if (isPlaying) {
      return (
        <TextTicker
          isRTL={false}
          animationType="scroll"
          shouldAnimateTreshold={40}
          marqueeOnMount={true}
          duration={50000 / props.speed}
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
      <TickerContainer>
        <TickerBtn onPress={() => togglePlaying()}>
          <AntIcon
            name={isPlaying ? 'pausecircleo' : 'playcircleo'}
            size={15}
            color={theme.colors.misc.pink}
          />
        </TickerBtn>
        {/* <TickerBtn onPress={() => toggleStop()}>
          <Icon name="stop" size={15} color={theme.colors.misc.pink} />
        </TickerBtn> */}
      </TickerContainer>
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
