import React from 'react';
import { View, Image, Text } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from 'react-navigation-hooks';
import { theme, width } from '../../themes';
import FeatherIcon from 'react-native-vector-icons/Feather';
import LineIcon from 'react-native-vector-icons/SimpleLineIcons';

import headerBackground from '../../images/background/header_new.png';
import imageBack from '../../images/icons/back-arrow.png';
import BLE from '../../images/icons/ble.png';

interface IProps {
  onPress: () => void;
  toBLE: () => void;
}

interface IPropsPage {
  title: string;
}

const Container = styled.View`
  display: flex;
  background-color: transparent;
  color: transparent;
  margin-top: 0%;
  padding: 10% 0 5%;
  height: 15%;
  align-items: center;
`;

const ConnectContainer = styled.View`
  display: flex;
  background-color: transparent;
  padding: 3.5% 0 1.1%;
  height 100px;
  align-items: center;
`;

// 50px
const TitleText = styled.Text`
  font-size: ${width * 0.15}px;
  color: ${theme.colors.misc.pink};
  font-family: dotty;
`;

const btnSize = width * 0.08;
const ButtonSection = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: ${btnSize}px;
  height: ${btnSize}px;
  top: 0;
`;

const RightBtn = styled(ButtonSection)`
  right: 0;
  margin: 7% 1.5% 0 0;
`;

// 25...10?
const LeftBtn = styled(ButtonSection)`
  left: 0;
  margin: 7% 0 0 1.5%;
`;

const PageTitle = styled.View`
  padding-top: 3%;
  width: 65%;
  font-size: ${width * 0.15}px;
`;

// 30px
const PageText = styled.Text`
  font-size: ${width * 0.09}px;
  color: ${theme.colors.misc.pink};
`;

const BackButton = styled.TouchableOpacity`
  display: flex;
  position: absolute;
  left: 0;
  margin: 3.8% 0 0 3.8%;
  padding: 0 3.8% 3.8% 0;
`;

const IconSize = width * 0.05;

const BackButtonImage = styled.Image`
  width: 26px;
  height: 49px;
`;

const BLEBtnImage = styled.Image`
  width: 30px;
  height: 30px;
`;

export const HomeHeader: React.FC<IProps> = props => {
  return (
    <Container>
      <LeftBtn onPress={props.toBLE}>
        <FeatherIcon
          name="bluetooth"
          size={IconSize}
          color={theme.colors.misc.pink}
        />
      </LeftBtn>
      <View>
        <TitleText>TYPE YOUR REPLY</TitleText>
      </View>
      <View>{props.children}</View>
      <RightBtn onPress={props.onPress}>
        <FeatherIcon
          name="info"
          size={IconSize}
          color={theme.colors.misc.pink}
        />
      </RightBtn>
    </Container>
  );
};

export const PageHeader: React.FC<IPropsPage> = props => {
  const { goBack } = useNavigation();

  return (
    <Container>
      <View>
        <TitleText>TYPE YOUR REPLY</TitleText>
      </View>
      <PageTitle>
        <PageText>{props.title}</PageText>
      </PageTitle>
      <LeftBtn onPress={() => goBack()}>
        <LineIcon
          name="arrow-left"
          color={theme.colors.misc.pink}
          size={IconSize}
        />
      </LeftBtn>
    </Container>
  );
};
