/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    /** Явно: все страницы — с `/` в конце URL; в паре с middleware + createAlternates снижает дубли в GSC. */
    trailingSlash: true,
    async redirects() {
        return [
            { source: '/privacy', destination: '/confidential/', permanent: true },
            { source: '/privacy/', destination: '/confidential/', permanent: true },
            // Отрасли: старые URL из меню → актуальные лендинги
            { source: '/industries/medicine', destination: '/ii-dlya-klinik-tashkent/', permanent: true },
            { source: '/industries/medicine/', destination: '/ii-dlya-klinik-tashkent/', permanent: true },
            { source: '/industries/education', destination: '/ii-dlya-obrazovaniya-tashkent/', permanent: true },
            { source: '/industries/education/', destination: '/ii-dlya-obrazovaniya-tashkent/', permanent: true },
            { source: '/industries/horeca', destination: '/ii-dlya-restoranov-tashkent/', permanent: true },
            { source: '/industries/horeca/', destination: '/ii-dlya-restoranov-tashkent/', permanent: true },
            { source: '/industries/retail', destination: '/ii-dlya-internet-magazina/', permanent: true },
            { source: '/industries/retail/', destination: '/ii-dlya-internet-magazina/', permanent: true },
        ];
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'X-XSS-Protection', value: '1; mode=block' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
                ],
            },
            {
                source: '/(.*)\\.(ico|png|svg|jpg|jpeg|webp|avif|woff2|woff|ttf)',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
                ],
            },
        ];
    },
    experimental: {
        optimizePackageImports: ["lucide-react", "motion/react"],
        serverComponentsExternalPackages: ["sharp"],
    },
    images: {
        formats: ["image/avif", "image/webp"],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60,
        remotePatterns: [
            { protocol: 'https', hostname: 'images.unsplash.com' },
        ],
    },
    output: "standalone",
    compress: true,
    poweredByHeader: false,
};

export default nextConfig;