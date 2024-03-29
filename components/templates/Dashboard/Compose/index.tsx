import React, { useState, useEffect, useRef } from 'react';
import * as S from './style';
import { Text, Box, Button } from '@/components/atoms';
import {
  ComposeCardItem,
  ComposeCardAddItem,
  ComposeAddItem,
} from '@/components/organisms';
import { useForm } from 'react-hook-form';
import useContentMutation from '@/hooks/queries/content/useContentMutation';
import { useUserStore } from '@/stores/useUserStore';

import MenuItem from '@mui/material/MenuItem';
import useTeamsData from '@/hooks/queries/team/useTeamsData';

type Item = {
  id: number;
  title: string;
  isDone: boolean;
};

const ComposeComponent = () => {
  const { user } = useUserStore();
  const [isAdd, setIsAdd] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const { reset } = useForm();
  const { createMutation } = useContentMutation();
  const [teamId, setTeamId] = useState<string | number>('');

  const { data: teams } = useTeamsData();

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

    if (items.length === 0) {
      alert('Plan 또는 Happend를 입력해주세요.');
      return;
    }

    const content = {
      creatorUserId: user?.id,
      plan: items.filter((item) => !item.isDone).map((i) => i.title),
      happend: items.filter((item) => item.isDone).map((i) => i.title),
      teamId: teamId === '' || typeof teamId === 'string' ? null : teamId,
    };

    createMutation.mutate(content);
  };

  return (
    <S.Container>
      <S.Title>작업 예정이거나, 완료한 일정을 팀원에게 공유해보세요.</S.Title>
      <Box>
        <Text>Team Select</Text>
        <S.CustomSelect
          displayEmpty
          value={teamId}
          onChange={(e: any) => setTeamId(e.target.value)}
        >
          <MenuItem value={''}>No team selected (Personal)</MenuItem>
          {teams?.map((team) => (
            <MenuItem value={team.id} key={team.id}>
              {team.name}
            </MenuItem>
          ))}
        </S.CustomSelect>
      </Box>
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
        <Button background="purple" onClick={createHandler}>
          등록하기
        </Button>
      </Box>
    </S.Container>
  );
};

export default ComposeComponent;
