import React from "react"
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap"
import styled from "styled-components"

const Element_value = styled(ToggleButton)`
  width           : 100%  ;
  height          : 1.5em ;
  display         : flex  ;
  flex-direction  : row   ;
  align-items     : center;
  margin-bottom   : 0.2em ;

  #text{
    width         : 100%  ;
    margin        : 0px   ;
    margin-left   : 0.5em ;
  }

`
function getQuestions(){

}

function List_Qst({id}) {
  const [listquest, setquest] = React.useState([])
  const [index, setindex]     = React.useState(0)

  React.useEffect(() => {
    fetch("http://localhost:3000/api/mongodb", {
      method : "GET",
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(res => res.json()).then( k => {
      for (const name in k){
        const index = k[name];
        const element = <Element_value key={index} id={`tbg-radio-${index}`} value={index} variant="" onChange={k=> console.log(k)}>
          <p id="text">{name}</p>
          <i className="bi bi-chevron-right d-flex h-100" style={{alignItems: "center", marginRight: "0.5em"}}></i>
        </Element_value>

        console.log(name);
        setquest(listquest.concat(element))
        
      }
    })
  }, [])

  return (
      <ToggleButtonGroup type="radio" name="options" defaultValue={0} id={id}>
        {listquest}
      </ToggleButtonGroup>
  )}

export default List_Qst