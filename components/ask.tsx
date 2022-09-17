import React, {Component} from "react"
import { Container, Row } from "react-bootstrap"


class place_ask extends Component<any>{
  render() {
    let elm_askor = Object.keys(this.props).filter(k => k.match("ask")).map(k => create_ask(k, this.props[k]))
    
    if (elm_askor.length > 1){
      let c_a = 1

      elm_askor.slice(0, elm_askor.length-1).map((k, index) => create_ask(`or${index}`, "or")).forEach((k, i) => {elm_askor.splice(i+c_a, 0, k)
      c_a += 1})
      
    }

    function create_ask(key : string, value : string){
      return <p key={key} className="text-center p-2">{value}</p>
    }

    return (
        <React.Fragment>
          <Row className="h-100 justify-content-center align-items-center">
            <div>
              {elm_askor}
            </div>
          </Row>
        </React.Fragment>
    );
  }
}

export default place_ask