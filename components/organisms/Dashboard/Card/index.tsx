import React, { useState, HTMLAttributes } from 'react';
import * as S from './style';
import {
  Box,
  Text,
  HRBox,
  Flex,
  FormTextarea,
  Button,
} from '@/components/atoms';
import { Menu } from '@/components/molecules';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import AddIcon from '@material-ui/icons/Add';
import { Dialog } from '@/components/organisms';
import { useForm } from 'react-hook-form';
import DialogActions from '@mui/material/DialogActions';
import { Content } from '@/interfaces/models/content';
import dayjs from 'dayjs';

interface Props extends HTMLAttributes<HTMLDivElement> {
  item: Content;

  remove?: (id: number) => void;
  add?: (data: { id: number; dataType: string; title: string }) => void;
  update?: (data: { id: number; plan: string[]; happend: string[] }) => void;
  removeItems?: (data: {
    id: number;
    dataType: string;
    updateId: number;
  }) => void;
}

const Card = (props: Props) => {
  const { item, remove, add, update, removeItems } = props;

  const [isOpen, setIsOpen] = useState(false); // 메뉴 open값
  const [isOpenItem, setIsOpenItem] = useState(false); // addiItem에 대한 값
  const [isCreateDialog, setIsCreateDialog] = useState(false); // item 생성 다이어로그
  const [isUpdateDialog, setIsUpdateDialog] = useState(false); // item 변경 다이어로그
  const [updateId, setUpdateId] = useState<number>(-1);
  const [updateInfo, setUpdateInfo] = useState<{
    index: number;
    type: string;
  }>();
  const [dataType, setDataType] = useState('');

  const { register, watch, reset } = useForm();

  const onClickHandler = (type: string) => {
    if (watch('title')) {
      const data = {
        id: item.id,
        dataType: dataType,
        title: watch('title'),
      };

      if (type === 'add' && add) {
        add(data);
      } else if (type === 'update' && update) {
        update({
          id: item.id,
          plan: item.plan.map((v, i) =>
            updateInfo?.type === 'plan'
              ? i === updateInfo.index
                ? watch('title')
                : v
              : v
          ),
          happend: item.plan.map((v, i) =>
            updateInfo?.type === 'happend'
              ? i === updateInfo.index
                ? watch('title')
                : v
              : v
          ),
        });
      } else if (type === 'remove' && removeItems) {
        removeItems({
          id: data.id,
          dataType: dataType,
          updateId: updateId,
        });
      }
      setDataType('');
      reset({
        title: '',
      });
    }
  };

  // useEffect(() => {
  //   if (updateId >= 0) {
  //     reset({
  //       title:
  //         dataType === 'today'
  //           ? item.data.t[updateId]?.title
  //           : item.data.y[updateId]?.title,
  //     });
  //   } else {
  //     reset({
  //       title: '',
  //     });
  //   }
  // }, [dataType, updateId]);

  return (
    <S.StyledCard>
      <S.StyledCardHeader>
        <Box width="30px">
          <S.CardBadge></S.CardBadge>
        </Box>
        <Box sx={{ margin: '0 0 0 20px' }}>
          <Flex justify="space-between">
            <Text>
              {/* {item.userName} */}
              {item.id}
            </Text>
            <Box width="auto" style={{ position: 'relative' }}>
              <MoreHoriz onClick={() => setIsOpen(!isOpen)} />
              {isOpen && (
                <Menu>
                  <Box
                    onClick={() => {
                      setIsOpenItem(!isOpenItem);
                      setIsOpen(false);
                    }}
                  >
                    <Text font={{ size: 'S', weight: 400 }}>
                      {isOpenItem ? 'Done Add Items' : 'Add Items'}
                    </Text>
                  </Box>
                  <Box
                    onClick={() => {
                      if (remove) {
                        remove(item.id);
                      }
                    }}
                  >
                    <Text font={{ size: 'S', weight: 400 }}>Remove</Text>
                  </Box>
                </Menu>
              )}
            </Box>
          </Flex>
          <Text font={{ size: 'XS' }} color="gray">
            {dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}
          </Text>
        </Box>
      </S.StyledCardHeader>
      <S.CardContent>
        {item.plan.map((i, index) => (
          <S.CardContentItem
            key={index}
            onClick={() => {
              setIsUpdateDialog(true);
              setUpdateInfo({
                index: index,
                type: 'plan',
              });
              reset({
                title: i,
              });
            }}
          >
            <S.CardContentIcon />
            <Box>
              <Text font={{ size: 'M', weight: 300 }}>{i}</Text>
            </Box>
          </S.CardContentItem>
        ))}
        {isOpenItem && (
          <S.CardContentItem
            onClick={() => {
              setIsCreateDialog(true);
            }}
          >
            <AddIcon />
            <Box>
              <Text color="purple" font={{ size: 'S', weight: 400 }}>
                Add Items
              </Text>
            </Box>
          </S.CardContentItem>
        )}
      </S.CardContent>
      <HRBox color="lightgray" />
      <S.CardContent>
        {item.happend.map((i, index) => (
          <S.CardContentItem
            key={index}
            onClick={() => {
              setIsUpdateDialog(true);
              setUpdateInfo({
                index: index,
                type: 'happend',
              });
              reset({
                title: i,
              });
            }}
          >
            <S.CardContentIcon type="done" />
            <Box>
              <Text font={{ size: 'M', weight: 300 }}>{i}</Text>
            </Box>
          </S.CardContentItem>
        ))}
        {isOpenItem && (
          <S.CardContentItem
            onClick={() => {
              setIsCreateDialog(true);
              setDataType('yesterday');
              setUpdateId(-1);
            }}
          >
            <AddIcon />
            <Box>
              <Text color="purple" font={{ size: 'S', weight: 400 }}>
                Add Items
              </Text>
            </Box>
          </S.CardContentItem>
        )}
      </S.CardContent>
      {isCreateDialog && (
        <Dialog
          open={isCreateDialog}
          setOpen={setIsCreateDialog}
          title="Add Items"
          footer={
            <DialogActions>
              <Button
                size="M"
                onClick={() => {
                  onClickHandler('add');
                  setIsCreateDialog(false);
                }}
              >
                Add
              </Button>
            </DialogActions>
          }
        >
          <FormTextarea
            {...register('title')}
            font={{ size: 'ML', weight: 600 }}
            style={{ minHeight: '80px' }}
          />
        </Dialog>
      )}

      {isUpdateDialog && (
        <Dialog
          open={isUpdateDialog}
          setOpen={setIsUpdateDialog}
          title="Update Items"
          footer={
            <DialogActions>
              <Button
                size="ML"
                onClick={() => {
                  onClickHandler('remove');
                  setIsUpdateDialog(false);
                }}
              >
                Remove
              </Button>
              <Button
                size="M"
                onClick={() => {
                  onClickHandler('update');
                  setIsUpdateDialog(false);
                }}
              >
                Update
              </Button>
            </DialogActions>
          }
        >
          <FormTextarea
            {...register('title')}
            font={{ size: 'ML', weight: 600 }}
            style={{ minHeight: '80px' }}
          />
        </Dialog>
      )}
    </S.StyledCard>
  );
};

export default Card;
