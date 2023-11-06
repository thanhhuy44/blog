/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { appDir: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "my-blog-assets.s3.us-east-005.backblazeb2.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
