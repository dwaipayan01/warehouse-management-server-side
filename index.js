const express = require('express');
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yhiei.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const productCollection = client.db("productCollection").collection("product");
        const specialCollection = client.db("specialCollection").collection("products");
        app.get("/product", async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });
        app.delete("/product/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await productCollection.deleteOne(query);
            res.send(result);
        });
        app.post("/product", async (req, res) => {
            const newProduct = req.body;
            console.log(newProduct);
            const result = await productCollection.insertOne(newProduct);
            res.send(result);
        });
        app.get("/special", async (req, res) => {
            const query = {};
            const cursor = specialCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });
        app.get("/inventory/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await productCollection.findOne(query);
            res.send(service);
        });
        app.put("/inventory/:id", async (req, res) => {
            const id = req.params.id;
            const renewQuantity = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    quantity: renewQuantity.newQuantity
                }
            };
            const result = await productCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        });
        app.put("/user/:id", async (req, res) => {
            const id = req.params.id;
            const renewQuantity = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    quantity: renewQuantity.newValue
                }
            };
            const result = await productCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        });
        app.get("/itemList", async (req, res) => {
            const email = req.query.email;
            console.log(email);
            const query = { email: email };
            const cursor = productCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });
        app.delete("/item/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await productCollection.deleteOne(query);
            res.send(result);
        });


    }
    finally {

    }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("My assignment is ready");
});
app.listen(port, () => {
    console.log("Listening to port,", port);
})