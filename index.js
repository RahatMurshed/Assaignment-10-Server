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
    const studyMateUserCollection = db.collection('studyMateUser');




    // user related api 

    app.post('/user', async (req, res) => {
      
        const user = req.body;
        if (!user || !user.email) {
          return res.status(400).send({ error: 'Please provide user object with email.' });
        }

      
        const existing = await studyMateUserCollection.findOne({ email: user.email });
        if (existing) {
          
          return res.status(200).send({ inserted: false, message: 'User already exists', user: existing });
        }

        
        const result = await studyMateUserCollection.insertOne(user);
        res.send(result)
      
     
    });


    // Partners related api  

    app.get('/find-partners', async (req, res) => {
      try {
        const rawSearch = req.query.search || '';
        const search = rawSearch.trim();
        const sortOrder = req.query.sort === 'desc' ? -1 : 1;

        const query = search ? { subject: { $regex: search, $options: 'i' } } : {};

        const cursor = partnersCollection.find(query).sort({ experienceLevel: sortOrder });
        const result = await cursor.toArray();
        res.send(result);
      } catch (err) {
        console.error('/find-partners error:', err);
        res.status(500).send({ error: 'Failed to search partners' });
      }
    });


    app.get('/top-partners', async (req, res) => {

      const cursor = partnersCollection.find().sort({ rating: -1 }).limit(6);
      const result = await cursor.toArray();
      res.send(result);
    });


    app.get('/partner-details/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await partnersCollection.findOne(query);
      res.send(result);
    });


    app.post('/create-profile', async (req, res) => {
      const newData = req.body;
      const result = await partnersCollection.insertOne(newData);
      res.send(result);
    })


    app.patch('/updateCount/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id)
      const { change } = req.body;

      const query = { _id: new ObjectId(id) }
      const update = {

        $inc: { partnerCount: change }

      };
      const result = await partnersCollection.updateOne(query, update);
      res.send(result);
    })


    // Connections related api

    app.get('/my-connections', async (req, res) => {
      const email = req.query.email;
      const query = {};
      if (email) {
        query.email = email;
      }
      const cursor = connectionsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post('/my-connection', async (req, res) => {
      const newData = req.body;
      const result = await connectionsCollection.insertOne(newData);
      res.send(result);
    });


    app.patch('/update-connection/:id', async (req, res) => {
      const id = req.params.id;
      const updatedData = req.body;
      const query = { _id: new ObjectId(id) }
      const update = {
        $set: {
          name: updatedData.name,
          subject: updatedData.subject,
          studyMode: updatedData.studyMode

        }
      }
      const result = await connectionsCollection.updateOne(query, update);
      res.send(result);
    })


    app.delete('/delete-connection/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await connectionsCollection.deleteOne(query);
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



app.listen(port, () => {
  console.log('Assaignment 10 server is running on ', port);
});