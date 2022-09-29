import { useEffect, useRef, useCallback } from 'react';

type IntersectHandler = (
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver
) => void;

// 무한 스크롤 재사용을 위한 custom hooks
// 스크롤이 하단에 도달 하였을 때, 기능을 수행
const useInfiniteScroll = (
  onIntersect: IntersectHandler,
  options?: IntersectionObserverInit
) => {
  const ref = useRef<HTMLDivElement>(null);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onIntersect(entry, observer);
      });
    },
    [onIntersect]
  );

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options, callback]);

  return ref;
};

export default useInfiniteScroll;
