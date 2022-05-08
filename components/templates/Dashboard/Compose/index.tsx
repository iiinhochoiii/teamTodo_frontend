import React, { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Article,
  ArticleIcon,
  ArticleContent,
  ArticleEditor,
  IconButton,
  AddItems,
  AddItemIcon,
} from './style';
import { Text, Box, FormTextarea } from '@/components/atoms';
import DeleteIcon from '@material-ui/icons/Delete';
import { useForm } from 'react-hook-form';

const ComposeComponent = () => {
  const [items, setItems] = useState<string[]>([]);
  const [isAdd, setIsAdd] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const createItems = (title: string) => {
    setIsAdd(false);
    setItems((state) => [...state, title]);
  };

  const updateItems = (id: number, title: string) => {
    setItems(items.map((item, index) => (id === index ? title : item)));
  };

  useEffect(() => {
    if (items.length > 0) {
      setIsDone(true);
    }
  }, [items]);

  return (
    <Container>
      <Title>작업 예정이거나, 완료한 일정을 팀원에게 공유해보세요.</Title>
      <Box style={{ margin: '50px 0 0 0' }}>
        <Text font={{ size: 'M', weight: 600 }}>Plan</Text>
        <Box style={{ margin: '20px 0 0 0' }}>
          {items.length > 0 ? (
            items.map((item, index) => (
              <ArticleComponent
                key={index}
                value={item}
                updateItems={(id: number, title: string) =>
                  updateItems(id, title)
                }
                id={index}
                isDone={isDone}
              />
            ))
          ) : (
            <ArticleComponent
              createItems={(title: string) => createItems(title)}
            />
          )}
          {isAdd && (
            <ArticleComponent
              createItems={(title: string) => createItems(title)}
            />
          )}
          {items.length > 0 && (
            <AddItems onClick={() => setIsAdd(true)}>
              <AddItemIcon />
              <Text font={{ size: 'S', weight: 300 }} color="purple">
                Add Item
              </Text>
            </AddItems>
          )}
        </Box>
      </Box>
    </Container>
  );
};

interface ArticleProps {
  createItems?: (title: string) => void;
  updateItems?: (id: number, title: string) => void;
  value?: string;
  id?: number;
  isDone?: boolean;
}

const ArticleComponent = (props: ArticleProps) => {
  const { createItems, value, updateItems, id, isDone } = props;
  const { register, watch, reset } = useForm();
  const [isContent, setIsContent] = useState(-1);

  useEffect(() => {
    if (value) {
      reset({
        title: value,
      });
    }
  }, [value]);

  useEffect(() => {
    if (isDone) {
      setIsContent(-1);
    }
  }, [isDone]);
  const onClickHandler = (title: string) => {
    if (createItems) {
      createItems(title);
    } else if (updateItems && id !== undefined) {
      updateItems(id, title);
    }
    setIsContent(-1);
  };

  return (
    <Article onClick={() => setIsContent(id || 0)} isContent={isContent}>
      <ArticleIcon />
      <ArticleContent>
        {isContent < 0 ? (
          <Text font={{ size: 'S', weight: 300 }}>
            {value || 'What is most important to get done today?'}
          </Text>
        ) : (
          <Box>
            <FormTextarea
              placeholder={
                !value ? 'What is most important to get done today?' : ''
              }
              {...register('title')}
            />
            <ArticleEditor>
              <IconButton
                disabled={!watch('title')}
                onClick={() => {
                  const title = watch('title');
                  onClickHandler(title);
                }}
              >
                {createItems ? 'Add' : 'Update'}
              </IconButton>
              <IconButton disabled={!watch('title')}>
                <DeleteIcon />
              </IconButton>
            </ArticleEditor>
          </Box>
        )}
      </ArticleContent>
    </Article>
  );
};
export default ComposeComponent;
