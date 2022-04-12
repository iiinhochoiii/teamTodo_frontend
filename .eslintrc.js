module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended', // 타입스크립트 추천 룰셋
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended',// eslint의 포매팅 기능을 prettier로 사용함. 항상 마지막에 세팅 되어야 함. - eslint-config-prettier
  ],
  parserOptions: {
    ecmaVersion: 2018, // 최신 문법 지원
    sourceType: 'module', // 모듈 시스템 사용시
  },
  rules: {
    // indent: ['error', 2], 누구는 eslint-config-prettier 충돌을 막는다는데 indent의 경우는 그냥 rule를 꺼버리는게 나아요. 계속 충돌되요 fix eslint <-> fix prettier
    // extends에서 적용한 룰셋을 덮어씌울 수 있습니다.
    // '@typescript-eslint/explicit-function-return-type': 'off',
  },
  settings: {},
};