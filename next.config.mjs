/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true, // Enables better SSR support for styled-components
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gratisography.com",
        pathname: "/wp-content/**",
      },
    ],
    domains: ["example.com", "cdn.example.com", "gratisography.com"], // Allow specific domains
  },
};

export default nextConfig;
