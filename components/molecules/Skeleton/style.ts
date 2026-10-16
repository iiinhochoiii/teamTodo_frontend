import styled from 'styled-components';
import { palette } from 'styled-tools';

// 각 스켈레톤은 실제 컴포넌트(organisms/*/style.ts)와 같은 크기·여백을 따름

export const SidebarTeamRow = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

export const ContentCard = styled.article`
  margin: 0 0 30px 0;
  border: 1px solid ${palette('lightgray')};
  border-radius: 10px;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
`;

export const DirectoryItem = styled.div`
  display: flex;
  margin: 50px 0 0 40px;

  @media screen and (max-width: 900px) {
    margin: 50px 0 0 0;
  }
`;

export const MemberCard = styled.article`
  width: 48.5%;
  border: 1px solid ${palette('lightgray')};
  border-radius: 10px;
  margin: 0 0 24px 0;
  padding: 24px 18px;
  box-sizing: border-box;

  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;
