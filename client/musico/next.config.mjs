/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // serverComponents: true,
        // any other experimental features you might want to use
    },
    output: 'export', 
    images: {
        unoptimized: true, 
    },
};

export default nextConfig;
