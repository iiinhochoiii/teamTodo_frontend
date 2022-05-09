import React, { useState, useEffect, useRef } from 'react';
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
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { useForm } from 'react-hook-form';

const ComposeComponent = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [isContent, setIsContent] = useState(-1);
  const { register, watch, reset } = useForm();

  const [items, setItems] = useState<string[]>([]);
  const itemRef: React.MutableRefObject<string[]> = useRef([]);

  const createItems = (title: string) => {
    setIsAdd(false);
    setItems((state) => [...state, title]);
    reset({ title: '' });
  };

  const updateItems = (id: number, title: string) => {
    setItems(items.map((item, index) => (id === index ? title : item)));
    itemRef.current = items;
  };

  const removeItem = (id: number) => {
    setItems((item) => item.filter((_, idx) => id !== idx));
    itemRef.current = items;
  };

  useEffect(() => {
    if (items !== itemRef.current) {
      setIsContent(-1);
    }
  }, [items]);

  return (
    <Container>
      <Title>작업 예정이거나, 완료한 일정을 팀원에게 공유해보세요.</Title>
      <Box style={{ margin: '50px 0 0 0' }}>
        <Text font={{ size: 'M', weight: 600 }}>Plan</Text>
        <Box style={{ margin: '20px 0 0 0' }}>
          {items.length > 0 &&
            items.map((item, index) => (
              <Article
                key={index}
                isContent={index === isContent}
                onClick={() => {
                  setIsContent(index);
                  reset({
                    title: item,
                  });
                }}
              >
                <ArticleIcon />
                <ArticleContent>
                  {isContent === index ? (
                    <Box>
                      <FormTextarea {...register('title')} />
                      <ArticleEditor>
                        <IconButton
                          disabled={!watch('title')}
                          onClick={() => {
                            const title = watch('title');
                            updateItems(index, title);
                          }}
                        >
                          <ChangeCircleIcon />
                        </IconButton>
                        <IconButton
                          disabled={!watch('title')}
                          onClick={() => removeItem(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ArticleEditor>
                    </Box>
                  ) : (
                    <Text font={{ size: 'S', weight: 300 }}>{item}</Text>
                  )}
                </ArticleContent>
              </Article>
            ))}
          {isAdd && (
            <Article isContent={true}>
              <ArticleIcon />
              <ArticleContent>
                <Box>
                  <FormTextarea
                    placeholder={'What is most important to get done today?'}
                    {...register('title')}
                  />
                  <ArticleEditor>
                    <IconButton
                      disabled={!watch('title')}
                      onClick={() => {
                        const title = watch('title');
                        createItems(title);
                      }}
                    >
                      <AddCircleIcon />
                    </IconButton>
                    <IconButton disabled={!watch('title')}>
                      <DeleteIcon />
                    </IconButton>
                  </ArticleEditor>
                </Box>
              </ArticleContent>
            </Article>
          )}

          <AddItems
            onClick={() => {
              setIsAdd(true);
              reset({
                title: '',
              });
            }}
          >
            <AddItemIcon />
            <Text font={{ size: 'S', weight: 300 }} color="purple">
              Add Item
            </Text>
          </AddItems>
        </Box>
      </Box>
    </Container>
  );
};

export default ComposeComponent;
