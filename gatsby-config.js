module.exports = {
  siteMetadata: {
    title: "The Coffee Blog",
  },
  plugins: [
    "gatsby-plugin-netlify-cms",
    {
      resolve: "gatsby-source-filesystem", // to load files
      options: {
        name: "blog",
        path: "src/blog",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pageData",
        path: "src/pageData",
      },
    },
    // to parse the Markdown data and front matter and add this information to the GraphQL schema
    "gatsby-transformer-remark",
  ],
}
