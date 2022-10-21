import { MongoClient } from "mongodb"
import { getSession } from "next-auth/react"

export default async function ConnectDb(Dbrun){
  const session = getSession();
  
  if (session){
    const client  = await MongoClient.connect(process.env.MONGODB_URI)
    const DataBase = client.db(process.env.MONGO_DABS).collection("collection_test")
    
    const Data = await Dbrun(DataBase)
    
    client.close()

    return Data
  }
  
  else{
    console.log("Denied");
    throw new Error("denied") 
  }

  
}