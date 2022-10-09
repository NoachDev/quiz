import {useContext} from "react"
import styled from "styled-components"
import { theme_cnt } from "../pages/_app";
import { Dropdown } from "react-bootstrap"

const Simple_drop = styled(Dropdown)`
  & #drop-tgl, #drop-tgl{
    background : ${props => props.theme.bg}
  }
  
  & #drop-tgl {
    color: ${props => props.theme.fg}
  }
  
  & #drop-tgl {
    border-color :  ${props => props.theme.bg}
  }
  
  & > #drop-mn{
    background: ${props => props.theme.comlement}
  }
  
  & > #drop-mn * {
    color: ${props => props.theme.fg}
  }
  
  & > #drop-mn .simple-dv{
    background: ${props => props.theme.fg}
  }
  
  `
function Theme_drop(){
  const [theme_profile, set_theme]  = useContext(theme_cnt) 
  
  function change_theme(theme_profile : string){
    localStorage.setItem("theme_", theme_profile)
    set_theme(theme_profile)
    
  }
  return (

    <Simple_drop>
      <Dropdown.Toggle className="btn" variant="" id="drop-tgl">
        Themes
      </Dropdown.Toggle>

      <Dropdown.Menu id="drop-mn">
        <Dropdown.Item onClick={k => change_theme("light")}>Light Theme</Dropdown.Item>
        <Dropdown.Divider className="simple-dv"/>
        <Dropdown.Item onClick={k => change_theme("dark")}>Dark Theme</Dropdown.Item>
      </Dropdown.Menu>
      
    </Simple_drop>
  )
}

export default Theme_drop