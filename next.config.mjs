import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.bib$/,
      use: "raw-loader",
    });
    return config;
  },
};

const withMDX = createMDX({
  // 在这里添加 markdown 插件（如果需要）
});

// 合并 MDX 配置和 Next.js 配置
const finalConfig = withMDX(nextConfig);

// 导出一个函数，而不是直接导出配置对象
export default () => {
  const env = process.env.NODE_ENV;
  if (env === 'production') {
    return { ...finalConfig, output: 'export' };
  }
  return finalConfig;
};
