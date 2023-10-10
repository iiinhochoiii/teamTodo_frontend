import styled from 'styled-components';

export const Container = styled.div`
  margin: 30px auto 0 auto;
  width: 50%;
  min-width: 500px;

  @media screen and (max-width: 900px) {
    width: calc(100% - 60px);
    min-width: 400px;
  }

  @media screen and (max-width: 720px) {
    margin: 30px 30px 0 30px;
  }
`;
