import getDbValues  from "./_getDbValues"
import addDbValues  from "./_addDbValues"
import rmDbValues   from "./_rmDbValues"
import { unstable_getServerSession } from "next-auth/next";
import { authOptions }                from "../auth/[...nextauth]"


export default async function handler(req, res){
  
  try{
    const method = req.method
    const session = await unstable_getServerSession(req, res, authOptions)

    res.setHeader("Cache-Control", "s-maxage=10", "stale-while-realvalidate")

    let Data : any
    
    if (method == "GET"){
      Data = await getDbValues(req.query)
    }
    else if (session.user.UserRole == "Admin"){
      if (method == "POST"){
        await addDbValues(req.query, req.body)
        Data = {}
      }
      
      else if (method == "DELETE"){
        await rmDbValues(req.query)
        Data = {}
        
      }
    }
    
    
    res.status(200).json(Data)
  }
  
  catch (error){
    console.log(error.message);
    
    res.status(511).json({})
  }

  
}