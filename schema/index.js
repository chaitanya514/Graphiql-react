const graphql = require('graphql')
const _ = require('lodash')
const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull } = graphql

const Book = require("../models/book")
const Author = require("../models/author")

const books = [
    {
        name: 'The Book',
        genre: 'Comedy',
        id: '1',
        authorid: '1'
    },
    {
        name: 'The Legend',
        genre: 'knowledge',
        id: '2',
        authorid: '2'
    }
]

const authors = [
    {
        name: 'cp',
        age: '25',
        id: '1'

    },
    {
        name: 'GP',
        age: '26',
        id: '2'

    }
]



const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                //   return _.find(authors, { id: parent.authorid })
                //code to get Data from mongodb
                return Author.findById(parent.authorid)

            }
        }
    })
})


const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: graphql.GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return _.filter(books, { authorid: parent.id })
                //code to get Data from mongodb
                return Book.find({authorid:parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //  return _.find(books, { id: args.id })
                //code to get Data from mongodb
                return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //  return _.find(authors, { id: args.id })
                //code to get Data from mongodb
                return Author.findById(args.id)
            }

        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return books;
                return Book.find({})

            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                //   return authors;
                return Author.find({})

            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:graphql.GraphQLInt}
            },
            resolve(parent,args){
                let author =new Author({
                    name:args.name,
                    age: args.age
                })
              return  author.save();
            }
        },

        addBook:{
            type:BookType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                genre:{type:GraphQLString},
                authorid:{type:GraphQLID}
            },
            resolve(parent,args){
                let book =new Book({
                    name:args.name,
                    genre: args.genre,
                    authorid:args.authorid
                })
              return  book.save();
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})