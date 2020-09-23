import React from 'react';
import { View, Image, Text } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from 'react-navigation-hooks';
import { theme, width } from '../../themes';
import Icon from 'react-native-vector-icons/Ionicons';

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

const Container = styled.ImageBackground`
  display: flex;
  background-color: ${theme.colors.accent.light};
  color: ${theme.colors.grey.light};
  margin-top: 20px;
  padding: 20px 0 10px;
  height: 135px;
  align-items: center;
`;

const ConnectContainer = styled.View`
  display: flex;
  background-color: transparent;
  padding: 20px 0 10px;
  height 100px;
  align-items: center;
`;

const TitleText = styled.Text`
  font-size: 50px;
  color: #ffffff;
  font-family: CompleteDottyRegular;
`;

const ButtonSection = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 30px;
  height: 30px;
  top: 0;
  border-radius: 15px;
  border-width: 1px;
  border-color: ${theme.colors.grey.light};
`;

const RightBtn = styled(ButtonSection)`
  right: 0;
  margin: 20px 15px 0 0;
`;

const LeftBtn = styled(ButtonSection)`
  left: 0;
  margin: 20px 0 0 15px;
`;

const PageTitle = styled.View`
  padding-top: 30px;
  width: 65%;
  font-size: 50px;
`;

const PageText = styled.Text`
  font-size: 30px;
  color: #ffffff;
`;

const BackButton = styled.TouchableOpacity`
  display: flex;
  position: absolute;
  left: 0;
  margin: 20px 0 0 20px;
  padding: 0 20px 20px 0;
`;

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
    <Container source={headerBackground}>
      <LeftBtn onPress={props.toBLE}>
        <Icon
          name="bluetooth-outline"
          size={20}
          color={theme.colors.grey.light}
        />
      </LeftBtn>
      <View>
        <TitleText>TYPE YOUR REPLY</TitleText>
      </View>
      <View>{props.children}</View>
      <RightBtn onPress={props.onPress}>
        <Icon name="information" size={20} color={theme.colors.grey.light} />
      </RightBtn>
    </Container>
  );
};

export const PageHeader: React.FC<IPropsPage> = props => {
  const { goBack } = useNavigation();

  return (
    <Container source={headerBackground}>
      <View>
        <TitleText>TYPE YOUR REPLY</TitleText>
      </View>
      <PageTitle>
        <PageText>{props.title}</PageText>
      </PageTitle>
      <LeftBtn onPress={() => goBack()}>
        <Icon name="chevron-back" color={theme.colors.grey.light} size={20} />
      </LeftBtn>
    </Container>
  );
};
