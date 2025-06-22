const withTM = require("next-transpile-modules")(["@symmio/frontend-sdk"]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: {
      displayName: false,
      ssr: true,
    },
  },
  swcMinify: true,
  images: {
    domains: ["raw.githubusercontent.com"],
  },
};

module.exports = withTM(nextConfig);
