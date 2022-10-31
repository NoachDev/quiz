import ConnectDb from "./_ConnectDb"

async function getAll(DataBase){
  return DataBase.find({name : {"$exists" : true}}).toArray()
}

function getNames(DataBase){
  return DataBase.findOne({"names" : {"$exists": true}},)
}

function getQuestions(DataBase, name){
  return DataBase.findOne({"name": name})

}

export default async function getDbValues(query){
  const type_get  : string = query["type"]

  if (type_get == "names"){
    // console.log("enter Names");
    const Data = await ConnectDb(getNames)
    
    return Data["names"]
  }
  else if (type_get == "questions"){
    // console.log("enter questions");

    const get_index  : string = query["name"]

    const Data = await ConnectDb(k => getQuestions(k, get_index))

    delete Data["name"]
    delete Data["_id"]

    return Data
  }
  else if (type_get == "all"){
    const Data : Array<object> = await ConnectDb(getAll)

    return Data.map( (a : object) => a["name"])
  }
  
}