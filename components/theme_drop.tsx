import {useContext} from "react"
import styled from "styled-components"
import { theme_cnt } from "../pages/_app";
import { Dropdown } from "react-bootstrap"

const Simple_drop = styled(Dropdown)`
  & #drop-tgl {
    background : ${props => props.theme.bg};
    color: ${props => props.theme.fg};
    border-color :  ${props => props.theme.bg};
    // height : 30px
  }
  
  & > #drop-mn{
    background: ${props => props.theme.complement}
  }
  
  & > #drop-mn * {
    color: ${props => props.theme.fg}
  }
  
  & > #drop-mn .simple-dv{
    background: ${props => props.theme.fg}
  }

  .btn{
    padding : 0px
  }

`
function Theme_drop(){
  const [theme_profile, set_theme]  = useContext(theme_cnt) 
  
  function change_theme(theme_profile : string){
    localStorage.setItem("theme_", theme_profile)
    set_theme(theme_profile)
    
  }

  return (

    <Simple_drop className="nav-link">
      <Simple_drop.Toggle id="drop-tgl">
        Themes
      </Simple_drop.Toggle>

      <Simple_drop.Menu id="drop-mn">
        <Simple_drop.Item onClick={k => change_theme("light")}>Light Theme</Simple_drop.Item>
        <Simple_drop.Divider className="simple-dv"/>
        <Simple_drop.Item onClick={k => change_theme("dark")}>Dark Theme</Simple_drop.Item>
      </Simple_drop.Menu>

    </Simple_drop>
  )
}

export default Theme_drop