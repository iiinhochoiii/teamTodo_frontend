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
  ArticleContainer,
} from './style';
import { Text, Box, FormTextarea } from '@/components/atoms';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
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
  const itemRef: React.MutableRefObject<Item[]> = useRef([]);
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

  console.log(items);
  return (
    <Container>
      <Title>작업 예정이거나, 완료한 일정을 팀원에게 공유해보세요.</Title>
      <Box style={{ margin: '50px 0 0 0' }}>
        <Text font={{ size: 'M', weight: 600 }}>Plan</Text>
        <Box style={{ margin: '20px 0 0 0' }}>
          {items.length > 0 &&
            items.map(
              (item) =>
                !item.isDone && (
                  <Article key={item.id} ref={contentRef}>
                    <ArticleIcon onClick={() => console.log('test')} />
                    <ArticleContainer
                      isContent={item.id === isContent}
                      onClick={() => {
                        setIsContent(item.id);
                        setIsAdd(false);
                        reset({
                          title: item.title,
                        });
                      }}
                    >
                      <ArticleContent>
                        {isContent === item.id ? (
                          <Box>
                            <FormTextarea {...register('title')} />
                            <ArticleEditor>
                              <IconButton
                                disabled={!watch('title')}
                                onClick={() => {
                                  const title = watch('title');
                                  updateItems(item.id, title);
                                }}
                              >
                                <ChangeCircleIcon />
                              </IconButton>
                              <IconButton
                                disabled={!watch('title')}
                                onClick={() => removeItem(item.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </ArticleEditor>
                          </Box>
                        ) : (
                          <Text font={{ size: 'S', weight: 300 }}>
                            {item.title}
                          </Text>
                        )}
                      </ArticleContent>
                    </ArticleContainer>
                  </Article>
                )
            )}
          {isAdd && (
            <Article isContent={true} ref={contentRef}>
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
                        createItems(title, false);
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
              setIsContent(-1);
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

      {/* done */}
      <Box style={{ margin: '50px 0 0 0' }}>
        <Text font={{ size: 'M', weight: 600 }}>Happend</Text>
        <Box style={{ margin: '20px 0 0 0' }}>
          {items.length > 0 &&
            items.map(
              (item) =>
                item.isDone && (
                  <Article
                    key={item.id}
                    isContent={item.id === isContent}
                    onClick={() => {
                      setIsContent(item.id);
                      setIsDone(false);
                      reset({
                        title: item.title,
                      });
                    }}
                    ref={contentRef}
                  >
                    <ArticleIcon />
                    <ArticleContent>
                      {isContent === item.id ? (
                        <Box>
                          <FormTextarea {...register('title')} />
                          <ArticleEditor>
                            <IconButton
                              disabled={!watch('title')}
                              onClick={() => {
                                const title = watch('title');
                                updateItems(item.id, title);
                              }}
                            >
                              <ChangeCircleIcon />
                            </IconButton>
                            <IconButton
                              disabled={!watch('title')}
                              onClick={() => removeItem(item.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </ArticleEditor>
                        </Box>
                      ) : (
                        <Text font={{ size: 'S', weight: 300 }}>
                          {item.title}
                        </Text>
                      )}
                    </ArticleContent>
                  </Article>
                )
            )}
          {isDone && (
            <Article isContent={true} ref={contentRef}>
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
                        createItems(title, true);
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
              setIsDone(true);
              setIsContent(-1);
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
