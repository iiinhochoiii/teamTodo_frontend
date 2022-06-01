import React, { useState, useEffect, useRef } from 'react';
import * as S from './style';
import { Text, Box, FormTextarea } from '@/components/atoms';
import { ComposeCardItem } from '@/components/organisms';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useForm } from 'react-hook-form';

type Item = {
  id: number;
  title: string;
  isDone: boolean;
};

const ComposeComponent = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isContent, setIsContent] = useState(-1);
  const { register, watch, reset } = useForm();

  const [items, setItems] = useState<Item[]>([]);
  const [allClose, setAllClose] = useState(false);
  const contentRef: React.MutableRefObject<HTMLDivElement | null> =
    useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', clickContentOutside);

    return () => {
      document.removeEventListener('mousedown', clickContentOutside);
    };
  }, []);

  useEffect(() => {
    if (allClose) {
      setIsContent(-1);
    }
  }, [allClose, items]);

  useEffect(() => {
    setAllClose(false);
  }, [isContent]);

  const clickContentOutside = (
    event: React.BaseSyntheticEvent | MouseEvent
  ) => {
    if (contentRef.current && !contentRef.current.contains(event.target)) {
      setIsAdd(false);
      setIsDone(false);
      setAllClose(true);
    }
  };

  const createItems = (title: string, isDone: boolean) => {
    setIsAdd(false);
    setIsDone(false);
    setItems((state) => [
      ...state,
      {
        id: items.length,
        title: title,
        isDone: isDone,
      },
    ]);
    reset({ title: '' });
  };

  const updateItems = (id: number, title: string) => {
    setItems(
      items.map((item) =>
        id === item.id
          ? {
              ...item,
              title: title,
            }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems((item) => item.filter((_, idx) => id !== idx));
  };

  const changeStatus = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              isDone: !item.isDone,
            }
          : item
      )
    );
  };

  return (
    <S.Container>
      <S.Title>작업 예정이거나, 완료한 일정을 팀원에게 공유해보세요.</S.Title>
      <Box style={{ margin: '50px 0 0 0' }}>
        <Text font={{ size: 'M', weight: 600 }}>Plan</Text>
        <Box style={{ margin: '20px 0 0 0' }}>
          {items.length > 0 &&
            items.map(
              (item) =>
                !item.isDone && (
                  <ComposeCardItem
                    key={item.id}
                    item={item}
                    changeStatus={(id: number) => changeStatus(id)}
                    removeItem={(id: number) => removeItem(id)}
                    updateItems={(id: number, title: string) =>
                      updateItems(id, title)
                    }
                  />
                )
            )}
          {isAdd && (
            <S.Article ref={contentRef}>
              <S.ArticleIcon />
              <S.ArticleContainer isContent={true}>
                <S.ArticleContent>
                  <Box>
                    <FormTextarea
                      placeholder={'What is most important to get done today?'}
                      {...register('title')}
                    />
                    <S.ArticleEditor>
                      <S.IconButton
                        disabled={!watch('title')}
                        onClick={() => {
                          const title = watch('title');
                          createItems(title, false);
                        }}
                      >
                        <AddCircleIcon />
                      </S.IconButton>
                      <S.IconButton disabled={!watch('title')}>
                        <DeleteIcon />
                      </S.IconButton>
                    </S.ArticleEditor>
                  </Box>
                </S.ArticleContent>
              </S.ArticleContainer>
            </S.Article>
          )}

          <S.AddItems
            onClick={() => {
              setIsAdd(true);
              setIsContent(-1);
              reset({
                title: '',
              });
            }}
          >
            <S.AddItemIcon />
            <Text font={{ size: 'S', weight: 300 }} color="purple">
              Add Item
            </Text>
          </S.AddItems>
        </Box>
      </Box>

      {/* done */}
      <Box style={{ margin: '50px 0 0 0' }}>
        <Text font={{ size: 'M', weight: 600 }}>Happend</Text>
        <Box style={{ margin: '20px 0 0 0' }}>
          {items.length > 0 &&
            items.map(
              (item) =>
                item.isDone && (
                  <ComposeCardItem
                    key={item.id}
                    item={item}
                    changeStatus={(id: number) => changeStatus(id)}
                    removeItem={(id: number) => removeItem(id)}
                    updateItems={(id: number, title: string) =>
                      updateItems(id, title)
                    }
                  />
                )
            )}
          {isDone && (
            <S.Article ref={contentRef}>
              <S.ArticleIcon isDone={true} />
              <S.ArticleContainer isContent={true}>
                <S.ArticleContent>
                  <Box>
                    <FormTextarea
                      placeholder={
                        'What was the most important thing that happened?'
                      }
                      {...register('title')}
                    />
                    <S.ArticleEditor>
                      <S.IconButton
                        disabled={!watch('title')}
                        onClick={() => {
                          const title = watch('title');
                          createItems(title, true);
                        }}
                      >
                        <AddCircleIcon />
                      </S.IconButton>
                      <S.IconButton disabled={!watch('title')}>
                        <DeleteIcon />
                      </S.IconButton>
                    </S.ArticleEditor>
                  </Box>
                </S.ArticleContent>
              </S.ArticleContainer>
            </S.Article>
          )}

          <S.AddItems
            onClick={() => {
              setIsDone(true);
              setIsContent(-1);
              reset({
                title: '',
              });
            }}
          >
            <S.AddItemIcon />
            <Text font={{ size: 'S', weight: 300 }} color="purple">
              Add Item
            </Text>
          </S.AddItems>
        </Box>
      </Box>
    </S.Container>
  );
};

export default ComposeComponent;
