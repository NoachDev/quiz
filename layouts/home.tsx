import React from "react"
import {Container, Nav} from "react-bootstrap"
import Theme_drop from "../components/theme_drop"

function Layout_home({ children }){
  
  return<React.Fragment>
    <Container>
      <div style={{"height" : "2em", marginBottom : "0.5em"}}>

        <Nav className="d-flex h-100 justify-content-center align-items-center">

          <Nav.Link style={{color:"inherit"}} href="/DashBoard">Dashboard</Nav.Link>
          <Nav.Link style={{color:"inherit"}} href="/">Home</Nav.Link>
          <Theme_drop/>
          
        </Nav>
      </div>

    </Container>

    {children}

  </React.Fragment>
}


export default Layout_home