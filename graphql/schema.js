let { buildSchema } = require('graphql');

let schema = buildSchema(`
  type Query {
    message: String
  }
`);

module.exports = schema;