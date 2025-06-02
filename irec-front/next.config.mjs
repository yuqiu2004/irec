/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        const backendUrl = process.env.BACKEND_URL 
            ? process.env.BACKEND_URL 
            : process.env.NODE_ENV === 'development'
                ? 'http://localhost:8080'
                : 'http://backend:8080';

        return [
            {
                source: '/api/:path*',
                destination: `${backendUrl}/:path*`,
            },
        ];
    },
};

export default nextConfig;
