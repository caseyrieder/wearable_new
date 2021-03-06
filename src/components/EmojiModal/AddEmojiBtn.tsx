import React from 'react';
import { Text, Image } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Entypo';

import { theme } from '../../themes';
// import { lang } from '../lang/en';
import PlusIcon from '../../images/icons/plus-icon-light.png';

interface IProps {
  onPress: () => void;
}

const IconContainer = styled.TouchableOpacity`
  justify-content: space-between;
`;

const StyledButton = styled.TouchableOpacity`
  margin-left: auto;
  margin-top: 0px;
  width: 30px;
`;

const IconImage = styled.Image`
  background-color: transparent;
  width: 25px;
  height: 25px;
`;

export const AddEmoji: React.FC<IProps> = props => {
  return (
    <IconContainer>
      <StyledButton onPress={props.onPress}>
        <Icon color={theme.colors.misc.pink} size={25} name="emoji-happy" />
        {/* <IconImage source={PlusIcon} /> */}
      </StyledButton>
    </IconContainer>
  );
};
