// 캐시 갱신으로 예약된 React 렌더가 화면에 반영(paint)될 때까지 대기.
// alert() 는 렌더링을 막으므로, 최신 데이터가 그려진 뒤 alert 를 띄우고 싶을 때 사용
export const waitForPaint = () =>
  new Promise<void>((resolve) =>
    requestAnimationFrame(() => setTimeout(resolve, 0))
  );
