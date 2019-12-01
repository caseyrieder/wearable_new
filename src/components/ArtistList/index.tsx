import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';

import Message from '../Message';

interface IProps {
  data: IMessage[];
}

const Container = styled.View`
  display: flex;
  flex: 1;
  height: 175px;
  padding: 5px 0 20px;
`;

const Footer = styled.View`
  padding: 20px;
`;

const HeaderContainer = styled.View`
  padding: 0 0 0 40px;
`;

const HeaderText = styled.Text``;

const Header = (
  <HeaderContainer>
    <HeaderText>From the artist:</HeaderText>
  </HeaderContainer>
);

export const ArtistList: React.FC<IProps> = props => {
  return (
    <Container>
      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        data={props.data}
        renderItem={({ item }) => (
          <Message {...item} onPress={() => console.log('test')} />
        )}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={Header}
        ListFooterComponent={Footer}
      />
    </Container>
  );
};
