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
  // mdx config
});


const finalConfig = withMDX(nextConfig);


export default () => {
  const env = process.env.NODE_ENV;
  if (env === 'production') {
    return { ...finalConfig, output: 'export' };
  }
  return finalConfig;
};
