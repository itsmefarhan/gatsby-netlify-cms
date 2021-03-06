const path = require("path")

// Adding the slug
const { createFilePath } = require("gatsby-source-filesystem")
exports.onCreateNode = function({ node, getNode, actions }) {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode })
    createNodeField({
      node,
      name: "slug",
      value: slug,
    })
  }
}

// Querying for the slug field
exports.createPages = async function({ graphql, actions }) {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              contentKey
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  result.data.allMarkdownRemark.edges
    .filter(edge => edge.node.frontmatter.contentKey === "blog")
    .forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve("./src/templates/blog.js"),
        context: {
          slug: node.fields.slug,
        },
      })
    })
}
