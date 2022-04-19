import React from 'react';
import { Section, Text } from '@/components/atoms';
import { StyledTitle, StyledContent } from './style';

const MainComponent = () => {
  return (
    <>
      <Section>
        <StyledContent>
          <StyledTitle>Better TeamWork, Share My Work</StyledTitle>
          <Text font={{ size: 'L', weight: 'bold' }}>
            TeamTodo는 실시간으로 어떤 업무를 진행하는지 공유를 하여 더욱
            효율적으로 협업을 할 수 있도록 도와줍니다.
          </Text>
        </StyledContent>
      </Section>
    </>
  );
};

export default MainComponent;
