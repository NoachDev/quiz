import React from "react"
import { CloseButton, Col, Row, Stack } from "react-bootstrap"
import styled from "styled-components"

const Card_Base = styled.div`
  height        : 10em    ;
  width         : 15em    ;
  
  padding       : 1em     ;  
  
  overflow-y    : scroll    ;
  
  border-top-style        : solid   ;
  border-left-style     : solid   ;
  
  border-top-left-radius  : 0.6em   ;
  border-top-right-radius : 0.6em   ;

  border-color  : ${props => props.theme.complement} ;
  
`

const Add_node  = styled.div`
  height        : 8em     ;
  width         : auto    ;
  
  display       : flex    ;
  align-items   : center  ;
  
  & > *{
    font-size : 2em;
  }
  
`
  
const Tools_card=styled(Stack)`
  height        : 1.5em   ;
  width         : 15em    ;
  display       : flex    ;
  flex-direction: row     ;    

  align-items    : center;

  background    : ${props => props.theme.fg};

  border-bottom-style         : solid   ;
  border-inline-style         : solid   ;
  
  border-bottom-left-radius   : 0.6em   ;
  border-bottom-right-radius  : 0.6em   ;

  #close{
    color           : ${props => props.theme.bg};
    font-size       : 1.4em;
    height          : 1.3em;
  }

  #lock{
    color           : ${props => props.theme.bg};
    font-size       : 1.1em;
    height          : 1.1em;

  }

`

function Card_Node({ children }){
  return (
  <div style={{fontSize : '13px', height: "11.5em", width: "15em", marginRight : "1em"}}>

    <Card_Base>
      {children}
    </Card_Base>

    <Tools_card gap={2}>
      <i id="close" className="bi bi-x"></i>
      <i id="lock"  className="bi bi-lock"></i>
    </Tools_card>
    
  </div>
  )
}

function Quest({id, index}){
  const [elements, setelements] = React.useState([])
  
  React.useEffect(() => {
    fetch(`http://localhost:3000/api/mongodb?${index}`, {
      method: "GET",
      headers : {
        'content-type': 'application/json'
      }
    }).then(res => res.json()).then((k : Array<Array<string>>) => {
      const cards = []

      k.forEach((list_ask : Array<string>, index_list) => {
        const element_card = []

        list_ask.forEach((ask, index_ask) => {
          element_card.push(<p key={index_ask}>{ask}</p>)
          
        })
  
        cards.push(<Card_Node key={index_list}>
          {element_card}
        </Card_Node>)

      })
      
      setelements(cards.concat(<Add_node key="addnode"><i className="bi bi-node-plus"></i></Add_node>))
    })

  }, [index])
  
  return (<Row 
    id = {id}
    key = "rowcards"
    style={{paddingLeft : "0.5em", paddingTop : "0.5em", margin : "0px", justifyContent: "start"}}
    >
    {elements}

    {/* <Card_Node>
      <p>test jbkjbsdbdskfd</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
    </Card_Node>
    <Card_Node>
      <p>test jbkjbsdbdskfd</p>
      <p>test</p>
    </Card_Node>
    
    <Add_node><i className="bi bi-node-plus"></i></Add_node> */}

    <div className="h-100">
    </div>

  </Row>)
}

export default Quest