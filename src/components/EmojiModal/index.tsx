import React from 'react';
import { EmojiGrid } from './Grid';
import { AddEmoji } from './AddEmojiBtn';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { theme, width, height } from '../../themes';
import { lang } from '../../lang/en';

interface IPropsModal {
  isVisible: boolean;
  onDismiss: () => void;
  onSelectEmoji: (item: any) => void;
}

const CloseBtn = styled.TouchableOpacity`
  right: -${0.78 * width}px;
  top: -${0.88 * height}px;
  width: 50px;
  justify-content: center;
  align-items: center;
`;

export const EmojiModal = (props: IPropsModal) => {
  const { isVisible, onDismiss, onSelectEmoji } = props;
  return (
    <Modal
      isVisible={isVisible}
      deviceWidth={width}
      deviceHeight={height}
      onBackButtonPress={onDismiss}>
      <EmojiGrid toggleModal={onDismiss} select={onSelectEmoji} />
      <CloseBtn onPress={onDismiss}>
        <Icon name="window-close" color={theme.colors.grey.main} size={35} />
      </CloseBtn>
    </Modal>
  );
};

export const AddEmojiBtn = AddEmoji;
