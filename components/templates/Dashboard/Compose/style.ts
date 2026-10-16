import styled, { css } from 'styled-components';
import { theme } from 'styled-tools';
import Select from '@mui/material/Select';

export const Container = styled.div<{ $isPending?: boolean }>`
  position: relative;
  margin: 30px 0 0 0;
  padding: 0 30px;
  width: 60%;

  .compose-form {
    transition: opacity 0.2s ease;
  }

  ${(props) =>
    props.$isPending &&
    css`
      .compose-form {
        opacity: 0.5;
        pointer-events: none;
      }
    `}
`;

export const Title = styled.h1`
  ${theme('font.style.subtitle2')}
`;

export const CustomSelect = styled(Select)`
  margin-top: 20px;
  width: 300px;
`;
