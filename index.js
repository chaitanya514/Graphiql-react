const express = require('express')
const app = express()
const port = 3000
const graphqlHTTP = require('express-graphql')
const schema = require("./schema")
const mongoose = require("mongoose")
const cors = require('cors')

mongoose.connect("mongodb+srv://chaitanya6514:Chaitanya@6514@cluster0.xsuva.mongodb.net/test",{ useNewUrlParser: true })
mongoose.connection.once('open',()=>{
    console.log("connection established")
})
app.use(cors())

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))