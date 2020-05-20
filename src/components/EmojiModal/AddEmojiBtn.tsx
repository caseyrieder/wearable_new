import React from 'react';
import { Text, Image } from 'react-native';
import styled from 'styled-components/native';

import { theme } from '../../themes';
// import { lang } from '../lang/en';
import PlusIcon from '../../images/icons/plus-icon-light.png';

interface IProps {
  onPress: () => void;
}

const IconContainer = styled.TouchableOpacity`
    display: flex;
    justify-content: space-between;
`;

const StyledButton = styled.TouchableOpacity`
  margin-left: auto;
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
            <IconImage source={PlusIcon} />
        </StyledButton>
    </IconContainer>
  );
};
