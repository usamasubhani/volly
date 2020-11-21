const path = require("path");

exports.createPages = async ({ actions, graphql }) => {
    const { data } = await graphql(`
    query MyQuery {
        Vollies {
            AllLollies {
                message
                slug
            }
        }
    }
    `);
    console.log(JSON.stringify(data));
    data.Vollies.AllLollies.forEach(({ slug }) => {
        actions.createPage({
            path: `frozen/${slug}`,
            component: path.resolve('./src/templates/lollyPage.jsx'),
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