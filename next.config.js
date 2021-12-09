/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_FIREBASEAPI: process.env.NEXT_PUBLIC_FIREBASEAPI,
  },
};
