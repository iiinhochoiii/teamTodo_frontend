import React, { useState, useEffect, useRef, useContext } from 'react';
import * as S from './style';
import { Text, Box, Button } from '@/components/atoms';
import {
  ComposeCardItem,
  ComposeCardAddItem,
  ComposeAddItem,
} from '@/components/organisms';
import { useForm } from 'react-hook-form';
import { AppContext } from '@/contexts';
import { useMutation } from '@tanstack/react-query';
import { createContent } from '@/apis/content';
import { useRouter } from 'next/router';

type Item = {
  id: number;
  title: string;
  isDone: boolean;
};

const ComposeComponent = () => {
  const { user } = useContext(AppContext);
  const [isAdd, setIsAdd] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const { reset } = useForm();
  const { mutate } = useMutation(createContent);
  const router = useRouter();

  const [items, setItems] = useState<Item[]>([]);
  const contentRef: React.MutableRefObject<HTMLDivElement | null> =
    useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', clickContentOutside);

    return () => {
      document.removeEventListener('mousedown', clickContentOutside);
    };
  }, []);

  const clickContentOutside = (
    event: React.BaseSyntheticEvent | MouseEvent
  ) => {
    if (contentRef.current && !contentRef.current.contains(event.target)) {
      setIsAdd(false);
      setIsDone(false);
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

  const createHandler = () => {
    if (!user?.id) {
      return;
    }

    const content = {
      creatorUserId: user?.id,
      plan: items.filter((item) => !item.isDone).map((i) => i.title),
      happend: items.filter((item) => item.isDone).map((i) => i.title),
    };

    mutate(content, {
      onSuccess: () => {
        router.push('/dashboard');
      },
      onError: () => {
        console.log('error');
      },
    });
  };

  return (
    <S.Container>
      <S.Title>?????? ???????????????, ????????? ????????? ???????????? ??????????????????.</S.Title>
      <Box sx={{ margin: '50px 0 0 0' }}>
        <Text font={{ size: 'M', weight: 600 }}>Plan</Text>
        <Box sx={{ margin: '20px 0 0 0' }}>
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
            <ComposeCardAddItem
              placeholder="What is most important to get done today?"
              setIsAddCallback={(value: boolean) => setIsAdd(value)}
              createItems={(title: string, isDone: boolean) =>
                createItems(title, isDone)
              }
            />
          )}

          <ComposeAddItem
            onClickHandler={() => {
              setIsAdd(true);
              reset({
                title: '',
              });
            }}
          />
        </Box>
      </Box>

      {/* done */}
      <Box sx={{ margin: '50px 0 0 0' }}>
        <Text font={{ size: 'M', weight: 600 }}>Happend</Text>
        <Box sx={{ margin: '20px 0 0 0' }}>
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
            <ComposeCardAddItem
              placeholder="What was the most important thing that happened?"
              setIsAddCallback={(value: boolean) => setIsDone(value)}
              createItems={(title: string, isDone: boolean) =>
                createItems(title, isDone)
              }
              isDone={true}
            />
          )}

          <ComposeAddItem
            onClickHandler={() => {
              setIsDone(true);
              reset({
                title: '',
              });
            }}
          />
        </Box>
      </Box>
      <Box sx={{ margin: '40px 0 0 0' }}>
        <Button background="purple" onClick={() => createHandler()}>
          ????????????
        </Button>
      </Box>
    </S.Container>
  );
};

export default ComposeComponent;
