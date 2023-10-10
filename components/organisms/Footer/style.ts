import styled from 'styled-components';

export const StyledFooter = styled.div`
  width: 100%;
  padding: 40px 0px;
  border-top: 1px solid #e5e5e5;
`;

export const StyledFooterContent = styled.div`
  max-width: 1080px;
  width: calc(100% - 40px);
  margin: 0 auto;
  max-width: 100%;
  display: flex;
  justify-content: space-between;

  & > div {
    & > p {
      margin: 5px 0;
    }
  }
`;
