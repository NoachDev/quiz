import ConnectDb from "./_ConnectDb"

function removeLine(DataBase, index, index_card, index_line){
  // DataBase.findOne({[index] : {"$exists": true}},)
  return null

}

function removeCard(DataBase, index, index_card){
  // DataBase.findOne({"names" : {"$exists": true}},)
  return null
}

function removeQuestion(DataBase, index){
   DataBase.deleteOne({[index] : {"$exists": true}},)
   return null
}

export default async function rmDbValues(query){
  const type_get  : string = query["type"]
  const get_index : string = query["index"]


  if (type_get == "line"){
    const get_card : string = query["card"]
    const get_line : string = query["line"]

    await ConnectDb(k => removeLine(k, get_index, get_card, get_line))
    return {}

  }

  else if (type_get == "card"){
    const get_card : string = query["card"]

    await ConnectDb(k => removeCard(k, get_index, get_card))
    return {}
  }
  
  else if (type_get == "question"){
    await ConnectDb(k => removeQuestion(k, get_index))
    return {}
  }
  
}