import getDbValues  from "./_getDbValues"
import addDbValues  from "./_addDbValues"
import rmDbValues   from "./_rmDbValues"

export default async function handler(req, res){
  
  try{
    const method = req.method
    res.setHeader("Cache-Control", "s-maxage=10", "stale-while-realvalidate")

    let Data : any
    
    if (method == "GET"){
      Data = await getDbValues(req.query)
    }
    
    else if (method == "POST"){
      Data = await addDbValues(req.query, req.body)
    }
    
    else if (method == "DELETE"){
      Data = await rmDbValues(req.query)
      
    }
    
    // else{
      //   res.status(511).json({})
      //   return
      // }
      
    // console.log("Data Process", Data );

    res.status(200).json(Data)
  }
  
  catch{
    console.log("Error");
    
    res.status(511).json({})
  }

  
}