import { MongoClient } from "mongodb"
import { getSession } from "next-auth/react"

function getNames(DataBase){
  return DataBase.findOne({"names" : {"$exists": true}},)
}

function getQuestions(DataBase, index){
  return DataBase.findOne({[index] : {"$exists": true}},)
}

async function ConnectDb(parameters : Array<string>){
  const client  = await MongoClient.connect(process.env.MONGODB_URI)
  const DataBase = client.db(process.env.MONGO_DABS).collection("collection_test")

  let Data : Object | Array<Array<string>>

  if (parameters.length > 0){
    Data = Object(await getQuestions(DataBase, parameters[0]))[parameters[0]]
  }
  
  else{
    Data = Object(await getNames(DataBase))["names"]
  }
  
  client.close()

  return Data
  
}

export default async function handler(req , res){
  const session = getSession();
  
  if (session){
    const query : Array<string> = Array.from(Object.keys(req.query))
    
    res.status(200).json(await ConnectDb(query))
  }
  
  else{
    console.log("error");
    
    res.status(511).json({})
  }

  
}