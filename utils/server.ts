const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://localhost:3000"
  : "https://next-js-ecommerce-template-five.vercel.app";
