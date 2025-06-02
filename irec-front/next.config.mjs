/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: process.env.BACKEND_URL 
                    ? `${process.env.BACKEND_URL}/:path*`
                    : process.env.NODE_ENV === 'development'
                        ? 'http://localhost:8080/:path*'
                        : 'http://backend:8080/:path*',
            },
        ];
    },
};

export default nextConfig;
