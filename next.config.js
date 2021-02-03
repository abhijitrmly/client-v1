module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes packages that depend on fs/module module
    if (!isServer) {
      config.node = { fs: 'empty', module: 'empty' };
    }

    return config;
  },
  serverRuntimeConfig: {
    sV2Domain: process.env.S_V2_DOMAIN,
  },
  publicRuntimeConfig: {
    publicSV2Domain: process.env.NEXT_PUBLIC_S_V2_DOMAIN,
  },
};
