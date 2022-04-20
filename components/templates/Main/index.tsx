import React from 'react';
import { Section, Text, Button, Flex, Box } from '@/components/atoms';
import { ImageFrame } from '@/components/molecules';
import { StyledTitle, StyledContent } from './style';

const MainComponent = () => {
  return (
    <>
      <Section background="skyblue" style={{ padding: '120px 0 0 0' }}>
        <StyledContent>
          <StyledTitle>Better TeamWork, Share My Work</StyledTitle>
          <Text font={{ size: 'L', weight: 'bold' }} color="gray">
            TeamTodo는 실시간으로 어떤 업무를 진행하는지 공유를 하여 더욱
            효율적으로 협업을 할 수 있도록 도와줍니다.
          </Text>
          <Button
            size="XL"
            font={{ size: 'M', weight: 'bold' }}
            style={{ margin: '50px 0 100px' }}
            to="/signup"
          >
            무료로 시작하기
          </Button>
        </StyledContent>
      </Section>
      <Section style={{ padding: '100px 0 0 0' }}>
        <StyledContent>
          <StyledTitle>What is TeamTodo?</StyledTitle>
          <Text font={{ size: 'M', weight: '500' }} color="gray">
            TeamTodo는 개인과 팀을 연결하여 효율적인 업무를 돕습니다.
          </Text>
        </StyledContent>
        <Flex justify="space-between">
          <Box>
            <ImageFrame background="purple"></ImageFrame>
          </Box>
          <Box>test</Box>
        </Flex>
      </Section>
    </>
  );
};

export default MainComponent;
