import React from "react"
import { Col, Row } from "react-bootstrap"

function Quest({id, index}){
  const [elements, setelements] = React.useState([])

  React.useEffect(() => {
    fetch(`http://localhost:3000/api/mongodb?${index}`, {
      method: "GET",
      headers : {
        'content-type': 'application/json'
      }
    }).then(res => res.json()).then(k => {
      for (const list_ask of k){
        const element_card = <Col></Col>
        // add node "card"
          // append type node "card"
          // append type finaly | end add node "card"
        // card remove

        // card 
          // repr "page ask" -> add asks inside 

      }
    })
    

  }, [index])
  
  return (<Row id = {id}></Row>)
}

export default Quest