/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        // const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
        const apiUrl = 'http://113.47.14.108:8080/';
        return [
            {
                source: '/api/:path*',
                destination: `${apiUrl}/:path*`,
            },
        ];
    },
};

export default nextConfig;
