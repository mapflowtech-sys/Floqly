import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Standalone для Docker деплоя
  output: 'standalone',

  // Оптимизация
  compress: true,
  poweredByHeader: false,

  // Оптимизация изображений
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Строгая проверка TypeScript и ESLint при сборке
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Экспериментальные фичи для производительности
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
