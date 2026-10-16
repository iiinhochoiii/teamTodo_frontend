import React, { useState, useEffect, useRef } from 'react';
import * as S from './style';
import {
  Text,
  Box,
  Button,
  PendingBar,
  PendingLabel,
} from '@/components/atoms';
import {
  ComposeCardItem,
  ComposeCardAddItem,
  ComposeAddItem,
} from '@/components/organisms';
import { useForm } from 'react-hook-form';
import useContentMutation from '@/queries/content/useContentMutation';
import { useUserStore } from '@/stores/useUserStore';

import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';
import useTeamsData from '@/queries/team/useTeamsData';

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

  // 항목 id 는 삭제 후에도 겹치지 않도록 계속 증가시킴 (items.length 를 쓰면 삭제 후 추가 시 id 중복)
  const nextItemId = useRef(0);

  const createItems = (title: string, isDone: boolean) => {
    setIsAdd(false);
    setIsDone(false);
    const id = nextItemId.current++;
    setItems((state) => [
      ...state,
      {
        id,
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
    setItems((state) => state.filter((item) => item.id !== id));
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

  // 등록 성공 시 곧바로 페이지 이동하므로, 이동이 끝날 때까지 pending 유지 (중복 등록 방지)
  const isPending = createMutation.isLoading || createMutation.isSuccess;

  const createHandler = () => {
    if (!user?.id || isPending) {
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
    <S.Container $isPending={isPending} aria-busy={isPending}>
      {isPending && <PendingBar style={{ top: '-30px' }} />}
      <S.Title>작업 예정이거나, 완료한 일정을 팀원에게 공유해보세요.</S.Title>
      <div className="compose-form">
        <Box>
          <Text>Team Select</Text>
          <S.CustomSelect
            displayEmpty
            value={teamId}
            onChange={(e: SelectChangeEvent<unknown>) =>
              setTeamId(e.target.value as string | number)
            }
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
      </div>
      <Box sx={{ margin: '40px 0 0 0' }}>
        <Button
          background="purple"
          onClick={createHandler}
          disabled={isPending}
          aria-busy={isPending}
          sx={isPending ? { opacity: 0.7, cursor: 'progress' } : undefined}
        >
          {isPending ? <PendingLabel>등록 중...</PendingLabel> : '등록하기'}
        </Button>
      </Box>
    </S.Container>
  );
};

export default ComposeComponent;
