import React, { HTMLAttributes } from 'react';
import {
  StyledCard,
  StyledCardHeader,
  CardBadge,
  CardContent,
  CardContentIcon,
  CardContentItem,
} from './style';
import { Box, Text, HRBox, Flex } from '@/components/atoms';
import MoreHoriz from '@material-ui/icons/MoreHoriz';

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
        <Box width="30px">
          <CardBadge></CardBadge>
        </Box>
        <Box style={{ margin: '0 0 0 20px' }}>
          <Flex justify="space-between">
            <Text>{item.userName}</Text>
            <MoreHoriz />
          </Flex>
          <Text font={{ size: 'XS' }} color="gray">
            {item.createdAt}
          </Text>
        </Box>
      </StyledCardHeader>
      <CardContent>
        <Box>
          {item.data.t.map((i, index) => (
            <CardContentItem key={index}>
              <CardContentIcon />
              <Box>
                <Text font={{ size: 'M', weight: 300 }}>{i.title}</Text>
              </Box>
            </CardContentItem>
          ))}
        </Box>
      </CardContent>
      <HRBox color="lightgray" />
      <CardContent>
        {item.data.y.map((i, index) => (
          <CardContentItem key={index}>
            <CardContentIcon type="done" />
            <Box>
              <Text font={{ size: 'M', weight: 300 }}>{i.title}</Text>
            </Box>
          </CardContentItem>
        ))}
      </CardContent>
    </StyledCard>
  );
};

export default Card;
