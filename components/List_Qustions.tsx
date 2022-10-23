import React from "react"
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap"
import styled from "styled-components"

const Element_value = styled(ToggleButton)`
  width           : 100%    ;
  height          : 1.5em   ;
  display         : flex    ;
  flex-direction  : row     ;
  align-items     : center  ;
  margin-bottom   : 0.2em   ;
  font-size       : 14px    ;
  color           : ${props => props.theme.fg};

  #text{
    width         : 100%    ;
    margin        : 0px     ;
    margin-left   : 0.5em   ;
  }

`
function List_Qst({id, setindex, Qst_add, setQst_add, Qst_rmv, setQst_rmv}) {
  const [listquest, setquest] = React.useState([])

  React.useEffect(() => {
    fetch("http://localhost:3000/api/MongoDb/names", {
      method : "GET",
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(res => res.json()).then( k => {
      // console.log(k);
      
      const list = []

      k.forEach((name, index) => {
        
        const element = <Element_value key={index} id={`tbg-radio-${index}`} value={name} variant="" onChange={k => setindex(k.target.value)}>
          <p id="text">{name}</p>
          <i className="bi bi-chevron-right d-flex h-100" style={{alignItems: "center", marginRight: "0.5em"}}></i>
        </Element_value>

        list.push(element)
      });

      setquest(list)
    })

    
  }, [0])
  
  React.useEffect(() => {
    if (Qst_add.length > 0){
      const index = listquest.length

      setquest(listquest.concat(
        <Element_value key={index} id={`tbg-radio-${index}`} value={Qst_add} variant="" onChange={k => setindex(k.target.value)}>
          <p id="text">{Qst_add}</p>
          <i className="bi bi-chevron-right d-flex h-100" style={{alignItems: "center", marginRight: "0.5em"}}></i>
        </Element_value>
      ))
      
      setQst_add("")
    }
  }, [Qst_add])

  React.useEffect(() => {
    if (Qst_rmv.length > 0){
      setquest(listquest.filter(k => k.props.value != Qst_rmv))
      // listquest.filter(k => k.props.value != Qst_rmv)
      
      setQst_rmv("")
    }
  }, [Qst_rmv])

  return (
      <ToggleButtonGroup type="radio" name="options" id={id}>
        {listquest}
      </ToggleButtonGroup>
  )}

export default List_Qst