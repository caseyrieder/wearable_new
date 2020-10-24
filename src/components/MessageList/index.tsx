import React from 'react';
import styled from 'styled-components/native';
import { theme, width, height } from '../../themes';

import Message from '../Message';

interface IProps {
  header: string;
  data: IMessage[];
  onPress: (data: IMessage) => void;
}

const Container = styled.View`
  display: flex;
  flex: 1;
  margin-top: ${height*0.05}px;
  padding: 20px 0 0 0;
  background-color: ${theme.colors.grey.light};
`;

const SingleContainer = styled.View`
  display: flex;
  padding: 20px 0 0 0;
`;

const Footer = styled.View`
  padding: 30px;
`;

const HeaderContainer = styled.View`
  padding-left: ${width * 0.04}px;
`;

const HeaderText = styled.Text`
  color: ${theme.colors.black.dark};
  font-family: Helvetica;
  font-size: 18px;
`;
const Subhead = styled.Text`
  color: ${theme.colors.black.dark};
  font-family: Helvetica;
  font-size: 13px;
`;

export const MessageList: React.FC<IProps> = props => {
  return (
    <Container>
      <HeaderContainer>
        <HeaderText>{props.header}</HeaderText>
        <Subhead>Press to upload to your device</Subhead>
      </HeaderContainer>
      {props.data.map(item => {
        return (
          <Message
            bordered={true}
            key={item.id}
            {...item}
            onPress={() => props.onPress(item)}
          />
        );
      })}
      <Footer />
    </Container>
  );
};

export const SingleMessageList: React.FC<IProps> = props => {
  if (props.data.length !== 1) {
    return null;
  }

  return (
    <SingleContainer>
      <HeaderContainer>
        <HeaderText>{props.header}</HeaderText>
        <Subhead>Press to upload to your device</Subhead>
      </HeaderContainer>
      {props.data.map(item => {
        return (
          <Message
            bordered={true}
            key={item.id}
            {...item}
            onPress={() => props.onPress(item)}
          />
        );
      })}
    </SingleContainer>
  );
};
