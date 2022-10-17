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
function List_Qst({id, setindex}) {
  const [listquest, setquest] = React.useState([])

  React.useEffect(() => {
    fetch("http://localhost:3000/api/mongodb", {
      method : "GET",
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(res => res.json()).then( k => {
      const list = []
      
      for (const name in k){
        const index = k[name];
        const element = <Element_value key={index} id={`tbg-radio-${index}`} value={index} variant="" onChange={k => setindex(k.target.value)}>
          <p id="text">{name}</p>
          <i className="bi bi-chevron-right d-flex h-100" style={{alignItems: "center", marginRight: "0.5em"}}></i>
        </Element_value>

        // console.log(name);
        list.push(element)
      }

      setquest(list)
    })
  }, [0])

  return (
      <ToggleButtonGroup type="radio" name="options" defaultValue={0} id={id}>
        {listquest}
      </ToggleButtonGroup>
  )}

export default List_Qst