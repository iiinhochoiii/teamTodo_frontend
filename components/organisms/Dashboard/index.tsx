import React, { HTMLAttributes } from 'react';
import { StyledCard, StyledCardHeader, CardBadge } from './style';
import { Box, Text } from '@/components/atoms';

interface Props extends HTMLAttributes<HTMLDivElement> {
  item: {
    id: number;
    userName: string;
    createdAt: string;
    data: {
      t: {
        title: string;
      }[];
      y: {
        title: string;
      }[];
    };
  };
}

const Card = (props: Props) => {
  const { item } = props;
  return (
    <StyledCard>
      <StyledCardHeader>
        <CardBadge></CardBadge>
        <Box style={{ margin: '0 0 0 30px' }}>
          <Text>{item.userName}</Text>
          <Text>{item.createdAt}</Text>
        </Box>
      </StyledCardHeader>
    </StyledCard>
  );
};

export default Card;
