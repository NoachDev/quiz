import { Nav, Stack, Collapse, Col, Row, Fade }  from "react-bootstrap"
import React, { useState }                   from "react"
import styled                         from "styled-components"
import Theme_drop                     from "../components/theme_drop"
import List_Qst                       from "../components/List_Qustions"
import Quest                          from "../components/Qustions"

const Base_line = styled(Nav)`
  border-bottom: 2px solid ${props => props.theme.fg};
  height              : 2em     ;
  width               : 100%    ;
  
  & > *{
    height            : 2em     ;

  }
`
const Col_list = styled.div`
  background        : ${props => props.theme.complement};
  padding           : 0       ;
  width             : 17em    ;
  height            : 100%    ;
  display           : flex    ;
  flex-direction    : column  ;
  z-index           : 1       ;

  #controlers{
    height          : 1.5em   ;
    width           : 100%    ;
    padding-top     : 0.5em   ;
    padding-right   : 0.5em   ;
    justify-content : end     ;
    align-items     : center  ;
    displey         : flex    ;
  }

  #questions{
    width           : 100%    ;
    padding-right   : 0px     ;
    padding-top     : 0.5em   ;
    display         : flex    ;
    flex-direction  : column  ;

    .btn{
      border        : 0px     ;
      border-radius : 0px     ;
    }
    
    .btn-check:checked + .btn, :not(.btn-check) + .btn:active, .btn:first-child:active, .btn.active, .btn.show {
      background    : ${props => props.theme.bg};
    }
  }

  @media (max-width: 576px){
    position : absolute;

  }


`
const Layout_Base = styled.div`
  width   : 100;
  height  : 100;
  
  display : flex ;
  flex-direction : row;

  #ask{
    z-index   : 0;
  }
`

const NewQuestion = styled.input`
  border-width  : 1px   ;
  height        : 1.5em ;
  background    : ${props => props.theme.complement};
  color         : ${props => props.theme.fg};
  border-color  : ${props => props.theme.fg};

`

function Layout_DashBoard(){
  function addQuestion(name : string){
    if (name.length > 0){
      setQst_add(name)
      fetch(`http://localhost:3000/api/MongoDb/question?name=${name}`,
        {
          method: "POST"
        }
      )
      
    }
  
  }
  
  function rmvQuestion(name : string){
    if (name.length > 0){
      // setquest(listquest)
      setQst_rmv(name)
      fetch(`http://localhost:3000/api/MongoDb/question?name=${name}`,
        {
          method: "DELETE"
        }
      )
    }
  }

  function onEnter(e : React.KeyboardEvent<HTMLInputElement>){
    if (e.key == "Enter"){
      addQuestion(e.currentTarget.value)
      setShow(false)
    }
  }

  const [open     , setOpen]      = useState(false);
  const [showadd  , setShow]      = useState(false);
  const [Qst_add  , setQst_add]   = useState("")
  const [Qst_rmv  , setQst_rmv]   = useState("")
  const [valindex , setindex]     = useState("")

  return (
    <div style={{height : "calc(100vh - 2em)"}}>
      <Base_line>
      
        <Col className="d-flex justify-content-start align-items-center" style={{height : "2em"}}>
          <i className="d-sm-none p-0 d-md-none ms-3 bi bi-list" style={{fontSize: "1.5em"}} onClick={() => setOpen(!open)} aria-controls="col_qst" aria-expanded={open}/>
        </Col>

        <Col className="d-flex justify-content-center justify-content-sm-end align-items-center" id="Base" style={{height : "2em"}}>
          
          <Theme_drop/>

          <Base_line.Link style={{color:"inherit"}} href="/">Home</Base_line.Link>

          <Base_line.Link style={{color:"inherit"}}>
            <i className="bi bi-person-circle" style={{fontSize: "1.5em", alignItems:"center"}} onClick={() => console.log("test")} id="User"></i>
          </Base_line.Link>
          
        </Col>
        
      </Base_line>

      <Layout_Base className = "w-100, h-100">

        <Collapse dimension="width" in={open} className="d-sm-flex" timeout={100} appear>
          <Col_list>
            <Stack direction="horizontal" gap={3} id="controlers">
              <i className="bi bi-plus-square" onClick={k => showadd ? setShow(false) : setShow(true)}></i>
              <div className="vr"/>
              <i className="bi bi-dash-square" onClick={k => rmvQuestion(valindex)}></i>
            </Stack>

            <List_Qst id = "questions" setindex={setindex} Qst_add={Qst_add} setQst_add={setQst_add} Qst_rmv={Qst_rmv} setQst_rmv={setQst_add}/>

            <Fade in={showadd}>
              <NewQuestion type={"text"} onKeyUp={onEnter}/>
            </Fade>


          </Col_list>

        </Collapse>

        <Col id="ask" className="w-100 h-100">
          <Quest key={"Quest"} name={valindex}/>
        </Col>

      </Layout_Base>

    </div>

  )
}

export default Layout_DashBoard 