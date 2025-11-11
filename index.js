const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;



// middleware

app.use(cors());
app.use(express.json());


// studyMateDb
// yrvYKGp4VuedY22T


const uri = "mongodb+srv://studyMateDb:yrvYKGp4VuedY22T@cluster0.idjuiiz.mongodb.net/?appName=Cluster0";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});





async function run() {
  try {
    
    await client.connect();





    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send("Assaignment 10 Server is Running");
});



app.listen(port, ()=>{
    console.log('Assaignment 10 server is running on ', port);
});