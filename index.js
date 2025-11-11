const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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

    const db = client.db('studyMateDB');
    const partnersCollection = db.collection('all-partners');
    const connectionsCollection = db.collection('connections');


    // Partners related api  

   app.get('/find-partners', async (req, res)=>{
      const cursor = partnersCollection.find();
      const result = await cursor.toArray();
      res.send(result);
   });


   app.get('/top-partners', async (req, res)=>{
    
      const cursor = partnersCollection.find().sort({rating: -1}).limit(6);
      const result = await cursor.toArray();
      res.send(result);
   });


   app.get('/partner-details/:id', async (req, res)=>{
      const id = req.params.id;
      const query = new ObjectId(id);
      const result = await partnersCollection.findOne(query);
      res.send(result);
   });


    // Connections related api

    app.get('/my-connections', async (req, res) =>{
         
    });

    app.post('/my-connection', async (req, res) =>{
        const newData = req.body;
        const result = await connectionsCollection.insertOne(newData);
        res.send(result);
    })





    
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