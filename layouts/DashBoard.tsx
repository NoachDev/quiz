import { Col, Container, Nav, Row} from "react-bootstrap"
import styled from "styled-components"
import Theme_drop from "../components/theme_drop"

const Base_line = styled(Nav)`
  border-bottom: 2px solid ${props => props.theme.fg};
  height : 2em;
  width : 100%
  }

`

function Layout_DashBoard(){
  return <div style={{height : "100vh"}}>
    <Base_line>
      <Container className="d-flex h-100 justify-content-center justify-content-sm-end align-items-center" id="Base">
        <Base_line.Link style={{color:"inherit"}} href="/">Home</Base_line.Link>
        <Nav.Link style={{color:"inherit"}}>
          <Theme_drop/>
        </Nav.Link>
        <Nav.Link style={{color:"inherit"}}>
          <i className="bi bi-person-circle" style={{fontSize: "1.5em", alignSelf:"center"}} onClick={() => console.log("test")} id="User"></i>
        </Nav.Link>
      </Container>
    </Base_line>

  </div>
}

export default Layout_DashBoard 