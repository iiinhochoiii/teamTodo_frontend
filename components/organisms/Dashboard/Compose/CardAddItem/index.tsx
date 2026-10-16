import React, { useEffect, useRef } from 'react';
import * as S from './style';
import { Box, FormTextarea } from '@/components/atoms';
import { useForm } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import useClickOutside from '@/hooks/useClickOutside';

interface Props {
  setIsAddCallback: (value: boolean) => void;
  createItems: (title: string, isDone: boolean) => void;
  isDone?: boolean;
  placeholder?: string;
}
const CardAddItem = (props: Props) => {
  const { setIsAddCallback, createItems, isDone, placeholder } = props;

  const { register, watch, setFocus, getValues } = useForm();

  const contentRef = useRef<HTMLDivElement>(null);

  // Add Item 클릭으로 입력 박스가 나타나면 바로 입력할 수 있도록 포커스
  useEffect(() => {
    setFocus('title');
  }, [setFocus]);

  // 박스 바깥을 클릭하면 입력한 내용이 있을 때 자동으로 추가하고 닫음
  useClickOutside(contentRef, () => {
    const title: string = getValues('title') || '';

    if (title.trim()) {
      createItems(title, !!isDone);
    } else {
      setIsAddCallback(false);
    }
  });

  return (
    <S.Article ref={contentRef}>
      <S.ArticleIcon />
      <S.ArticleContainer isContent={true}>
        <S.ArticleContent>
          <Box>
            <FormTextarea placeholder={placeholder} {...register('title')} />
            <S.ArticleEditor>
              <S.IconButton
                disabled={!watch('title')}
                onClick={() => {
                  const title = watch('title');
                  createItems(title, !!isDone);
                }}
              >
                <AddCircleIcon />
              </S.IconButton>
              <S.IconButton disabled={true}>
                <DeleteIcon />
              </S.IconButton>
            </S.ArticleEditor>
          </Box>
        </S.ArticleContent>
      </S.ArticleContainer>
    </S.Article>
  );
};

export default CardAddItem;
