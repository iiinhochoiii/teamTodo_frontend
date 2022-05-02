import React from 'react';
import {
  HeaderContainer,
  HeaderText,
  HeaderContent,
  HeaderBadge,
} from './style';

interface Props {
  title?: string;
}

const DashboardHeader = (props: Props) => {
  const { title } = props;

  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderText>{title || ''}</HeaderText>
        <HeaderBadge />
      </HeaderContent>
    </HeaderContainer>
  );
};

export default DashboardHeader;
