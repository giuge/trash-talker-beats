module.exports = {
  siteMetadata: {
    title: `Trash Talker Beats`,
    description: `Listen to and buy the best produced beats.`,
    author: `@giuge`,
    siteUrl: `https://trashtalkerbeats.com`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `previews`,
        path: `${__dirname}/src/previews`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `fonts`,
        path: `${__dirname}/src/fonts`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `trash-talker-beats`,
        short_name: `trash-talker-beats`,
        start_url: `/`,
        background_color: `#0D2B40`,
        theme_color: `#0D2B40`,
        display: `minimal-ui`,
        icon: `src/images/trash_talker_icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-source-shopify',
      options: {
        shopName: 'trashtalkerbeats',
        accessToken: '333054976ed51e49aeee693e8bf0451d',
        verbose: true,
      },
    },
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: '622351201546226',
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-134915036-1',
        // Puts tracking script in the head instead of the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: false,
        // Avoids sending pageview hits from custom paths
        exclude: [],
        // Enables Google Optimize using your container Id
        optimizeId: '',
        // Enables Google Optimize Experiment ID
        experimentId: '',
        // Set Variation ID. 0 for original 1,2,3....
        variationId: '',
        // Any additional create only fields (optional)
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: 'trashtalkerbeats.com',
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
