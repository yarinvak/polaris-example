const BookInput = `
    input BookInput{
        id: ID!        
        title: String,
        author: String
    }
`;

module.exports = {
    typeDefs: [BookInput]
};