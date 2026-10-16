import React from 'react';
import * as S from './style';

export interface Props {
  color?: 'purple' | 'red'; // 생성·수정은 purple, 삭제는 red
  style?: React.CSSProperties;
}

// 요청 진행 중임을 나타내는 상단 진행 바.
// 부모 요소에 position: relative 가 필요하며, 기본 위치는 부모 상단(top: 0)
const PendingBar = ({ color = 'purple', style }: Props) => {
  return <S.StyledPendingBar $color={color} style={style} />;
};

export default PendingBar;
