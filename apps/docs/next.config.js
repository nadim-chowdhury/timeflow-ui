// next.config.js
import withMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

export default withMDX({
  extension: /\.(md|mdx)$/,
})(nextConfig);
