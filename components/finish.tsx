import React, {Component} from "react";
import { Row , Image, Col } from "react-bootstrap";
// import Image from "next/image";

import cong from "../public/Congratulation.png"

class Finish extends Component{
  
  render(): React.ReactNode {
    return <React.Fragment>
      <Row className="d-flex h-100 align-items-center">
        <Image className="img-fluid" src={cong.src}></Image>
        <p className="text-center">
          thet is the end
        </p>
      </Row>

    </React.Fragment>
  }
}

export default Finish 