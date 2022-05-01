import React from 'react';
import {
  HeaderContainer,
  HeaderText,
  HeaderContent,
  HeaderBadge,
} from './style';

const DashboardHeader = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderText>Home</HeaderText>
        <HeaderBadge />
      </HeaderContent>
    </HeaderContainer>
  );
};

export default DashboardHeader;
