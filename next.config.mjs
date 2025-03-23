/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      // Increase the limit to 2MB (or other value as needed)
      bodySizeLimit: '2mb'
    }
  }
};

export default nextConfig;
