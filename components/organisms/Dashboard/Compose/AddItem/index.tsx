import React from 'react';
import * as S from './style';
import { Text } from '@/components/atoms';

interface Props {
  onClickHandler: () => void;
}

const ComposeAddItem = (props: Props) => {
  const { onClickHandler } = props;

  return (
    <S.AddItems onClick={() => onClickHandler()}>
      <S.AddItemIcon />
      <Text font={{ size: 'S', weight: 300 }} color="purple">
        Add Item
      </Text>
    </S.AddItems>
  );
};

export default ComposeAddItem;
