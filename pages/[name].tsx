import { useRouter } from "next/router"
import React from "react";
import Page_ask from "../components/page_ask";
import Layout_home from "../layouts/home";


function ask(){
  const name = useRouter().query["name"]
  // const name = "ask 3 pages"
  const [page, setpage] = React.useState([])
  
  
  React.useEffect(() => {
    if (name != undefined){
      console.log("name query !", name);
      fetch(`http://localhost:3000/api/MongoDb/questions?name=${name}`,
        {
          method: "GET",
          headers : {
            'content-type': 'application/json'
          }
        }
      )
      .then(res => res.json()).then((k : object) =>
        {
          setpage([].concat(<Page_ask asks={k}></Page_ask>))
        }
      )       
    
    }

  }, [name])
  
  return <Layout_home>
    {page}
  </Layout_home>
}


export default ask