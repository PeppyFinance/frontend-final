const withTM = require("next-transpile-modules")(["@symmio/frontend-sdk"]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  compiler: {
    styledComponents: {
      displayName: process.env.NODE_ENV !== "production",
      ssr: true,
    },
  },
  swcMinify: true,
  images: {
    domains: ["raw.githubusercontent.com"],
  },
};

module.exports = withTM(nextConfig);
