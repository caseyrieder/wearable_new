import React from 'react';
import { EmojiGrid } from './Grid';
import { AddEmoji } from './AddEmojiBtn';
import Modal from 'react-native-modal';

import { theme, width, height } from '../../themes';
import { lang } from '../../lang/en';

interface IPropsModal {
  isVisible: boolean;
  onDismiss: () => void;
  onSelectEmoji: (item: any) => void;
}

export const EmojiModal = (props: IPropsModal) => {
  const { isVisible, onDismiss, onSelectEmoji } = props;
  return (
    <Modal
      isVisible={isVisible}
      deviceWidth={width}
      deviceHeight={height}
      onBackButtonPress={onDismiss}>
      <EmojiGrid toggleModal={onDismiss} select={onSelectEmoji} />
    </Modal>
  );
};

export const AddEmojiBtn = AddEmoji;
