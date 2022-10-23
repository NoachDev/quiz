import ConnectDb from "./_ConnectDb"

function removeLine(DataBase, name, index_card, line_value){
  const update = {
    "$pull" : {
      [index_card] : line_value
    }
  }

  return DataBase.updateOne({"name": name}, update)

}

function removeCard(DataBase, name, index_card){
  const update = {
    "$unset" : {
      [index_card] : {"$exist" : true}
    }
  }

  return DataBase.updateOne({"name": name}, update)
}

async function removeQuestion(DataBase, name : string){
  const update = {
    "$pull" : {
      names : name
    }
  }

  await DataBase.updateOne({"names": {"$exists" : true}}, update)

  return DataBase.deleteOne({name : name})
}

export default function rmDbValues(query){
  const type_get  : string = query["type"]
  const get_name : string = query["name"]


  if (type_get == "line"){
    const get_card : string = query["card"]
    const get_line : string = query["line"]

    return ConnectDb(k => removeLine(k, get_name, get_card, get_line))

  }

  else if (type_get == "card"){
    const get_card : string = query["card"]

    return ConnectDb(k => removeCard(k, get_name, get_card))
  }
  
  else if (type_get == "question"){
    return ConnectDb(k => removeQuestion(k, get_name))
  }
  
}