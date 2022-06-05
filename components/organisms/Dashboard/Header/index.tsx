import React from 'react';
import * as S from './style';

interface Props {
  title?: string;
  header?: React.ReactNode;
}

const DashboardHeader = (props: Props) => {
  const { title, header } = props;

  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        {header ? header : <S.HeaderText>{title || ''}</S.HeaderText>}
        <S.HeaderBadge />
      </S.HeaderContent>
    </S.HeaderContainer>
  );
};

export default DashboardHeader;
