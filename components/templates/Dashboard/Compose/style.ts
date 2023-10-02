import styled from 'styled-components';
import { theme } from 'styled-tools';
import Select from '@mui/material/Select';

export const Container = styled.div`
  margin: 30px 0 0 0;
  padding: 0 30px;
  width: 60%;
`;

export const Title = styled.h1`
  ${theme('font.style.subtitle2')}
`;

export const CustomSelect = styled(Select)`
  margin-top: 20px;
  width: 300px;
`;
