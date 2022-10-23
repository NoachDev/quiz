import ConnectDb from "./_ConnectDb"

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
  
}