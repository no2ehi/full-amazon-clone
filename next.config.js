/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.dummyjson.com", "i.stack.imgur.com", "res.cloudinary.com"]
    
  }
}

module.exports = nextConfig
