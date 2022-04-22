import React from 'react';
import { Box, Text, Link } from '@/components/atoms';
import GitHubIcon from '@material-ui/icons/GitHub';
import { StyledFooter, StyledFooterContent } from './style';

const Footer = () => {
  return (
    <StyledFooter>
      <StyledFooterContent>
        <Box>
          <Text font={{ size: 'XS' }}>
            본 웹사이트는 개인 프로젝트 목적으로 제작되었습니다.
          </Text>
          <Text font={{ size: 'XS' }}>
            문의 사항 및 건의 사항은 dlsgh120@gmail.com 으로 보내주시면 답변
            드리겠습니다.
          </Text>
          <Text font={{ size: 'XS', weight: 'bold' }}>
            Copyright © 2021 by Team Todo, Inc. All rights reserved
          </Text>
        </Box>
        <Box>
          <Link href="https://github.com/dlsgh120/teamTodo_frontend">
            <GitHubIcon />
          </Link>
        </Box>
      </StyledFooterContent>
    </StyledFooter>
  );
};

export default Footer;
