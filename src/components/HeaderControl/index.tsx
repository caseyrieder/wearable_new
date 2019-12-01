import React, { Fragment, useState, Children } from 'react';
import { View, Text, Button, Alert, TextInput } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import styled from 'styled-components/native';

interface IProps {
  onChangeText: (text: string) => void;
}

const Container = styled.View`
  display: flex;
  background-color: #00ffff;
  color: #ffffff;
  padding: 20px 0 10px;
  align-items: center;
`;

const TitleText = styled.Text`
  font-size: 20px;
  color: #ffffff;
`;

const TitleInput = styled.TextInput`
  padding-top: 30px;
  font-size: 30px;
  color: #ffffff;
  text-decoration: none;
`;

export const HeaderControl: React.FC<IProps> = props => {
  return (
    <Container>
      <View>
        <TitleText>type your reply</TitleText>
      </View>
      <View>
        <TitleInput
          placeholder="Enter your own text |"
          placeholderTextColor={'#ffffff'}
          onChangeText={text => props.onChangeText(text)}
        />
      </View>
    </Container>
  );
};
