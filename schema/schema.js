const {merge} = require('lodash');
const {makeExecutableSchema} = require('graphql-tools');

// Get the Query Root object
const Query = require('./entities/query/rootQuery');

// Get the Mutation Root object
const Mutation = require('./entities/mutation/rootMutation');

// Create the schema definition
const SchemaDefinition = `schema {query: Query, mutation: Mutation}`;

// Create the schema mutationResolvers
const resolvers = merge(Query.resolvers, Mutation.resolvers);

// Export an executable schema
module.exports = makeExecutableSchema({
    // The schema is a combination of the schema definition, the Query types and the Mutation types
    schemaTypeDefinitions: [SchemaDefinition, ...Query.types, ...Mutation.types],
    resolvers
});