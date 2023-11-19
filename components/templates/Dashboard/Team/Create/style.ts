import styled from 'styled-components';
import { palette, theme } from 'styled-tools';

export const Container = styled.div`
  padding: 50px 0 0 0;
  width: 50%;
  margin: 0 auto;

  @media screen and (max-width: 900px) {
    width: 90%;
  }
`;

export const CreateContent = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 900px) {
    flex-wrap: wrap;
  }
`;

export const ContentDescription = styled.div`
  width: 45%;
`;

export const ContentItem = styled.div`
  width: 45%;
  & > form {
    margin-bottom: 20px;

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

  @media screen and (max-width: 900px) {
    width: 100%;
    margin-top: 20px;
  }
`;

export const EmojiWrap = styled.div`
  position: relative;
  .emoji-content {
    margin-top: 10px;
    display: flex;
    & > div {
      margin-right: 10px;
      font-size: 30px;
    }
    & > button {
      background: none;
      border: none;
      color: ${palette('purple')};
      font-size: ${theme('font.size.M')};
      cursor: pointer;
      padding: 0;
    }
  }

  .emoji-picker-react {
    position: absolute;
    z-index: 1000;
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
  border-radius: 50%;
  display: flex;
  margin: 0 8px 0 0;
  border: 2px solid ${palette('gray')};

  & > p {
    margin: 0 auto 0 auto;
    font-size: 30px;
    line-height: 29px;
  }

  & > svg {
    width: 100%;
    height: 100%;
    color: ${palette('lightgray')};
    z-index: 100;
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

export const ButtonContent = styled.div`
  margin-bottom: 30px;
`;
