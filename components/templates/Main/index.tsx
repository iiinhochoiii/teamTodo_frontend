import React from 'react';
import { Section, Text, Button, Flex, Box } from '@/components/atoms';
import { ImageFrame } from '@/components/molecules';
import * as S from './style';

const MainComponent = () => {
  return (
    <>
      <Section
        background="lightbrown_gradient"
        style={{ padding: '140px 0 0 0' }}
      >
        <S.StyledContent>
          <S.StyledTitle color="black">
            Better TeamWork, Share My Work
          </S.StyledTitle>
          <Text font={{ size: 'L', weight: 400 }} color="gray">
            TeamTodo는 실시간으로 어떤 업무를 진행하는지 공유를 하여 더욱
            효율적으로 협업을 할 수 있도록 도와줍니다.
          </Text>
          <Button
            size="XL"
            font={{ size: 'M', weight: 'bold' }}
            sx={{ margin: '50px 0 100px' }}
            to="/auth/signup"
          >
            무료로 시작하기
          </Button>
        </S.StyledContent>
      </Section>
      <Section style={{ padding: '100px 0 0 0' }}>
        <S.StyledContent>
          <S.StyledTitle>What is TeamTodo?</S.StyledTitle>
          <Text font={{ size: 'M', weight: '500' }} color="gray">
            TeamTodo는 개인과 팀을 연결하여 효율적인 업무를 돕습니다.
          </Text>
        </S.StyledContent>
        <Flex justify="space-between" style={{ margin: '150px 0 0 0' }}>
          <Box width={0.98 / 2}>
            <ImageFrame background="lightbrown"></ImageFrame>
          </Box>
          <Box width={0.98 / 2}>
            <Text
              font={{ size: 'M' }}
              color="lightred"
              style={{ margin: '15px 0 0 0' }}
            >
              Share My Todo List
            </Text>
            <Text
              font={{ size: 'XL', weight: 'bold' }}
              style={{ margin: '30px 0 0 0 ' }}
            >
              더 편리하게 작성합니다.
            </Text>
            <Text
              font={{ size: 'ML' }}
              color="gray"
              style={{ margin: '30px 0 0 0' }}
            >
              오늘 예정되었거나, 완료된 일에 대해서, 같은 팀원에게 공유 합니다.
              누가 어떠한 작업을 진행중인지 쉽게 파악할 수 있습니다.
            </Text>
          </Box>
        </Flex>
        <Flex justify="space-between" style={{ margin: '150px 0 0 0' }}>
          <Box width={0.98 / 2}>
            <Text
              font={{ size: 'M' }}
              color="lightred"
              style={{ margin: '15px 0 0 0' }}
            >
              Set a Goals
            </Text>
            <Text
              font={{ size: 'XL', weight: 'bold' }}
              style={{ margin: '30px 0 0 0 ' }}
            >
              팀의 목표를 설정합니다.
            </Text>
            <Text
              font={{ size: 'ML' }}
              color="gray"
              style={{ margin: '30px 0 0 0' }}
            >
              팀의 목표를 설정하여, 해당 목표가 어디까지 진행중인지, 잘
              진행중인지 쉽게 파악하고 구성원끼리 목표를 달성하기 위해 돕습니다.
            </Text>
          </Box>
          <Box width={0.98 / 2}>
            <ImageFrame background="lightbrown"></ImageFrame>
          </Box>
        </Flex>

        <Flex justify="space-between" style={{ margin: '150px 0 150px 0' }}>
          <Box width={0.98 / 2}>
            <ImageFrame background="lightbrown"></ImageFrame>
          </Box>
          <Box width={0.98 / 2}>
            <Text
              font={{ size: 'M' }}
              color="lightred"
              style={{ margin: '15px 0 0 0' }}
            >
              Vote and check the results.
            </Text>
            <Text
              font={{ size: 'XL', weight: 'bold' }}
              style={{ margin: '30px 0 0 0 ' }}
            >
              우리의 만족도를 체크합니다.
            </Text>
            <Text
              font={{ size: 'ML' }}
              color="gray"
              style={{ margin: '30px 0 0 0' }}
            >
              쉽게 결정을하기 어렵거나, 팀원의 의견이 필요할 때, 투표를 진행하여
              더 나은 결과물을 만들도록 합니다.
            </Text>
          </Box>
        </Flex>
      </Section>
      <Section background="black" style={{ padding: '60px 0 0 0' }}>
        <S.StyledContent>
          <S.StyledTitle color="white">
            업무 내용을 팀원과 공유를 하고 팀 목표를 달성해보세요.
          </S.StyledTitle>
          <Text font={{ size: 'L', weight: 'bold' }} color="gray">
            지금 시작해보세요.
          </Text>
          <Button
            size="XL"
            font={{ size: 'M', weight: 'bold', color: 'black' }}
            background="white"
            sx={{ margin: '50px 0 100px' }}
            to="/auth/signup"
          >
            무료로 시작하기
          </Button>
          <Flex justify="center" style={{ margin: '0 0 60px 0' }}>
            <Text
              color="white"
              font={{ size: 'L', weight: 'bold' }}
              style={{ margin: 'auto 0' }}
            >
              혹시 궁금한 점이 있으신가요?
            </Text>
            <Button
              background="white"
              font={{ color: 'black', weight: 'bold' }}
              to="mailto:dlsgh120@gmail.com"
              sx={{ margin: '0 0 0 20px' }}
            >
              문의하기
            </Button>
          </Flex>
        </S.StyledContent>
      </Section>
    </>
  );
};

export default MainComponent;
