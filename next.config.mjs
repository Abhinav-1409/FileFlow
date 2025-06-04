// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     serverActions: {
//       // Increase the limit to 2MB (or other value as needed)
//       bodySizeLimit: '25mb'
//     }
//   }
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for Cloudflare deployment
  output: 'export',
  distDir: 'dist',
  
  // Optional: Customize output path if needed
  // assetPrefix: isProduction ? 'https://your-cdn-url.com' : '',
  
  experimental: {
    serverActions: {
      bodySizeLimit: '25mb'
    }
  },
  
  // Enable static HTML export
  trailingSlash: true,
};

export default nextConfig;
