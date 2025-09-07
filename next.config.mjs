/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: 'standalone',
  productionBrowserSourceMaps: false,
  compress: true,
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Image optimization
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  
  // Webpack configuration
  webpack: (config, { isServer, dev }) => {
    // Client-side only configuration
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: 'crypto-browserify',
        stream: 'stream-browserify',
        http: 'stream-http',
        https: 'https-browserify',
        os: 'os-browserify/browser',
        path: 'path-browserify',
        zlib: 'browserify-zlib',
        querystring: 'querystring-es3',
        url: 'url',
        vm: 'vm-browserify',
        process: 'process/browser',
      };

      // Exclude problematic modules
      config.resolve.alias = {
        ...config.resolve.alias,
        'mongodb-client-encryption': false,
        'aws4': false,
        'snappy': false,
        'kerberos': false,
      };
    }

    // Development only configuration
    if (dev) {
      config.devtool = 'source-map';
    }

    return config;
  },
};

export default nextConfig;
