import React, { useState } from 'react';
import * as S from './style';
import dynamic from 'next/dynamic';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useQuery } from 'react-query';
import { getMy } from '@/apis/user';
import { IEmojiData } from 'emoji-picker-react';
import { Button } from '@/components/atoms';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { updateUser } from '@/apis/user';

const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

const ProfileTabHeader = () => {
  const { data: user } = useQuery('users', () => getMy());
  const queryClient = useQueryClient();

  const [isEmoji, setIsEmoji] = useState(false);
  const [emojiData, setEmojiData] = useState<IEmojiData>();
  const router = useRouter();

  const onEmojiClick = (
    _: React.MouseEvent<Element, MouseEvent>,
    data: IEmojiData
  ) => {
    setEmojiData(data);
    setIsEmoji(false);
  };

  const uploadProfile = () => {
    if (!emojiData) {
      alert('프로필을 설정해주세요.');
      return;
    }

    updateMutaion.mutate();
  };

  const updateMutaion = useMutation(
    () => updateUser({ profile: emojiData?.emoji }),
    {
      onSuccess: (res) => {
        if (res.result) {
          alert('프로필이 변경 되었습니다.');
          queryClient.invalidateQueries('users');
          setEmojiData(undefined);
        }
      },
      onError: () => {
        console.log('err');
      },
    }
  );

  return (
    <S.Container>
      <S.Content>
        <S.AvatarWrap>
          {emojiData ? (
            <p className="avatar-emoji">{emojiData.emoji}</p>
          ) : (
            <p className="avatar-emoji">{user?.profile}</p> || (
              <AccountBoxIcon />
            )
          )}
          <button className="emoji-upload" onClick={() => setIsEmoji(!isEmoji)}>
            Change Emoji
          </button>
          {isEmoji && <Picker onEmojiClick={onEmojiClick} />}
          {emojiData?.emoji && (
            <div className="emoji-btn-wrap">
              <Button background="red" onClick={() => setEmojiData(undefined)}>
                cancel
              </Button>
              <Button background="purple" onClick={() => uploadProfile()}>
                save
              </Button>
            </div>
          )}
        </S.AvatarWrap>
        <S.InfoWrap>
          <S.InfoHeader>
            <Link href="/dashboard/profile/information">
              <a>
                <div>
                  <p>Information</p>
                </div>
                <ArrowForwardIosIcon />
              </a>
            </Link>
          </S.InfoHeader>
          <S.InfoContent isNotBorder={true}>
            <div className="row-label">Email</div>
            <div className="row-content">{user?.email}</div>
          </S.InfoContent>
          <S.InfoContent>
            <div className="row-label">Position</div>
            <div className="row-content">{user?.position}</div>
          </S.InfoContent>
          <S.InfoContent>
            <div className="row-label">name</div>
            <div className="row-content">{user?.name}</div>
          </S.InfoContent>
          <S.InfoContent>
            <div className="row-label">Phone</div>
            <div className="row-content">{user?.phone}</div>
          </S.InfoContent>
        </S.InfoWrap>
        <S.InfoWrap>
          <S.InfoHeader>
            <Link href="/dashboard/profile/password">
              <a>
                <div>
                  <p>Password</p>
                </div>
                <ArrowForwardIosIcon />
              </a>
            </Link>
          </S.InfoHeader>
          <S.InfoContent isNotBorder={true}>
            <div className="row-empty">if you want change password</div>
          </S.InfoContent>
        </S.InfoWrap>
      </S.Content>
      <S.TabWrap>
        <li
          className={router.pathname.includes('/infomation') ? 'isRouted' : ''}
        >
          <Link href="/dashboard/profile/infomation">
            <a>Infomation</a>
          </Link>
        </li>
        <li className={router.pathname.includes('/password') ? 'isRouted' : ''}>
          <Link href="/dashboard/profile/password">
            <a>password</a>
          </Link>
        </li>
      </S.TabWrap>
    </S.Container>
  );
};

export default ProfileTabHeader;
