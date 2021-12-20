const express = require('express');
const cors = require("cors");
const { MongoClient } = require('mongodb');

const ObjectId = require('mongodb').ObjectId;

const app = express();
// const port = 5000;
const port = Process.env.PORT || 5000

const uri = "mongodb+srv://dbUser:RAFJo96OGXCDyjYc@cluster0.baet0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors())
app.use(express.json());

const test = [{
    id: 1,
    name: "test"
}]

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get("/test/:id", (req,res)=>{
    console.log(req.params)
})

client.connect(err => {
    const usersCollection = client.db("real-estate").collection("homes");
    // perform actions on the collection object
    // client.close();
    app.post('/addhome', async (req,res)=>{
        console.log(req.body);
        const result = await usersCollection.insertOne(req.body);
        console.log(result);
    });

    app.get('/homes', async(req,res)=>{
        const result = await usersCollection.find({}).toArray();
        res.send(result)
    })

    app.delete("/deletehome/:id", async(req,res)=>{
      const id = req.params.id;
      const item = { _id: ObjectId(id) }
      const result = await usersCollection.deleteOne(item)
      console.log(result)
    })

  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})