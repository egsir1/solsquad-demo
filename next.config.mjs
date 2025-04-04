/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true, // Enables better SSR support for styled-components
  },
};

export default nextConfig;
