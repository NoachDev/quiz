import ConnectDb from "./_ConnectDb"

function addLine(DataBase, name, index_card, value){
  const update = {
    "$push" : {
      [index_card] : value
    }
  }

  return DataBase.updateOne({"name": name}, update)

}

function addCard(DataBase, index){
  // DataBase.findOne({"names" : {"$exists": true}},)
  return null
}

function addQuestion(DataBase){
   return null
}

export default async function addDbValues(query, body){
  const type_get  : string = query["type"]


  if (type_get == "line"){
    const get_name : string = query["name"]
    const get_card  : string = query["card"]

    await ConnectDb(k => addLine(k, get_name, get_card, body))
    
    return {}
    
  }
  
  else if (type_get == "card"){
    const get_name : string = query["name"]
    
    await ConnectDb(k => addCard(k, get_name))
    return {}
  }
  
  else if (type_get == "question"){
    await ConnectDb(addQuestion)
    return {}
  }
  
}