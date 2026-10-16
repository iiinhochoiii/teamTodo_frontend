import React, { useRef, useState, useEffect } from 'react';
import * as S from './style';
import { useForm } from 'react-hook-form';
import { Text, Box, FormTextarea } from '@/components/atoms';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import useClickOutside from '@/hooks/useClickOutside';

interface Props {
  item: {
    id: number;
    title: string;
    isDone: boolean;
  };
  changeStatus: (id: number) => void;
  removeItem: (id: number) => void;
  updateItems: (id: number, title: string) => void;
}

const ComposeCardItem = (props: Props) => {
  const { item, changeStatus, removeItem, updateItems } = props;
  const { register, watch, reset, getValues } = useForm();

  useEffect(() => {
    if (item.title) {
      reset({
        title: item.title,
      });
      setIsContent(false);
    }
  }, [item]);
  const contentRef = useRef<HTMLDivElement>(null);

  const [isContent, setIsContent] = useState(false);

  // 텍스트를 클릭해 수정 박스가 나타나면 포커스하고, 커서를 기존 글 끝으로 이동
  useEffect(() => {
    if (!isContent) return;

    const textarea = contentRef.current?.querySelector('textarea');
    if (textarea) {
      textarea.focus();
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    }
  }, [isContent]);

  // 수정 중 박스 바깥을 클릭하면 바뀐 내용이 있을 때 자동으로 수정하고 닫음
  useClickOutside(
    contentRef,
    () => {
      const title: string = getValues('title') || '';

      if (title.trim() && title !== item.title) {
        updateItems(item.id, title);
      } else {
        // 비우거나 그대로 두고 닫으면 원래 내용으로 되돌림
        reset({ title: item.title });
      }
      setIsContent(false);
    },
    isContent
  );

  return (
    <S.Article ref={contentRef}>
      <S.ArticleIcon
        onClick={() => changeStatus(item.id)}
        isDone={item.isDone}
      />
      <S.ArticleContainer
        isContent={isContent}
        onClick={() => {
          setIsContent(true);
        }}
      >
        <S.ArticleContent>
          {isContent ? (
            <Box>
              <FormTextarea {...register('title')} />
              <S.ArticleEditor>
                <S.IconButton
                  disabled={!watch('title')}
                  onClick={() => {
                    const title = watch('title');
                    updateItems(item.id, title);
                    setIsContent(false);
                  }}
                >
                  <ChangeCircleIcon />
                </S.IconButton>
                <S.IconButton
                  disabled={!watch('title')}
                  onClick={() => {
                    removeItem(item.id);
                  }}
                >
                  <DeleteIcon />
                </S.IconButton>
              </S.ArticleEditor>
            </Box>
          ) : (
            <Text font={{ size: 'S', weight: 300 }}>{item.title}</Text>
          )}
        </S.ArticleContent>
      </S.ArticleContainer>
    </S.Article>
  );
};
export default ComposeCardItem;
