import styled from 'styled-components';

export const StyledFooter = styled.div`
  width: 100%;
  padding: 40px 0px;
  border-top: 1px solid #e5e5e5;
`;

// Header(HeaderContent)와 같은 폭·정렬 기준
export const StyledFooterContent = styled.div`
  max-width: 1080px;
  width: calc(100% - 40px);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  & > div {
    & > p {
      margin: 5px 0;
    }
  }
`;

export const StyledFooterIconWrap = styled.div`
  flex-shrink: 0;
  display: flex;

  svg {
    width: 28px;
    height: 28px;
  }
`;
