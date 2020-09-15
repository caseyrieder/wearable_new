import React, { useState } from 'react';
import { Text } from 'react-native';
import TextTicker from 'react-native-text-ticker';
import styled from 'styled-components/native';
import { emojis } from '../../images/emojis';
import Icon from 'react-native-vector-icons/Ionicons';

import { theme } from '../../themes';
// import { lang } from '../lang/en';

interface IProps extends IMessage {
  onPress: () => void;
  stop: () => void;
  isPlaying: boolean;
  setPlaying: (toggle: boolean) => void;
}

const Container = styled.View`
  padding: 15px 20px 0px;
  flex-direction: row;
`;

const StyledButton = styled.TouchableOpacity`
  background-color: ${theme.colors.black.main};
  border-radius: 10px;
  padding: 10px 0 0;
`;

const StyledText = styled.Text<{ color: string }>`
  color: ${props => (props.color ? props.color : '#fff')};
  font-family: dotty;
  font-size: 70px;
  text-align: left;
  text-transform: uppercase;
  max-width: 100%;
  max-height: 95px;
  margin-left: 10px;
`;

const StyledTicker = styled(TextTicker)<{ color: string }>`
  color: ${props => (props.color ? props.color : '#fff')};
  font-family: dotty;
  font-size: 70px;
  text-align: left;
  text-transform: uppercase;
  max-width: 100%;
  max-height: 95px;
  margin-left: 10px;
`;

const TickerContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TickerBtn = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  background-color: transparent;
  border-radius: 15px;
  border-width: 1px;
  border-color: ${theme.colors.misc.pink};
`;

export const Message: React.FC<IProps> = props => {
  const [isPlaying, setPlaying] = useState(false);
  const [isStopped, setStopped] = useState(false);

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
    setPlaying(false);
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

  return (
    <Container>
      <StyledButton onPress={props.onPress}>
        {isStopped ? (
          <StyledText color={props.color} numberOfLines={1}>
            {renderArray(props.message, props.color)}
          </StyledText>
        ) : (
          <TextTicker scrollSpeed={150} disabled={!isPlaying}>
            <StyledText color={props.color} numberOfLines={1}>
              {renderArray(props.message, props.color)}
            </StyledText>
          </TextTicker>
        )}
      </StyledButton>
      <TickerContainer>
        <TickerBtn onPress={() => togglePlaying()}>
          <Icon
            name={isPlaying ? 'pause' : 'play'}
            size={15}
            color={theme.colors.misc.pink}
          />
        </TickerBtn>
        <TickerBtn onPress={() => toggleStop()}>
          <Icon name="stop" size={15} color={theme.colors.misc.pink} />
        </TickerBtn>
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
