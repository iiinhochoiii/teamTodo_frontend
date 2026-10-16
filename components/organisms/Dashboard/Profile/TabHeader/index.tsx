import React, { useState } from 'react';
import * as S from './style';
import dynamic from 'next/dynamic';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IEmojiData } from 'emoji-picker-react';
import { Button, PendingBar, PendingLabel } from '@/components/atoms';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useUsersData from '@/queries/user/useUsersData';
import useUserMutation from '@/queries/user/useUserMutation';

const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

const ProfileTabHeader = () => {
  const { data: user } = useUsersData();
  const { updateMutaion } = useUserMutation();

  const [isEmoji, setIsEmoji] = useState(false);
  const [emojiData, setEmojiData] = useState<IEmojiData>();
  const pathname = usePathname();

  // 저장(변경)과 삭제가 같은 mutation 을 쓰므로 요청 값으로 어떤 작업인지 구분
  const isPending = updateMutaion.isLoading;
  const isDeleting = isPending && updateMutaion.variables?.profile === '';
  const isSaving = isPending && !isDeleting;

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

    const params = {
      name: user?.name,
      phone: user?.phone,
      profile: emojiData.emoji,
    };
    setIsEmoji(false);
    // 선택한 이모지는 내 정보 재조회가 끝날 때까지 유지 (저장 중 이전 이모지로 깜빡이지 않도록)
    updateMutaion.mutate(params, {
      onSuccess: () => setEmojiData(undefined),
    });
  };

  const deleteEmoji = () => {
    if (window.confirm('프로필 이미지를 삭제하시겠습니까?')) {
      const params = {
        name: user?.name,
        phone: user?.phone,
        profile: '',
      };
      setIsEmoji(false);
      setEmojiData(undefined);
      updateMutaion.mutate(params);
    }
  };

  return (
    <S.Container>
      <S.Content>
        <S.AvatarWrap $isPending={isPending} aria-busy={isPending}>
          {isPending && (
            <PendingBar
              color={isDeleting ? 'red' : 'purple'}
              style={{ borderRadius: '8px 8px 0 0' }}
            />
          )}
          {user?.profile ? (
            emojiData ? (
              <p className="avatar-emoji">{emojiData.emoji}</p>
            ) : (
              <p className="avatar-emoji">{user?.profile}</p>
            )
          ) : emojiData ? (
            <p className="avatar-emoji">{emojiData.emoji}</p>
          ) : (
            <AccountBoxIcon />
          )}
          <button
            className="emoji-btn emoji-upload"
            disabled={isPending}
            onClick={() => setIsEmoji(!isEmoji)}
          >
            Change Emoji
          </button>

          {user?.profile && (
            <button
              className={`emoji-btn emoji-delete${
                isDeleting ? ' is-pending' : ''
              }`}
              disabled={isPending}
              onClick={() => deleteEmoji()}
            >
              {isDeleting ? <PendingLabel>deleting...</PendingLabel> : 'delete'}
            </button>
          )}

          {isEmoji && <Picker onEmojiClick={onEmojiClick} />}
          {emojiData?.emoji && (
            <div className="emoji-btn-wrap">
              <Button
                background="red"
                disabled={isPending}
                onClick={() => setEmojiData(undefined)}
              >
                cancel
              </Button>
              <Button
                background="purple"
                disabled={isPending}
                aria-busy={isSaving}
                onClick={() => uploadProfile()}
              >
                {isSaving ? <PendingLabel>saving...</PendingLabel> : 'save'}
              </Button>
            </div>
          )}
        </S.AvatarWrap>
        <S.InfoWrap>
          <S.InfoHeader>
            <Link href="/dashboard/profile/information">
              <div>
                <p>Information</p>
              </div>
              <ArrowForwardIosIcon />
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
              <div>
                <p>Password</p>
              </div>
              <ArrowForwardIosIcon />
            </Link>
          </S.InfoHeader>
          <S.InfoContent isNotBorder={true}>
            <div className="row-empty">if you want change password</div>
          </S.InfoContent>
        </S.InfoWrap>
      </S.Content>
      <S.TabWrap>
        <li className={pathname.includes('/information') ? 'isRouted' : ''}>
          <Link href="/dashboard/profile/information">Information</Link>
        </li>
        <li className={pathname.includes('/password') ? 'isRouted' : ''}>
          <Link href="/dashboard/profile/password">password</Link>
        </li>
      </S.TabWrap>
    </S.Container>
  );
};

export default ProfileTabHeader;
