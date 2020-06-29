const graphql = require('graphql')
const _ = require('lodash')
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql

const books = [
    {
        name: 'The Book',
        genre: 'Comedy',
        id: '1'
    },
    {
        name: 'The Legend',
        genre: 'knowledge',
        id: '2'
    }
]

const BookType = new GraphQLObjectType({
    name: "Block",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return _.find(books,{id:args.id})
                //code to get Data from mongodb
            }
        }
    }
})




module.exports = new GraphQLSchema({
    query: RootQuery
})