const nextConfig = {
  rewrites: () =>
  {
      return [
          {
              source: "/",
              destination: "/home",
          },
      ]
  }
};

export default nextConfig;
