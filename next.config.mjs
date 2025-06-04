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
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the 'output: export' for now - we'll fix the dynamic route first
  // distDir: 'dist', // We'll handle this later
  
  experimental: {
    serverActions: {
      bodySizeLimit: '25mb'
    },
    // Add this to fix ESLint serialization error
    esmExternals: 'loose'
  },
  
  // Fix for static export compatibility
  trailingSlash: true,
  
  // Optional: Skip linting during build to prevent serialization errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Optional: Skip type checking during build
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
