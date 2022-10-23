import React from "react"
import { Col, Collapse, Fade, Row } from "react-bootstrap"
import styled from "styled-components"

const Cards     = styled(Row)`
  font-size       : 13px    ;

  padding-left    : 0.5em   ;
  padding-top     : 0.5em   ;

  margin          : 0px     ;
  justify-content : start   ;

`
const Card_Base = styled.div`
  height                  : 10em    ;
  width                   : 15em    ;
  
  padding                 : 1em     ;  
  padding-left            : 0em     ;  
  
  overflow-y              : auto    ;
  
  border-top-style        : solid   ;
  border-inline-style     : solid   ;
  
  border-top-left-radius  : 0.6em   ;
  border-top-right-radius : 0.6em   ;

  border-color            : ${props => props.theme.complement} ;

  &::-webkit-scrollbar {
    width                 : 0.2em;
    display               : none;

  }

  &::-webkit-scrollbar-thumb {
    background-color      : ${props => props.theme.fg};
    outline               : 1px solid;
    border-style          : solid;
    border-radius         : 0.6em;
  }

  &.scrolling::-webkit-scrollbar{
    display               : block;
  }

  &.scrolling{
    border-right-style    : none   ;

  }
  

`
const Add_node  = styled.div`
  height        : 10em     ;
  width         : auto    ;
  
  display       : flex    ;
  align-items   : center  ;
  
  & > *{
    font-size : 3em;
  }
  
`
const Tools_card=styled(Col)`
  height                      : 1.5em   ;
  width                       : calc(15em + 1px)    ;
  display                     : flex    ;

  align-items                 : center  ;

  background                  : ${props => props.theme.fg};

  border-bottom-style         : solid   ;
  border-inline-style         : solid   ;
  
  border-bottom-left-radius   : 0.6em   ;
  border-bottom-right-radius  : 0.6em   ;

  @keyframes example {
    20%  {
      padding-left: 0.9em;
    }

    40%  {
      padding-left: 0.3em;
    }

    60%  {
      padding-left: 0.9em;
    }

    80%  {
      padding-left: 0.3em;
    }

    100%  {
      padding-left: 0.6em;
    }
  }

  #close{
    color                     : ${props => props.theme.bg};
    font-size                 : 1.4em;
    height                    : 1.3em;
  }

  #lock{
    color                     : ${props => props.locked ? "red" : props.theme.bg};
    font-size                 : 1em;
    height                    : 1em;
    padding-left              : 0.6em;
  }

  .block{
    // color                  : green !important ;
    animation-name            : example;
    animation-duration        : 1s;
    animation-iteration-count : 1s;

  }

`
const ButtonP_ra= styled.button`
  width                       : 1.5em   ;
  height                      : 1.5em   ;
  display                     : flex    ;
  align-items                 : center  ;
  justify-content             : center ;
  text-align                  : center  ;

  border-radius               : 50%     ;
  border-width                : 0px     ;
  margin-left                 : 0.25em   ;
  
  background                  : ${props => props.theme.bg};
  color                       : ${props => props.theme.fg};
  
  &:active{
    background                : ${props => props.theme.shadow};
    box-shadow                : ${props => props.theme.box_shadow} 0px 0px 15px;
  }
`
function values_of_card(index_ask : number, ask : string, showFade, rmClick){
  return(
    <div key={index_ask} className="d-flex">

      <Collapse in={showFade} dimension={"width"}>
        <div style={{width : "1.5em"}}>
          <ButtonP_ra onClick={k => rmClick(ask)}>-</ButtonP_ra>
        </div>
      </Collapse>
      
      <p style={{paddingLeft: "1em"}}>{ask}</p>

    </div>
  )
  
}

function Cards_Values(name : string, card_index : number, list_ask : Array<string>, showFade : boolean){
  function addEnter(e : React.KeyboardEvent<HTMLInputElement>){
    if (e.key == "Enter"){
      try{
        e.preventDefault()
        const value = e.currentTarget.value

        addLine(name, card_index, value)
        setasks(asks.concat(value))
        setadd(false)

        e.currentTarget.value = ""
      }
      catch{}
      
    }
  }

  function rmClick(value : string){

    rmLine(name, card_index, value)
    setasks(asks.filter(k => k != value))
    
  }

  const [asks   , setasks ] = React.useState(list_ask)
  const [append , setadd  ] = React.useState(false)

  const elements_card = []

  asks.forEach((ask, index_ask) => elements_card.push(values_of_card(index_ask, ask, showFade, rmClick)))

  elements_card.push(
    <Fade in={showFade} key={"append"}>
      <div className="d-flex" style={{height : "1.6em"}}>
        
        <ButtonP_ra onClick={k => setadd(append ? false : true)}>+</ButtonP_ra>

        
        <Fade in={append}>
          <input type={"text"} style={{width : "100%"}} onKeyUp={addEnter}/>
        </Fade>
        
      </div>
    </Fade>
  )

  return elements_card
}

function Card_Node({list_ask, name, card_index, removeElement}){

  function unlock_show(e : React.MouseEvent<HTMLElement, MouseEvent>){
    if (has_locked){
      setlocked(0)
      setFade(true)
    }
    else{
      setlocked(1)
      setFade(false)
    }
  }

  function block_or_close(e : React.MouseEvent<HTMLElement, MouseEvent>){
    if (!has_locked){

      removeElement(card_index)
    }

    else{
      block.current.classList.remove("block")
      void block.current.offsetWidth
      block.current.classList.add("block")

    }
  }

  function scroll_hide(e : React.UIEvent<HTMLDivElement, UIEvent> ){
    card_val.current.classList.add("scrolling")
    e.preventDefault()
    setTimeout( k => card_val.current.classList.remove("scrolling"), 500)
    // console.log("added scrollbar");
  }

  const [has_locked , setlocked ] = React.useState(1)
  const [showFade   , setFade   ] = React.useState(false)

  const block     : React.MutableRefObject<HTMLElement>     = React.useRef()
  const card_val  : React.MutableRefObject<HTMLDivElement>  = React.useRef()
  
  return (
    <div style={{height: "11.5em", width: "15em", marginRight : "1em", marginBottom:"1em"}}>

      <Card_Base key={"card_base"} ref={card_val} onScroll = {scroll_hide}>
        {Cards_Values(name, card_index, list_ask, showFade)}
      </Card_Base>

      <Tools_card locked={has_locked} key={"tool"}>

        <i id="close" className="bi bi-x" onClick={block_or_close}></i>
        <i id="lock" className="bi bi-lock" ref={block} onClick={unlock_show}></i>

        <div id ="append"></div>
        
      </Tools_card>
      
    </div>
  )
}

function addLine(name : string, card_index : number, value : string) {
  fetch(`http://localhost:3000/api/MongoDb/line?name=${name}&card=${card_index}`,
    {
      method: "POST",
      body : value
    }
  )
}

function rmLine(name : string, card_index : number, value : string) {

  fetch(`http://localhost:3000/api/MongoDb/line?name=${name}&card=${card_index}&line=${value}`,
    {
      method: "DELETE",
    }
  )
}

function Quest({ name }){
  let [elements, setelements] = React.useState([])
  const cards = []


  function removeElement(index : number){
    fetch(`http://localhost:3000/api/MongoDb/card?name=${name}&card=${index}`,
      {
        method: "DELETE",
      }
    )

    console.log(cards);
    console.log(elements);

    setelements(elements.filter((k, elmIndex) => elmIndex!=index))
    
  }

  React.useEffect(() => {
    if (name.length > 0){

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

          for (const card_index in k){
            cards.push(<Card_Node key={card_index} list_ask={k[card_index]} card_index={card_index} name={name} removeElement={removeElement}/>)

          }

          elements=cards
          setelements(elements)
          
        }

      )
      
      

    }

  }, [name])

  return (<Cards  key = "rowcards">
    {elements}
    <Add_node onClick={k => {
      const card_index = elements.length
      
      setelements(elements.concat(<Card_Node key={card_index} list_ask={[]} card_index={card_index} name={name} removeElement={removeElement}/>))

    }} key="addnode"><i className="bi bi-node-plus"></i></Add_node>
    
    <div className="h-100">
    </div>

  </Cards>)
}

export default Quest