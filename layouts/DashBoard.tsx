import { Nav, Stack, Collapse, Col }  from "react-bootstrap"
import { useState }                   from "react"
import styled                         from "styled-components"
import Theme_drop                     from "../components/theme_drop"

const Base_line = styled(Nav)`
  border-bottom: 2px solid ${props => props.theme.fg};
  height              : 2em     ;
  width               : 100%    ;
  
  & > *{
    height            : 2em     ;

  }
`

const Layout_Base = styled.div`
  height              : 100%    ;
  
  #col_qst{
    background        : ${props => props.theme.complement};
    padding           : 0       ;
    width             : 40%     ;
    height            : 100%    ;

    #controlers{
      height          : 1.5em   ;
      width           : 100%    ;
      padding-top     : 0.5em   ;
      padding-right   : 0.5em   ;
      justify-content : end     ;
      align-items     : center  ;
      displey         : flex    ;
    }
  }

`

function Layout_DashBoard(){
  const [open, setOpen] = useState(false);

  return <div style={{height : "100vh"}}>
    <Base_line>
    
      <Col className="d-flex justify-content-start align-items-center" style={{height : "2em"}}>
        <i className="d-sm-none p-0 d-md-none ms-3 bi bi-list" onClick={() => setOpen(!open)} aria-controls="col_qst" aria-expanded={open}/>
      </Col>

      <Col className="d-flex justify-content-center justify-content-sm-end align-items-center" id="Base" style={{height : "2em"}}>
        
        <Base_line.Link style={{color:"inherit"}}>
          <Theme_drop/>
        </Base_line.Link>

        <Base_line.Link style={{color:"inherit"}} href="/">Home</Base_line.Link>

        <Base_line.Link style={{color:"inherit"}}>
          <i className="bi bi-person-circle" style={{fontSize: "1.5em", alignSelf:"center"}} onClick={() => console.log("test")} id="User"></i>
        </Base_line.Link>
        
      </Col>
      
    </Base_line>

    <Layout_Base>

      <Collapse dimension="width" in={open} className="d-sm-flex" timeout={100}>
        <div id="col_qst">

          <Stack direction="horizontal" gap={3} id="controlers">
            <i className="bi bi-plus-square"></i>
            <div className="vr"/>
            <i className="bi bi-dash-square"></i>
          </Stack>

          <div id="questions">
          </div>

        </div>
      </Collapse>

    </Layout_Base>

  </div>
}

export default Layout_DashBoard 