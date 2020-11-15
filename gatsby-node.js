const path = require("path");

exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    query LolliesQuery {
      Lolly {
        AllLollies {
          slug
        }
      }
    }
  `);
  console.log(data);
  data.Lollies.AllLollies.forEach(({ slug }) => {
    actions.createPage({
      path: `frozen/${slug}`,
      component: path.resolve(`./src/pages/frozen`),
      context: {
        slug: slug,
      },
    });
  });
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  // page.matchPath is a special key that’s used for matching pages

  // only on the client.

  if (page.path.match(/^\/frozen/)) {
    page.matchPath = "/frozen/*";

    // Update the page.

    createPage(page);
  }
};