import React, { useRef, useState, useEffect } from 'react';
import * as S from './style';
import { useForm } from 'react-hook-form';
import { Text, Box, FormTextarea } from '@/components/atoms';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import DeleteIcon from '@material-ui/icons/Delete';

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
  const { register, watch, reset } = useForm();

  useEffect(() => {
    if (item.title) {
      reset({
        title: item.title,
      });
      setIsContent(false);
    }
  }, [item]);
  const contentRef: React.MutableRefObject<HTMLDivElement | null> =
    useRef(null);

  const [isContent, setIsContent] = useState(false);

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
      setIsContent(false);
    }
  };

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
