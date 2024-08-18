/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.API_URL ?? 'http://localhost:8080',

        // Auth related environment variables
        AUTH_SECRET: process.env.AUTH_SECRET,
        GOOGLE_AD_CLIENT_ID: process.env.GOOGLE_AD_CLIENT_ID,
        GOOGLE_AD_CLIENT_SECRET: process.env.GOOGLE_AD_CLIENT_SECRET,
        GOOGLE_AD_REDIRECT_URI: process.env.GOOGLE_AD_REDIRECT_URI,
    }
};

export default nextConfig;
