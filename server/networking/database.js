import { MongoClient } from 'mongodb';
// Replace the uri string with your connection string.
export const uri = 'mongodb://127.0.0.1:27017';
export const client = new MongoClient(uri);

//Nome do banco de dados
//Nome da coleção
//Qual informação procurar
export async function find(databasename,collectionname,queryname) {
  //console.log("database.js: got the query: ");
  //console.log(queryname)
  try {
    // await client.connect();
    const database = client.db(databasename);
    const progress = database.collection(collectionname);
    const query = queryname;//{ username: 'bob' };
    const queryjson = await progress.findOne(query);
    //console.log("database.js: found this data on the database: ");
    //console.log(queryjson)
    return queryjson;
// If you don't want to return the _id in your find() command you can do db.progress.find({"username":"bob"},{"level":1,"_id":0}) 
  } finally {

    // Ensures that the client will close when you finish/error
    //await client.close();
    //console.log("Connection with database closed")
    
  }
}
/*let bob = {username:"bob"}
find("mygame","progress",bob);*/
//

export async function insert(databasename,collectionname,queryname) {
  console.log("database.js: got the query: ");
  console.log(queryname)
  const database = client.db(databasename);
  const progress = database.collection(collectionname);
  const query = queryname;//{ username: 'bob' };
  let result = await progress.insertOne(
        { query }
     )
     if(result.acknowledged){console.log("The query has been inserted")}
    }
export default {uri,client,find,insert};