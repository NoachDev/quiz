import ConnectDb from "./_ConnectDb"

function addLine(DataBase, name, index_card, value){
  const update = {
    "$push" : {
      [index_card] : value
    }
  }

  return DataBase.updateOne({"name": name}, update)

}

async function addQuestion(DataBase, name : string){
  const update = {
    "$push" : {
      names : name
    }
  }
  const doc = {
    name : name
  }

  await DataBase.updateOne({"names": {"$exists": true}}, update)

  return DataBase.insertOne(doc)

}

export default function addDbValues(query, body){
  const type_get  : string = query["type"]
  const get_name  : string = query["name"]


  if (type_get == "line"){
    const get_card  : string = query["card"]

    return ConnectDb(k => addLine(k, get_name, get_card, body))
    
  }
  
  else if (type_get == "question"){
    return ConnectDb(k => addQuestion(k, get_name))
  }
  
}