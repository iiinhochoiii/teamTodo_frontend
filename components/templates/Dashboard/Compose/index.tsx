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
import { useForm } from 'react-hook-form';

const ComposeComponent = () => {
  const [items, setItems] = useState<string[]>([]);
  const [isAdd, setIsAdd] = useState(false);

  const createItems = (title: string) => {
    setItems(() => [...items, title]);
  };

  const updateItems = (id: number, title: string) => {
    setItems(items.map((item, index) => (id === index ? title : item)));
  };

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
              />
            ))
          ) : (
            <ArticleComponent
              createItems={(title: string) => createItems(title)}
            />
          )}
          {isAdd && <div>asd</div>}
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
}

const ArticleComponent = (props: ArticleProps) => {
  const { createItems, value, updateItems, id } = props;
  const { register, watch, reset } = useForm();
  const [isContent, setIsContent] = useState(false);

  const remove = () => {
    reset({
      title: '',
    });
  };

  const contentRef: React.MutableRefObject<HTMLDivElement | null> =
    useRef(null);
  useEffect(() => {
    document.addEventListener('mousedown', clickContentOutside);

    return () => {
      document.removeEventListener('mousedown', clickContentOutside);
    };
  }, []);

  useEffect(() => {
    if (value) {
      reset({
        title: value,
      });
    }
  }, [value]);

  const clickContentOutside = (
    event: React.BaseSyntheticEvent | MouseEvent
  ) => {
    if (contentRef.current && !contentRef.current.contains(event.target)) {
      setIsContent(false);

      const title = watch('title');
      if (title) {
        if (createItems) {
          createItems(title);
          reset({
            title: '',
          });
        }
        if (updateItems && id !== undefined) {
          updateItems(id, title);
        }
      }
    }
  };
  return (
    <Article
      onClick={() => setIsContent(true)}
      isContent={isContent}
      ref={contentRef}
    >
      <ArticleIcon />
      <ArticleContent>
        {!isContent ? (
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
              <IconButton disabled={!watch('title')} onClick={() => remove()}>
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
