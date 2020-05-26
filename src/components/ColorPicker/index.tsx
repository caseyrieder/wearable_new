import React from 'react';
import styled from 'styled-components/native';

// import { theme } from '../../themes';
// import { lang } from '../lang/en';

interface IProps {
  onPress: () => void;
}

const Container = styled.TouchableOpacity`
  height: 60px;
  width: 100%;
  background: linear-gradient(
    to right,
    #f00 0%,
    #ff0 17%,
    #0f0 33%,
    #0ff 50%,
    #00f 67%,
    #f0f 83%,
    #f00 100%
  );
`;

export const ColorBar: React.FC<IProps> = props => {
  const { onPress } = props;
  return <Container />;
};
