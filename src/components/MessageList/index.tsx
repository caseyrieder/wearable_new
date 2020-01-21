import React from 'react';
import { FlatList } from 'react-native';
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
  height: 175px;
  padding: 20px 0 0 0;
`;

const SingleContainer = styled.View`
  display: flex;
  padding: 20px 0 0 0;
`;

const Footer = styled.View`
  padding: 20px;
`;

const HeaderContainer = styled.View`
  padding: 0 0 0 40px;
`;

const HeaderText = styled.Text``;

export const MessageList: React.FC<IProps> = props => {
  const Header = (
    <HeaderContainer>
      <HeaderText>{props.header}</HeaderText>
    </HeaderContainer>
  );

  return (
    <Container>
      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        data={props.data}
        renderItem={({ item }) => (
          <Message {...item} onPress={() => props.onPress(item)} />
        )}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={Header}
        ListFooterComponent={Footer}
      />
    </Container>
  );
};

export const SingleMessageList: React.FC<IProps> = props => {
  if (props.data.length !== 1) {
    return null;
  }

  const Header = (
    <HeaderContainer>
      <HeaderText>{props.header}</HeaderText>
    </HeaderContainer>
  );

  return (
    <SingleContainer>
      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        data={props.data}
        renderItem={({ item }) => (
          <Message {...item} onPress={() => props.onPress(item)} />
        )}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={Header}
      />
    </SingleContainer>
  );
};
