import React, { useState } from 'react';
import {
  Container,
  Title,
  Article,
  ArticleIcon,
  ArticleContent,
} from './style';
import { Text, Box } from '@/components/atoms';

const ComposeComponent = () => {
  const [items, setItems] = useState([]);

  return (
    <Container>
      <Title>작업 예정이거나, 완료한 일정을 팀원에게 공유해보세요.</Title>
      <Box style={{ margin: '50px 0 0 0' }}>
        <Text font={{ size: 'M', weight: 600 }}>Plan</Text>
        <Box style={{ margin: '20px 0 0 0' }}>
          <Article>
            <ArticleIcon />
            <ArticleContent>
              <Text>What is most important to get done today?</Text>
            </ArticleContent>
          </Article>
        </Box>
      </Box>
      <Box style={{ margin: '50px 0 0 0' }}>
        <Text font={{ size: 'M', weight: 600 }}>What happened</Text>
        <Box style={{ margin: '20px 0 0 0' }}>
          <Article>
            <ArticleIcon />
            <ArticleContent>
              <Text>What was the most important thing that happend?</Text>
            </ArticleContent>
          </Article>
        </Box>
      </Box>
    </Container>
  );
};

export default ComposeComponent;
