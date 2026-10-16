import { RefObject, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';

/**
 * ref 요소 바깥을 클릭했을 때 handler 실행.
 *
 * - mousedown 이 아닌 click 시점에 처리: mousedown 에서 화면이 바뀌면(박스가 닫혀 레이아웃 이동)
 *   사용자가 누른 버튼이 손을 떼기 전에 밀려나 클릭이 먹히지 않음
 * - capture 단계 + flushSync: 클릭한 버튼의 onClick 보다 먼저 handler 의 상태 변경을 반영
 *   (예: 입력 중인 항목을 추가한 뒤 '등록하기' 가 실행되도록)
 * - mousedown 이 ref 안에서 시작된 경우(텍스트 드래그 선택 등)는 바깥 클릭으로 보지 않음
 */
const useClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: () => void,
  enabled = true
) => {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!enabled) return;

    let downInside = false;

    const onMouseDown = (event: MouseEvent) => {
      downInside = !!ref.current?.contains(event.target as Node);
    };

    const onClick = (event: MouseEvent) => {
      if (downInside || !ref.current) return;
      if (ref.current.contains(event.target as Node)) return;

      flushSync(() => handlerRef.current());
    };

    document.addEventListener('mousedown', onMouseDown, true);
    document.addEventListener('click', onClick, true);

    return () => {
      document.removeEventListener('mousedown', onMouseDown, true);
      document.removeEventListener('click', onClick, true);
    };
  }, [ref, enabled]);
};

export default useClickOutside;
