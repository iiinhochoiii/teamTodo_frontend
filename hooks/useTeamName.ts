import { useParams } from 'next/navigation';
import { safeDecodeURIComponent } from '@/utils/url';

// App Router 의 useParams 는 URL 인코딩된 값을 그대로 반환하므로
// (pages router 의 router.query.id 처럼) 디코딩된 팀 이름을 반환
const useTeamName = () => {
  const params = useParams<{ id?: string }>();

  return params?.id ? safeDecodeURIComponent(params.id) : '';
};

export default useTeamName;
