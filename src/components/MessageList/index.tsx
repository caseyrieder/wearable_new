import React from 'react';
import styled from 'styled-components/native';

import Message from '../Message';

interface IProps {
  header: string;
  data: IMessage[];
  onPress: (data: IMessage) => void;
}

const Container = styled.View`
  display: flex;
  flex: 1;
  padding: 20px 0 0 0;
`;

const SingleContainer = styled.View`
  display: flex;
  padding: 20px 0 0 0;
`;

const Footer = styled.View`
  padding: 30px;
`;

const HeaderContainer = styled.View`
  padding: 0 0 0 40px;
`;

const HeaderText = styled.Text``;

export const MessageList: React.FC<IProps> = props => {
  return (
    <Container>
      <HeaderContainer>
        <HeaderText>{props.header}</HeaderText>
      </HeaderContainer>
      {props.data.map((item, idx) => {
        return (
          <Message
            key={idx}
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
      </HeaderContainer>
      {props.data.map(item => {
        return (
          <Message
            key={item.id}
            {...item}
            onPress={() => props.onPress(item)}
          />
        );
      })}
    </SingleContainer>
  );
};
