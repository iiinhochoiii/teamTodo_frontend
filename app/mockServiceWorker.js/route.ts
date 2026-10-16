// 이 프로젝트는 MSW 를 사용하지 않음. 같은 origin(localhost:3000)에서 실행했던 다른 프로젝트의
// 서비스 워커가 업데이트 확인용으로 요청하는 경로이므로, 404 페이지 렌더링 없이 바로 404 를 반환한다.
export const GET = () => new Response(null, { status: 404 });
