import React from 'react';
import { View, Image, Text } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from 'react-navigation-hooks';
import { theme } from '../../themes';

import headerBackground from '../../images/background/header.png';
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
  font-size: 20px;
  color: #ffffff;
`;

const InfoSection = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 35px;
  height: 35px;
  top: 0;
  right: 0;
  margin: 10px 10px 0 0;
  border-radius: 40px;
  border: 1px solid #ffffff;
`;

const BLESection = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 35px;
  height: 35px;
  top: 0;
  left: 0;
  margin: 10px 0 0 10px;
  border-radius: 40px;
  border: 1px solid #ffffff;
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
  top: 0;
  left: 0;
  padding: 0 20px 20px 0;
`;

const BackButtonImage = styled.Image`
  width: 26px;
  height: 49px;
  margin: 20px 0 0 20px;
`;

const BLEBtnImage = styled.Image`
  width: 30px;
  height: 30px;
`;

export const HomeHeader: React.FC<IProps> = props => {
  return (
    <Container source={headerBackground}>
      <BLESection onPress={props.toBLE}>
        <BLEBtnImage source={BLE} />
      </BLESection>
      <View>
        <TitleText>type your reply</TitleText>
      </View>
      <View>{props.children}</View>
      <InfoSection onPress={props.onPress}>
        <View>
          <TitleText>i</TitleText>
        </View>
      </InfoSection>
    </Container>
  );
};

export const PageHeader: React.FC<IPropsPage> = props => {
  const { goBack } = useNavigation();

  return (
    <Container source={headerBackground}>
      <View>
        <TitleText>type your reply</TitleText>
      </View>
      <PageTitle>
        <PageText>{props.title}</PageText>
      </PageTitle>
      <BackButton onPress={() => goBack()}>
        <BackButtonImage source={imageBack} />
      </BackButton>
    </Container>
  );
};

export const ConnectionHeader: React.FC<IPropsPage> = props => {
  const { navigate } = useNavigation();

  return (
    <ConnectContainer>
      <View>
        <TitleText>type your reply</TitleText>
      </View>
      <PageTitle>
        <PageText>{props.title}</PageText>
      </PageTitle>
      <BackButton onPress={() => navigate('home')}>
        <BackButtonImage source={imageBack} />
      </BackButton>
    </ConnectContainer>
  );
};
