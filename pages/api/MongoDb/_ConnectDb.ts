import { MongoClient } from "mongodb"

export default async function ConnectDb(Dbrun){
  const client  = await MongoClient.connect(process.env.MONGODB_URI)
  const DataBase = client.db(process.env.MONGO_DABS).collection("collection_test")
  
  const Data = await Dbrun(DataBase)
  
  client.close()

  return Data
  
}