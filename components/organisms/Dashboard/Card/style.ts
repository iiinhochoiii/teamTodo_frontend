import styled, { css } from 'styled-components';
import { palette, theme } from 'styled-tools';

export type CardPending = 'update' | 'remove';

// 수정 중(update)은 보라색, 삭제 중(remove)은 빨간색
const pendingColor = (pending?: CardPending) =>
  pending === 'remove' ? palette('red') : palette('purple');

export const StyledCard = styled.article<{ $pending?: CardPending }>`
  position: relative;
  margin: 0 0 30px 0;
  border: 1px solid
    ${(props) =>
      props.$pending
        ? pendingColor(props.$pending)(props)
        : palette('lightgray')(props)};
  border-radius: 10px;
  width: 100%;
  transition: border-color 0.2s ease;

  & > *:not(.card-pending-bar) {
    transition: opacity 0.2s ease;
  }

  ${(props) =>
    props.$pending &&
    css`
      & > *:not(.card-pending-bar) {
        opacity: ${props.$pending === 'remove' ? 0.35 : 0.5};
        pointer-events: none;
      }
    `}
`;

// 카드 상단 둥근 모서리에 맞춰 진행 바를 잘라내기 위한 래퍼
// (카드 자체에 overflow: hidden 을 주면 더보기 메뉴가 잘리므로 래퍼에만 적용)
export const PendingBarWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-radius: 10px 10px 0 0;
  overflow: hidden;
`;

export const PendingText = styled.span<{ $pending: CardPending }>`
  margin: 0 0 0 8px;
  font-size: ${theme('font.size.XS')};
  color: ${(props) => pendingColor(props.$pending)(props)};
`;

export const StyledCardHeader = styled.div`
  display: flex;
  padding: 20px 20px 0 20px;

  svg {
    cursor: pointer;
  }
`;

export const CardBadge = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid ${palette('gray')};
  display: flex;

  & > p {
    margin: 0 auto 0 auto;
    font-size: 28px;
    line-height: 28px;
  }

  & > svg {
    width: 100%;
    height: 100%;
    color: ${palette('lightgray')};
    z-index: 100;
  }
`;

export const CardContent = styled.div`
  padding: 10px;
`;

interface IconProps {
  type?: string;
}

export const CardContentIcon = styled.div<IconProps>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid ${palette('gray')};
  background-color: ${palette('white')};
  margin: auto 15px 2px 5px;

  ${(props) => {
    if (props.type === 'done') {
      return css`
        display: flex;
        background-color: ${palette('gray')};
        &::before {
          content: '✔';
          font-size: ${theme('font.size.XS')};
          margin: -2px auto 0 auto;
          color: ${palette('white')};
        }
      `;
    }
  }}
`;

export const CardContentItem = styled.div`
  display: flex;
  padding: 15px 10px;
  cursor: pointer;

  &:hover {
    background-color: ${palette('whitesmoke')};
    border-radius: 5px;
  }

  & > svg {
    width: 20px;
    margin: 0 15px 0 3px;
    color: ${palette('purple')};
  }
`;
