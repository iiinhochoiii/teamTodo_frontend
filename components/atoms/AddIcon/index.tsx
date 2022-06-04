import React, { HTMLAttributes } from 'react';
import * as S from './style';

interface Props extends HTMLAttributes<HTMLDivElement> {
  sx?: React.CSSProperties;
}

const AddIcon = (props: Props) => {
  const { sx } = props;
  return <S.AddItemIcon {...props} style={sx} />;
};

export default AddIcon;
