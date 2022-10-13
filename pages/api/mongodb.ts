import { MongoClient } from "mongodb"
import { getSession } from "next-auth/react"

function getNames(DataBase){
  return DataBase.collection("collection_test").findOne({"names" : {"$exists": true}},)
}

function getQuestions(DataBase){
  return {}
}

async function ConnectDb(parameters : any){
  const client  = await MongoClient.connect(process.env.MONGODB_URI)
  const DataBase = client.db(process.env.MONGO_DABS)

  let Data : object

  if (parameters.lenght > 0){
    Data = {"test" : "test"}
  }
  
  else{
    Data = await getNames(DataBase)
  }
  
  client.close()

  return Data
  
}

export default async function handler(req , res){
  const session = getSession();
  
  if (session){
    
    res.status(200).json(Object(await ConnectDb(req.query))["names"])
  }
  
  else{
    res.status(511).json()
  }

  
}