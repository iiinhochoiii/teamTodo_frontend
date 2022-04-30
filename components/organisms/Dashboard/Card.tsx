import React, { useState, useEffect, HTMLAttributes } from 'react';
import {
  StyledCard,
  StyledCardHeader,
  CardBadge,
  CardContent,
  CardContentIcon,
  CardContentItem,
} from './style';
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

interface Props extends HTMLAttributes<HTMLDivElement> {
  item: {
    id: number;
    userName: string;
    createdAt: string;
    data: {
      t: {
        title: string;
      }[];
      y: {
        title: string;
      }[];
    };
  };

  remove: (id: number) => void;
  add: (data: { id: number; dataType: string; title: string }) => void;
  update: (data: {
    id: number;
    dataType: string;
    title: string;
    updateId: number;
  }) => void;
  removeItems: (data: {
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
  const [dataType, setDataType] = useState('');

  const { register, watch, reset } = useForm();

  const onClickHandler = (type: string) => {
    if (watch('title')) {
      const data = {
        id: item.id,
        dataType: dataType,
        title: watch('title'),
      };

      if (type === 'add') {
        add(data);
      } else if (type === 'update') {
        update({ ...data, updateId: updateId });
      } else if (type === 'remove') {
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

  useEffect(() => {
    if (updateId >= 0) {
      reset({
        title:
          dataType === 'today'
            ? item.data.t[updateId]?.title
            : item.data.y[updateId]?.title,
      });
    } else {
      reset({
        title: '',
      });
    }
  }, [dataType, updateId]);

  return (
    <StyledCard>
      <StyledCardHeader>
        <Box width="30px">
          <CardBadge></CardBadge>
        </Box>
        <Box style={{ margin: '0 0 0 20px' }}>
          <Flex justify="space-between">
            <Text>
              {item.userName}
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
                  <Box onClick={() => remove(item.id)}>
                    <Text font={{ size: 'S', weight: 400 }}>Remove</Text>
                  </Box>
                </Menu>
              )}
            </Box>
          </Flex>
          <Text font={{ size: 'XS' }} color="gray">
            {item.createdAt}
          </Text>
        </Box>
      </StyledCardHeader>
      <CardContent>
        {item.data.t.map((i, index) => (
          <CardContentItem
            key={index}
            onClick={() => {
              setIsUpdateDialog(true);
              setDataType('today');
              setUpdateId(index);
            }}
          >
            <CardContentIcon />
            <Box>
              <Text font={{ size: 'M', weight: 300 }}>{i.title}</Text>
            </Box>
          </CardContentItem>
        ))}
        {isOpenItem && (
          <CardContentItem
            onClick={() => {
              setIsCreateDialog(true);
              setDataType('today');
              setUpdateId(-1);
            }}
          >
            <AddIcon />
            <Box>
              <Text color="purple" font={{ size: 'S', weight: 400 }}>
                Add Items
              </Text>
            </Box>
          </CardContentItem>
        )}
      </CardContent>
      <HRBox color="lightgray" />
      <CardContent>
        {item.data.y.map((i, index) => (
          <CardContentItem
            key={index}
            onClick={() => {
              setIsUpdateDialog(true);
              setDataType('yesterday');
              setUpdateId(index);
            }}
          >
            <CardContentIcon type="done" />
            <Box>
              <Text font={{ size: 'M', weight: 300 }}>{i.title}</Text>
            </Box>
          </CardContentItem>
        ))}
        {isOpenItem && (
          <CardContentItem
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
          </CardContentItem>
        )}
      </CardContent>
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
          />
        </Dialog>
      )}
    </StyledCard>
  );
};

export default Card;
