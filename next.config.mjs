/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverComponentsExternalPackages: ["shiki", "vscode-oniguruma"],
  },
};

export default nextConfig;
