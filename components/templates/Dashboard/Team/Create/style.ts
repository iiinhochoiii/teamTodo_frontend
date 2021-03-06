import styled from 'styled-components';
import { palette, theme } from 'styled-tools';

export const Container = styled.div`
  padding: 50px 0 0 0;
  width: 50%;
  margin: 0 auto;
`;

export const CreateContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ContentDescription = styled.div`
  width: 45%;
`;

export const ContentItem = styled.div`
  width: 45%;
  & > form {
    & > input[type='text'] {
      width: calc(100% - 20px);
      height: 40px;
      border-radius: 10px;
      border: 1px solid ${palette('gray')};
      padding: 0 10px;
    }
    & > input[type='submit'] {
      margin: 20px 0 0 0;
      padding: 7.5px 15px;
      border-radius: 5px;
      background-color: ${palette('purple')};
      border: 1px solid ${palette('purple')};
      color: ${palette('white')};
      cursor: pointer;
      font-size: ${theme('font.size.S')};
      font-weight: 500;
    }
  }
`;

export const ContentTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 20px;
`;

export const ContentSubTitle = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 25px;
`;

export const TeamMemberWrap = styled.div`
  display: flex;
  margin: 8px 0;
`;

export const TeamMemberAvatar = styled.div`
  width: 32px;
  height: 32px;
  background-color: ${palette('black')};
  border-radius: 50%;
  font-size: 18px;
  color: ${palette('white')};
  font-weight: 700;
  display: flex;
  margin: 0 8px 0 0;
  & > span {
    margin: 2px auto auto;
  }
`;

export const InviteMemberItem = styled.div`
  margin: 14px 0;
  display: flex;
  & > button {
    background: none;
    border: none;
    outline: none;
    display: flex;
    cursor: pointer;

    & > svg {
      color: ${palette('purple')};
    }
  }
`;

export const ButtonContent = styled.div``;
