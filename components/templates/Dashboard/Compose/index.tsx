import React, { useState, useRef, useEffect } from 'react';
import {
  Container,
  Title,
  Article,
  ArticleIcon,
  ArticleContent,
  ArticleEditor,
  IconButton,
} from './style';
import { Text, Box, FormTextarea } from '@/components/atoms';
import DeleteIcon from '@material-ui/icons/Delete';
import { useForm } from 'react-hook-form';

const ComposeComponent = () => {
  const [items, setItems] = useState([]);
  const [isContent, setIsContent] = useState(false);
  const contentRef: any = useRef(null);
  const { register, watch } = useForm();

  useEffect(() => {
    document.addEventListener('mousedown', clickContentOutside);

    return () => {
      document.removeEventListener('mousedown', clickContentOutside);
    };
  }, []);

  const clickContentOutside = (event: MouseEvent) => {
    if (contentRef.current && !contentRef.current.contains(event.target)) {
      setIsContent(false);
    }
  };

  return (
    <Container>
      <Title>작업 예정이거나, 완료한 일정을 팀원에게 공유해보세요.</Title>
      <Box style={{ margin: '50px 0 0 0' }}>
        <Text font={{ size: 'M', weight: 600 }}>Plan</Text>
        <Box style={{ margin: '20px 0 0 0' }}>
          <Article
            onClick={() => setIsContent(true)}
            isContent={isContent}
            ref={contentRef}
          >
            <ArticleIcon />
            <ArticleContent>
              {!isContent ? (
                <Text font={{ size: 'S', weight: 300 }}>
                  What is most important to get done today?
                </Text>
              ) : (
                <Box>
                  <FormTextarea
                    placeholder="What is most important to get done today?"
                    {...register('title')}
                  />
                  <ArticleEditor>
                    <IconButton disabled={!watch('title')}>
                      <DeleteIcon />
                    </IconButton>
                  </ArticleEditor>
                </Box>
              )}
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
              <Text font={{ size: 'S', weight: 300 }}>
                What was the most important thing that happend?
              </Text>
            </ArticleContent>
          </Article>
        </Box>
      </Box>
    </Container>
  );
};

export default ComposeComponent;
