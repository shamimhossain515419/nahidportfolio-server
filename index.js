const express = require('express')
const cors = require('cors')
const app = express();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
app.use(cors())

app.use(express.json());




const uri = `mongodb+srv://NahidHossain:ry26wNlKYu6pvH3P@cluster0.jt15atw.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
     serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
     }
});

async function run() {

     // Connect the client to the server	(optional starting in v4.7)
     await client.connect();

     const projectCollection = client.db("NahidHossain").collection("Product");


     app.get('/product', async (req, res) => {
          const result = await projectCollection.find().toArray();
          res.send(result)

     })
     // Send a ping to confirm a successful connection

     await client.db("admin").command({ ping: 1 });
     console.log("Pinged your deployment. You successfully connected to MongoDB!");

}
run().catch(console.dir);


app.get('/', function (req, res, next) {

     res.send("hello")
})

app.listen(port, function () {
     console.log(` CORS-enabled web server listening on port  ${port}`)
})