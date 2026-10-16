/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  eslint: {
    dirs: [
      'apis',
      'app',
      'components',
      'constants',
      'hooks',
      'provider',
      'queries',
      'stores',
      'styles',
      'types',
      'utils',
    ],
  },
};

module.exports = nextConfig;
