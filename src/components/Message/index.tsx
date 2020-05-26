import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { emojis } from '../../images/emojis';

import { theme } from '../../themes';
// import { lang } from '../lang/en';

interface IProps extends IMessage {
  onPress: () => void;
}

const Container = styled.View`
  padding: 15px 20px 0px;
`;

const StyledButton = styled.TouchableOpacity`
  background-color: ${theme.colors.black.main};
  border-radius: 10px;
  padding: 10px 0 0;
`;

const StyledText = styled.Text<{ color: string }>`
  color: ${props => (props.color ? props.color : '#fff')};
  font-family: DottyNewRegular;
  font-size: 140px;
  text-align: center;
  text-transform: uppercase;
  max-width: 100%;
  max-height: 95px;
`;

export const Message: React.FC<IProps> = props => {
  function emoClr(ltr: string) {
    let item = emojis.find(e => e.ascii === ltr);
    if (!item) {
      return props.color;
    } else {
      return item.color;
    }
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
        <StyledText color={props.color} numberOfLines={1}>
          {renderArray(props.message, props.color)}
        </StyledText>
      </StyledButton>
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
