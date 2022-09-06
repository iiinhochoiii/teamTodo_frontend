import React from 'react';
import * as S from './style';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useQuery } from 'react-query';
import { getMy } from '@/apis/user';
import dayjs from 'dayjs';

const ProfileTabHeader = () => {
  const { data: user } = useQuery('users', () => getMy());
  console.log(user);
  return (
    <S.Container>
      <S.Content>
        <S.AvatarWrap>
          <AccountBoxIcon />
        </S.AvatarWrap>
        <S.InfoWrap>
          <S.InfoHeader>
            <div>
              <p>Infomation</p>
            </div>
            <ArrowForwardIosIcon />
          </S.InfoHeader>
          <S.InfoContent isNotBorder={true}>
            <div className="row-label">Position</div>
            <div className="row-content">-</div>
          </S.InfoContent>
          <S.InfoContent>
            <div className="row-label">name</div>
            <div className="row-content">{user?.name}</div>
          </S.InfoContent>
          <S.InfoContent>
            <div className="row-label">Phone</div>
            <div className="row-content">{user?.phone}</div>
          </S.InfoContent>
          <S.InfoContent>
            <div className="row-label">Last Logined</div>
            <div className="row-content">
              {user?.lastLoginedAt
                ? dayjs(user?.lastLoginedAt).format('YYYY-MM-DD HH:mm:ss')
                : null}
            </div>
          </S.InfoContent>
        </S.InfoWrap>
        <S.InfoWrap>
          <S.InfoHeader>
            <div>
              <p>Password</p>
            </div>
            <ArrowForwardIosIcon />
          </S.InfoHeader>
          <S.InfoContent isNotBorder={true}>
            <div className="row-empty">if you want change password</div>
          </S.InfoContent>
        </S.InfoWrap>
      </S.Content>
    </S.Container>
  );
};

export default ProfileTabHeader;
