import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import * as S from './style';

export interface Props {
  children: React.ReactNode;
  color?: string; // 스피너 색상 (기본: 흰색, 보라색 버튼 위)
}

// 버튼 안에서 "OO 중..." 문구와 함께 표시하는 스피너
const PendingLabel = ({ children, color = '#fff' }: Props) => {
  return (
    <S.StyledPendingLabel>
      <CircularProgress size={14} thickness={5} sx={{ color }} />
      {children}
    </S.StyledPendingLabel>
  );
};

export default PendingLabel;
