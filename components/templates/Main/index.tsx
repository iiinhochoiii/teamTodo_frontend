import React from 'react';
import { Section, Text, Button, Flex, Box } from '@/components/atoms';
import { ImageFrame } from '@/components/molecules';
import * as S from './style';
import Image from 'next/image';

const MainComponent = () => {
  return (
    <>
      <Section background="lightpurple" style={{ padding: '200px 0 100px 0' }}>
        <S.MainBanner>
          <S.MainBannerContentWrap>
            <S.StyledTitle>Better TeamWork, Share My Work</S.StyledTitle>
            <Text font={{ size: 'M', weight: 400 }} color="gray">
              TeamTodo는 실시간으로 어떤 업무를 진행하는지 공유를 하여 <br />
              더욱 효율적으로 협업을 할 수 있도록 도와줍니다.
            </Text>
            <Button
              size="XL"
              background="purple"
              font={{ size: 'M', weight: 'bold' }}
              sx={{ margin: '50px 0 100px' }}
              to="/auth/signup"
            >
              무료로 시작하기
            </Button>
          </S.MainBannerContentWrap>
          <S.MainBannerImageWrap>
            <Image src="/images/banner.png" layout="fill" />
          </S.MainBannerImageWrap>
        </S.MainBanner>
      </Section>
      <Section style={{ padding: '100px 0 0 0' }}>
        <S.StyledContent>
          <S.StyledTitle>What is TeamTodo?</S.StyledTitle>
          <Text font={{ size: 'M', weight: '500' }} color="gray">
            TeamTodo는 개인과 팀을 연결하여 효율적인 업무를 돕습니다.
          </Text>
        </S.StyledContent>
        <Flex justify="space-between" style={{ margin: '150px 0 0 0' }}>
          <Box width={1.98 / 3}>
            <ImageFrame background="purple">
              <Image src="/images/write-plan.png" layout="fill" />
            </ImageFrame>
          </Box>
          <Box width={0.98 / 3}>
            <Text
              font={{ size: 'M' }}
              color="lightred"
              sx={{ margin: '15px 0 0 0' }}
            >
              Write my plan and happend
            </Text>
            <Text
              font={{ size: 'L', weight: '600' }}
              sx={{ margin: '15px 0 0 0 ' }}
            >
              개인의 일정을 관리합니다.
            </Text>
            <Text
              font={{ size: 'M' }}
              color="gray"
              sx={{ margin: '15px 0 0 0' }}
            >
              오늘 예정되었거나 완료된 일에 대해서 기록 합니다. <br />
              어떠한 작업을 진행중인지 쉽게 파악할 수 있습니다.
            </Text>
          </Box>
        </Flex>
        <Flex justify="space-between" style={{ margin: '150px 0 0 0' }}>
          <Box width={0.98 / 3}>
            <Text
              font={{ size: 'M' }}
              color="lightred"
              sx={{ margin: '15px 0 0 0' }}
            >
              Set a teams
            </Text>
            <Text
              font={{ size: 'L', weight: '600' }}
              sx={{ margin: '15px 0 0 0 ' }}
            >
              팀을 생성하고 관리 합니다.
            </Text>
            <Text
              font={{ size: 'M' }}
              color="gray"
              sx={{ margin: '15px 0 0 0' }}
            >
              팀을 생성하고 구성원들을 관리 합니다. <br />
              팀의 뚜렷한 목표를 달성하기 위해 돕습니다
            </Text>
          </Box>
          <Box width={1.98 / 3}>
            <ImageFrame background="purple">
              <Image src="/images/set-teams.png" layout="fill" priority />
            </ImageFrame>
          </Box>
        </Flex>

        <Flex justify="space-between" style={{ margin: '150px 0 150px 0' }}>
          <Box width={1.98 / 3}>
            <ImageFrame background="purple">
              <Image src="/images/share-plan.png" layout="fill" />
            </ImageFrame>
          </Box>
          <Box width={0.98 / 3}>
            <Text
              font={{ size: 'M' }}
              color="lightred"
              sx={{ margin: '15px 0 0 0' }}
            >
              Share plan to teams
            </Text>
            <Text
              font={{ size: 'XL', weight: '600' }}
              sx={{ margin: '15px 0 0 0 ' }}
            >
              팀에 소속된 구성원들끼리 일정을 공유합니다.
            </Text>
            <Text
              font={{ size: 'M' }}
              color="gray"
              sx={{ margin: '15px 0 0 0' }}
            >
              구성원들과 일정을 공유합니다. 또한, 팀의 목표를 달성하기 위해 잘
              진행 중인지 한 눈에 쉽게 파악하도록 돕습니다.
            </Text>
          </Box>
        </Flex>
      </Section>
      <Section background="lightpurple" style={{ padding: '60px 0 0 0' }}>
        <S.StyledContent>
          <S.StyledTitle>
            업무 내용을 팀원과 공유를 하고 팀 목표를 달성해보세요.
          </S.StyledTitle>
          <Text font={{ size: 'L', weight: '600' }} color="black">
            지금 시작해보세요.
          </Text>
          <Button
            size="XL"
            font={{ size: 'M', weight: 'bold', color: 'white' }}
            background="purple"
            sx={{ margin: '50px 0 100px' }}
            to="/auth/signup"
          >
            무료로 시작하기
          </Button>
          <Flex justify="center" style={{ margin: '0 0 60px 0' }}>
            <Text
              color="black"
              font={{ size: 'L', weight: '600' }}
              style={{ margin: 'auto 0' }}
            >
              혹시 궁금한 점이 있으신가요?
            </Text>
            <Button
              background="purple"
              font={{ color: 'white', weight: 'bold' }}
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
