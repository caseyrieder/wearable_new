import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

interface IProps {
  editMode: boolean;
  onToggle: () => void;
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

const TitleToggle = styled.Text`
  padding: 30px 0 15px;
  font-size: 20px;
  color: #ffffff;
`;

export const HeaderControl: React.FC<IProps> = props => {
  return (
    <Container>
      <View>
        <TitleText>type your reply</TitleText>
      </View>
      <View>
        <TitleToggle onPress={props.onToggle}>
          {props.editMode ? 'Select artist message' : 'Enter your own text |'}
        </TitleToggle>
      </View>
    </Container>
  );
};
