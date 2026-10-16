// Chrome DevTools 가 열려 있으면 자동으로 요청하는 경로.
// 404 페이지 스트리밍 도중 요청이 끊기면 dev 서버에 "failed to pipe response" 로그가 남으므로
// 렌더링 없이 빈 JSON 으로 바로 응답한다.
export const GET = () => Response.json({});
