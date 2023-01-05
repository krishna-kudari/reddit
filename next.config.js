/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    // remotePatterns:[
    //   {protocol: 'https' ,
    //     hostname: 'cdn.appleosophy.com',
    //     port: '',
    //     pathname: '/2019/06/reddit-banner.png/**'
    //   }
    // ]
  },
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/i,
  //     issuer: /\.[jt]sx?$/,
  //     use: ["@svgr/webpack"],
  //   });

  //   return config;
  // },
}
