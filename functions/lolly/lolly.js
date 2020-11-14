const { ApolloServer, gql } = require("apollo-server-lambda"),
  faunadb = require("faunadb"),
  axios = require("axios"),
  q = faunadb.query;



const Client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

const typeDefs = gql`
  type Query {
    AllLollies: [Lolly]!
    GetLollyBySlug(slug: String!): Lolly
  }
  type Lolly {
    to: String!
    message: String!
    from: String!
    flavourTop: String!
    flavourMiddle: String!
    flavourBottom: String!
    slug: String!
  }
  type Mutation {
    craeteLolly(
      to: String!
      message: String!
      from: String!
      flavourTop: String!
      flavourMiddle: String!
      flavourBottom: String!
      slug: String!
    ): Lolly
  }
`;

const resolvers = {
  Query: {
    AllLollies: async () => {
      try {
        const result = await Client.query(
          q.Map(
            q.Paginate(q.Match(q.Index("get_all_lollies"))),
            q.Lambda((lolly) => q.Get(lolly))
          )
        );

        return result.data.map((lolly) => {
          return {
            to: lolly.data.to,
            message: lolly.data.message,
            from: lolly.data.from,
            flavourTop: lolly.data.flavourTop,
            flavourMiddle: lolly.data.flavourMiddle,
            flavourBottom: lolly.data.flavourBottom,
            slug: lolly.data.slug,
          };
        });
      } catch (error) {
        return error.toString();
      }
    },
    GetLollyBySlug: async (_, { slug }) => {
      try {
        const result = await Client.query(
          q.Get(q.Match(q.Index("get_lolly_by_slug"), slug))
        );
        return result.data;
      } catch (error) {
        return error.toString();
      }
    },
  },

  Mutation: {
    craeteLolly: async (_, args) => {
      try {
        // const slug = shortId.generate();
        // args.slug = slug;

        const result = await Client.query(
          q.Create(q.Collection("Lolly"), {
            data: args,
          })
        );

        axios
          .post(process.env.NETLIFY_HOOK_URL)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.error(error);
          });

        return result.data;
      } catch (error) {
        return error.toString();
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
});

exports.handler = server.createHandler();
