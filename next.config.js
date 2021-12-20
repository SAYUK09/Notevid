/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_FIREBASEAPI: process.env.NEXT_PUBLIC_FIREBASEAPI,
    NEXT_PUBLIC_MONGODB_URI: process.env.NEXT_PUBLIC_MONGODB_URI,
    NEXT_PUBLIC_YOUTUBE_API: process.env.NEXT_PUBLIC_YOUTUBE_API,
  },
};
