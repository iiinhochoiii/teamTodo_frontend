import React, { useEffect, useRef } from 'react';
import * as S from './style';
import { Box, FormTextarea } from '@/components/atoms';
import { useForm } from 'react-hook-form';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';

interface Props {
  setIsAddCallback: (value: boolean) => void;
  createItems: (title: string, isDone: boolean) => void;
  isDone?: boolean;
  placeholder?: string;
}
const CardAddItem = (props: Props) => {
  const { setIsAddCallback, createItems, isDone, placeholder } = props;

  const { register, watch } = useForm();

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
      setIsAddCallback(false);
    }
  };

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
