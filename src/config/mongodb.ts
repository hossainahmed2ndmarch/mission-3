import { MongoClient, ServerApiVersion } from "mongodb";

// MongoDb
const uri = "mongodb+srv://hossainahmed2ndmarch:RAHAT2ndmarch@cluster0.c6qkm.mongodb.net/todosDB?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
 serverApi: {
  version: ServerApiVersion.v1,
  strict: true,
  deprecationErrors: true,
 }
});